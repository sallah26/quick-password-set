import { getTenant } from "@/api/tenant";
import React, { useEffect, useState } from "react";

interface TenantProps {
  id: string;
}

interface TenantData {
  name: string;
}

export default function Tenant({ id }: TenantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [tenant, setTenant] = useState<TenantData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTenant() {
      setIsLoading(true);
      const { data, error } = await getTenant(id);
      setIsLoading(false);

      if (error) {
        setError(error.message);
        console.error("Error fetching tenant:", error.message);
        return;
      }

      setTenant(data);
    }

    fetchTenant();
  }, [id]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {error}</span>;
  if (!tenant) return <span>No tenant found</span>;

  return <span className="font-extrabold">{tenant.name}</span>;
}
