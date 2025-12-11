"use client";

import React, { useEffect, useState } from "react";

type PolicyPayload = {
  id: string;
  type: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function PrivacyPolicy() {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const [policy, setPolicy] = useState<PolicyPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/policy/getPolicyByType/privacy`;

    setLoading(true);
    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        const p = json?.data?.policy ?? null;
        if (!p) {
          setError("Policy not found");
        } else {
          setPolicy(p);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch policy:", err);
        setError("Failed to load policy");
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
        <span>Loading policy...</span>
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
        <span className="text-red-600">{error ?? "No policy available"}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-16 px-4">
      <h4 className="text-center text-[var(--yellow)] font-semibold mb-2 text-2xl">
        Let&apos;s Talk About Policy
      </h4>
      <h1 className="text-center text-[var(--navy)] font-semibold text-5xl mb-6">
        Privacy Policy
      </h1>
      <div
        className="max-w-5xl space-y-3 text-lg prose prose-lg mx-auto text-center"
        dangerouslySetInnerHTML={{ __html: policy.content }}
      />
    </div>
  );
}