"use client";
import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
export default function Rsvp() {
  const [token, setT] = useState(""), [inv, setInv] = useState<{ name: string; allocation: number } | null>(null);
  const [att, setAtt] = useState(true), [err, setErr] = useState(""), [done, setDone] = useState<null | boolean>(null);
  useEffect(() => { const t = new URLSearchParams(location.search).get("t") || ""; setT(t); if (t) fetch("/api/invite?t=" + t).then(r => r.ok ? r.json() : null).then(setInv); }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget); setErr("");
    const r = await fetch("/api/rsvp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token, name: f.get("name"), email: f.get("email"), phone: f.get("phone"), attending: att, guests: Number(f.get("guests") || 0), message: f.get("message") || undefined, dietary: f.get("dietary") || undefined }) });
    const j = await r.json(); if (r.ok) setDone(j.attending); else setErr(j.error);
  }
  if (done !== null) return <p style={{ whiteSpace: "pre-line" }}>{done ? wedding.accept : wedding.decline}</p>;
  if (!inv) return <p>Please open your personal invitation link to respond.</p>;
  return (<form onSubmit={submit}>
    <label>FULL NAME<input name="name" defaultValue={inv.name} required /></label>
    <label>EMAIL<input name="email" type="email" required /></label>
    <label>PHONE<input name="phone" type="tel" required /></label>
    <label>ATTENDANCE<select value={att ? "y" : "n"} onChange={e => setAtt(e.target.value === "y")}><option value="y">Happily accepts</option><option value="n">Regretfully declines</option></select></label>
    {att && <label>NUMBER OF GUESTS (max {inv.allocation})<input name="guests" type="number" min={1} max={inv.allocation} defaultValue={1} /></label>}
    <label>MESSAGE TO THE COUPLE (optional)<textarea name="message" /></label>
    <label>DIETARY OR ACCESSIBILITY (optional)<textarea name="dietary" /></label>
    {err && <p role="alert">{err}</p>}<button className="btn">SEND RESPONSE</button></form>);
}
