"use client";

import type { ReactNode } from "react";

export const PREFILL_EVENT = "salaido:prefill-subject";

/** Anchor link that also pre-fills the contact form subject (e.g. "Celosphere"). */
export function PrefillLink({
  href,
  subject,
  className,
  children,
}: {
  href: string;
  subject: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { subject } }))}
    >
      {children}
    </a>
  );
}
