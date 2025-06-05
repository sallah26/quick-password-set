import useTenanat from "@/hooks/useTenant";
import React from "react";

export default function Tenant({ id }) {
  const { data, isLoading } = useTenanat(id);
  if (isLoading) return;
  return <span className="font-extrabold">{data.name}</span>;
}
