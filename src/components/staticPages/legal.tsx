"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type LegalPayload = {
  id: string;
  type: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function Legal() {
  const router = useRouter();
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const [legal, setLegal] = useState<LegalPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/policy/getPolicyByType/legal`;

    setLoading(true);
    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        // Accept both shapes: { data: { policy: ... } } or { data: { terms: ... } }
        const policy = json?.data?.policy ?? json?.data?.terms ?? null;
        if (!policy) {
          setError("Legal terms not found");
        } else if (policy.type && policy.type !== "legal") {
          setError(`Content type mismatch: expected "legal" but got "${policy.type}"`);
        } else {
          setLegal(policy);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch legal terms:", err);
        setError("Failed to load legal terms");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [API_BASE]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--navy)]" />
          <span className="text-sm text-gray-600">Loading Terms...</span>
        </div>
      </div>
    );
  }

  if (error || !legal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error ?? "No legal terms available"}</p>
          <button
            onClick={() => router.back()}
            className="text-sm text-[var(--navy)] underline"
            aria-label="Go back"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">

        <h4 className="text-[var(--yellow)] font-semibold mb-2 text-lg sm:text-lg text-center">
          Let&apos;s Talk About Legal Terms
        </h4>

        <h1 className="text-[var(--navy)] font-bold text-2xl sm:text-4xl md:text-5xl mb-6 text-center leading-tight">
          Legal Terms
        </h1>

        <div className=" rounded-lg p-4 sm:p-6 lg:p-8">
          <article
            className="prose-sm sm:prose lg:prose-lg max-w-none text-xl sm:text-xl prose-a:text-[var(--navy)]"
            dangerouslySetInnerHTML={{ __html: legal.content }}
          />
        </div>
      </div>
    </div>
  );
}