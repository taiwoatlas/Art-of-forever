import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase";
// Authorization: Bearer <Supabase user access token>; user email must be in ADMIN_EMAILS.
export async function GET(r: NextRequest) {
  const jwt = (r.headers.get("authorization") || "").replace("Bearer ", "");
  const sb = db(); const { data: u } = await sb.auth.getUser(jwt);
  const ok = u?.user?.email && (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).includes(u.user.email.toLowerCase());
  if (!ok) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { data } = await sb.from("guests").select("full_name,email,phone,allocation,status,rsvps(attending,attendees,message,dietary,submitted_at)");
  const q = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""').replace(/^[=+\-@]/, "'$&")}"`;
  const rows = (data || []).map((g: any) => { const x = g.rsvps?.[0] || g.rsvps || {}; return [g.full_name, g.email, g.phone, g.allocation, g.status, x.attending, x.attendees, x.message, x.dietary, x.submitted_at].map(q).join(","); });
  return new NextResponse(["name,email,phone,allocation,status,attending,attendees,message,dietary,submitted"].concat(rows).join("\n"), { headers: { "content-type": "text/csv", "content-disposition": "attachment; filename=rsvps.csv" } });
}
