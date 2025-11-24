import React from "react";
import { notFound } from "next/navigation";
import LocationTemplate from "@/components/staticPages/locationTemplate";
import { locationsData, LocationKey } from "@/components/staticPages/locations";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(locationsData).map((location) => ({
    id: location,
  }));
}

export default async function LocationPage({ params }: PageProps) {
  const { id } = await params;
  
  // Check if the location exists
  if (!(id in locationsData)) {
    notFound();
  }

  const locationData = locationsData[id as LocationKey];

  return <LocationTemplate data={locationData} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  
  if (!(id in locationsData)) {
    return {
      title: "Location Not Found",
    };
  }

  const locationData = locationsData[id as LocationKey];

  return {
    title: `Home Care Services for Seniors in ${locationData.city}, ${locationData.state} | CareWorks`,
    description: locationData.heroDescription,
    keywords: `home care ${locationData.city}, senior care ${locationData.city}, elderly care ${locationData.state}, in-home care services`,
  };
}
