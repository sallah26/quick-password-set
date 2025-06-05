import { supabase } from "@/supabase/client";

export async function getTenant(id: string) {
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
