import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, guestByToken } from "@/lib/supabase";
const S = z.object({ token: z.string(), name: z.string().min(2).max(120), email: z.string().email(), phone: z.string().min(6).max(30),
  attending: z.boolean(), guests: z.number().int().min(0), message: z.string().max(1000).optional(), dietary: z.string().max(500).optional() });
export async function POST(r: NextRequest) {
  const p = S.safeParse(await r.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  const d = p.data, g = await guestByToken(d.token);
  if (!g) return NextResponse.json({ error: "This invitation link is not valid." }, { status: 404 });
  const attendees = d.attending ? Math.min(Math.max(d.guests, 1), g.allocation) : 0;
  if (d.attending && d.guests > g.allocation) return NextResponse.json({ error: `Your invitation allows up to ${g.allocation}.` }, { status: 400 });
  const sb = db();
  const { error } = await sb.from("rsvps").insert({ guest_id: g.id, attending: d.attending, attendees, message: d.message, dietary: d.dietary });
  if (error?.code === "23505") return NextResponse.json({ error: "A response has already been received for this invitation." }, { status: 409 });
  if (error) return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  await sb.from("guests").update({ status: "responded", email: d.email, phone: d.phone }).eq("id", g.id);
  return NextResponse.json({ ok: true, attending: d.attending });
}
