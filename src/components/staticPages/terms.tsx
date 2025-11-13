"use client";

import React, { useEffect, useState } from "react";

type TermsPayload = {
  id: string;
  type: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function Terms() {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const [terms, setTerms] = useState<TermsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/policy/getPolicyByType/terms`;

    setLoading(true);
    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        // Accept both shapes: { data: { policy: ... } } or { data: { terms: ... } }
        console.debug("terms API response:", json);
        const policy = json?.data?.policy ?? json?.data?.terms ?? null;
        if (!policy) {
          setError("Terms not found");
        } else if (policy.type && policy.type !== "terms") {
          // Ensure the returned content is actually of type "terms"
          setError(`Content type mismatch: expected "terms" but got "${policy.type}"`);
        } else {
          setTerms(policy);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch terms:", err);
        setError("Failed to load terms");
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
        <span>Loading Terms...</span>
      </div>
    );
  }

  if (error || !terms) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
        <span className="text-red-600">{error ?? "No terms available"}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-16 px-4">
      <h4 className="text-center text-[var(--yellow)] font-semibold mb-2 text-3xl">
        Let&apos;s Talk About Terms
      </h4>
      <h1 className="text-center text-[var(--navy)] font-bold text-6xl mb-6">
        Terms and Conditions
      </h1>
      <div
        className="max-w-5xl space-y-3 text-lg prose prose-lg"
        dangerouslySetInnerHTML={{ __html: terms.content }}
      />
    </div>
  );
}