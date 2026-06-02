"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Ensures Clarity records client-side navigations (Next.js App Router).
 */
export function ClarityRouteListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const clarity = window.clarity;
    if (typeof clarity !== "function") return;

    const qs = searchParams.toString();
    const page = qs ? `${pathname}?${qs}` : pathname;
    clarity("set", "page", page);
  }, [pathname, searchParams]);

  return null;
}
