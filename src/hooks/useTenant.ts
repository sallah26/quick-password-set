import { getTenant } from "@/api/tenant";
import { useQuery } from "@tanstack/react-query";

function useTenanat(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => getTenant(id),
  });

  return { isLoading, data };
}

export default useTenanat;
