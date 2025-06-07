import { supabase } from "@/supabase/client";

export async function getTenant(id: string) {
  console.log("====================================");
  console.log("start loading tenanat", id);
  console.log("====================================");
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", id)
    .single();
  console.log("====================================");
  console.log("finish the tenant load", data);
  console.log("====================================");
  if (error) throw new Error(error.message);

  return { data, error };
}
