import { createClient } from "@supabase/supabase-js";
export const db = () => createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
export async function guestByToken(token: string) {
  if (!/^[a-f0-9]{48}$/.test(token)) return null;
  const { data } = await db().from("guests").select("id,full_name,allocation,status").eq("token", token).neq("status", "revoked").maybeSingle();
  return data;
}
