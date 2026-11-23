import type { ReactNode } from "react";

/**
 * Salaido Button (design system > Actions > Button): rectangular, label in capitals, chevron in
 * its own box behind a vertical line. Filled for the main action, outline for secondary ones.
 * `on` is the surface it sits on, so the same variant works on dark blue, cream and yellow.
 */
export type ButtonVariant = "filled" | "outline";
export type ButtonSurface = "dark" | "light";

export function buttonClasses(variant: ButtonVariant = "filled", on: ButtonSurface = "dark") {
  const base =
    "press group/btn inline-flex items-stretch border text-left label disabled:opacity-60 disabled:pointer-events-none";
  const look =
    on === "dark"
      ? variant === "filled"
        ? "border-cream bg-cream text-navy hover:bg-white hover:border-white"
        : "border-cream/70 text-cream hover:border-cream hover:bg-cream/10"
      : variant === "filled"
        ? "border-navy bg-navy text-cream hover:bg-navy-2 hover:border-navy-2"
        : "border-navy text-navy hover:bg-navy/5";
  return `${base} ${look}`;
}

export function ButtonInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="flex items-center whitespace-nowrap px-4 py-3">{children}</span>
      <span aria-hidden className="flex items-center border-l border-current px-3">
        <svg
          viewBox="0 0 10 14"
          className="h-3.5 w-2.5 fill-none stroke-current transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5"
          strokeWidth={1.25}
        >
          <path d="M2 1l6 6-6 6" />
        </svg>
      </span>
    </>
  );
}

export function Button({
  href,
  children,
  variant = "filled",
  on = "dark",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  on?: ButtonSurface;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={`${buttonClasses(variant, on)} ${className}`} {...rest}>
      <ButtonInner>{children}</ButtonInner>
    </a>
  );
}
