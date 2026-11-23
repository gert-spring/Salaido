"use client";

import { useEffect, useState } from "react";
import { en } from "@/content/en";
import { Logo } from "@/components/ui/Logo";
import { buttonClasses, ButtonInner } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = en.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "border-cream/10 bg-navy/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
        <a href="#top" aria-label={t.homeLabel} className="shrink-0" onClick={() => setOpen(false)}>
          <Logo on="dark" />
        </a>

        <nav aria-label={t.label} className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {t.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-mist transition-colors duration-200 hover:text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={t.cta.href} className={buttonClasses("outline", "dark")}>
            <ButtonInner>{t.cta.label}</ButtonInner>
          </a>
        </nav>

        <button
          type="button"
          className="press -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.closeMenu : t.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5" aria-hidden>
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-200 ease-out ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-200 ease-out ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-cream/10 bg-navy px-5 pb-10 pt-4 sm:px-8 lg:hidden"
      >
        <nav aria-label={`${t.label} (mobile)`}>
          <ul className="flex flex-col">
            {t.items.map((item) => (
              <li key={item.href} className="border-b border-cream/10">
                <a href={item.href} onClick={() => setOpen(false)} className="block py-4 font-serif text-2xl text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={t.cta.href}
            onClick={() => setOpen(false)}
            className={`${buttonClasses("filled", "dark")} mt-8`}
          >
            <ButtonInner>{t.cta.label}</ButtonInner>
          </a>
        </nav>
      </div>
    </header>
  );
}
