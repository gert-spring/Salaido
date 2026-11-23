"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { en } from "@/content/en";
import { initialContactState, type ContactField } from "@/lib/contact";
import { Rich } from "@/components/ui/Rich";
import { PREFILL_EVENT } from "@/components/ui/PrefillLink";
import { buttonClasses, ButtonInner } from "@/components/ui/Button";

const t = en.contact.form;

const inputCls =
  "mt-2 block w-full border bg-navy-2 px-4 py-3 text-[1rem] text-cream placeholder:text-slate/70 transition-[border-color,box-shadow] duration-200 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialContactState);
  const [subject, setSubject] = useState(state.values?.subject ?? "");
  const [startedAt, setStartedAt] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartedAt(String(Date.now()));
    const fromUrl = new URLSearchParams(window.location.search).get("subject");
    if (fromUrl) setSubject(fromUrl.slice(0, 80));
    const onPrefill = (e: Event) => {
      const s = (e as CustomEvent<{ subject: string }>).detail?.subject;
      if (s) setSubject(s);
      // Let the anchor scroll land, then put the keyboard where the user is heading.
      window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 400);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (state.status === "success") statusRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="success-enter border border-yellow/40 bg-navy-2 p-8 font-serif text-2xl text-cream focus:outline-none sm:p-10"
      >
        <span className="mb-5 block h-px w-10 bg-yellow" aria-hidden />
        <Rich text={t.success} />
      </div>
    );
  }

  const err = (f: ContactField) => !!state.fieldErrors?.[f];
  const border = (f: ContactField) => (err(f) ? "border-error" : "border-cream/15");
  const v = state.values ?? {};

  const field = (name: "name" | "company" | "email", type: string, autoComplete: string) => (
    <div>
      <label htmlFor={`contact-${name}`} className="text-sm font-medium text-mist">
        {t[name]}
      </label>
      <input
        ref={name === "name" ? nameRef : undefined}
        id={`contact-${name}`}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        defaultValue={v[name]}
        aria-invalid={err(name) || undefined}
        aria-describedby={err(name) ? `contact-${name}-error` : undefined}
        className={`${inputCls} ${border(name)}`}
      />
      {err(name) && (
        <p id={`contact-${name}-error`} className="mt-2 text-sm text-error">
          {t.errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form action={action} noValidate className="grid gap-5">
      {state.status === "error" && !state.fieldErrors && (
        <p role="alert" className="border border-error/50 px-4 py-3 text-sm text-error">
          {t.errors.generic}
        </p>
      )}

      {subject && (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow/15 py-1 pl-3 pr-1 text-sm text-yellow">
            {t.subjectPrefix}: {subject}
            <button
              type="button"
              onClick={() => setSubject("")}
              className="press inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-yellow/20"
              aria-label={t.clearSubject}
            >
              <span aria-hidden>×</span>
            </button>
          </span>
        </div>
      )}
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="startedAt" value={startedAt} />

      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "text", "name")}
        {field("company", "text", "organization")}
      </div>
      {field("email", "email", "email")}

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-mist">
          {t.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          defaultValue={v.message}
          aria-invalid={err("message") || undefined}
          aria-describedby={err("message") ? "contact-message-error" : undefined}
          className={`${inputCls} ${border("message")} resize-y`}
        />
        {err("message") && (
          <p id="contact-message-error" className="mt-2 text-sm text-error">
            {t.errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">{t.honeypot}</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mist">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={err("consent") || undefined}
            aria-describedby={err("consent") ? "contact-consent-error" : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-yellow"
          />
          <span>
            <Rich text={t.consent} />
          </span>
        </label>
        {err("consent") && (
          <p id="contact-consent-error" className="mt-2 text-sm text-error">
            {t.errors.consent}
          </p>
        )}
      </div>

      <div>
        <button type="submit" disabled={pending} className={buttonClasses("filled", "dark")}>
          <ButtonInner>{pending ? `${t.sending}…` : t.submit}</ButtonInner>
        </button>
      </div>
    </form>
  );
}
