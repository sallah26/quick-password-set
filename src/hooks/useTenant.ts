import { getTenant } from "@/api/tenant";
import { useQuery } from "@tanstack/react-query";

function useTenanat(id: string) {
  console.log("===================START=================");
  console.log(id);
  console.log("====================================");
  const { data, isLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => getTenant(id),
  });
  console.log("===================END=================");
  console.log(data);
  console.log("====================================");
  return { isLoading, data };
}

export default useTenanat;
