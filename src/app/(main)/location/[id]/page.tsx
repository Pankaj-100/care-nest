import React from "react";
import LocationTemplate from "@/components/staticPages/locationTemplate";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LocationPage({ params }: PageProps) {
  const { id } = await params;

  return <LocationTemplate slug={id} />;
}
