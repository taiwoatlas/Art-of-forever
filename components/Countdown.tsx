"use client";
import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
export default function Countdown() {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => { const t = Date.parse(wedding.countdownTarget); const f = () => setMs(Math.max(0, t - Date.now())); f(); const i = setInterval(f, 1000); return () => clearInterval(i); }, []);
  if (ms === null) return null;
  if (ms === 0) return <p>Today, we celebrate forever. Thank you for being part of our story.</p>;
  const s = Math.floor(ms / 1000), v: [string, number][] = [["DAYS", Math.floor(s / 86400)], ["HOURS", Math.floor(s / 3600) % 24], ["MINUTES", Math.floor(s / 60) % 60], ["SECONDS", s % 60]];
  return <div className="cd" role="timer">{v.map(([l, n]) => <div key={l}><b>{String(n).padStart(2, "0")}</b><span className="small">{l}</span></div>)}</div>;
}
