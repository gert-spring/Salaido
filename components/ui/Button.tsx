import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "ghost-light";

const styles: Record<Variant, string> = {
  primary: "bg-cyan text-ink hover:bg-paper",
  secondary: "border border-mist/30 text-paper hover:border-paper hover:bg-paper/5",
  dark: "bg-ink text-paper hover:bg-ink-2",
  "ghost-light": "border border-ink/20 text-ink hover:border-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={`press inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
