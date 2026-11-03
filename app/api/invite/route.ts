import { NextRequest, NextResponse } from "next/server";
import { guestByToken } from "@/lib/supabase";
export async function GET(r: NextRequest) {
  const g = await guestByToken(r.nextUrl.searchParams.get("t") || "");
  if (!g) return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
  return NextResponse.json({ name: g.full_name, allocation: g.allocation, responded: g.status === "responded" });
}
