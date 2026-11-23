"use server";

import { contactSchema, type ContactField, type ContactState } from "@/lib/contact";
import { getMailConfig } from "@/lib/resend";
import ContactNotification from "@/emails/ContactNotification";

const MIN_FILL_MS = 2500;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const text = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };

  const values = {
    name: text("name"),
    company: text("company"),
    email: text("email"),
    message: text("message"),
    subject: text("subject"),
  };

  // Spam traps: a filled honeypot or an instant submit gets a quiet "success" and is dropped.
  const startedAt = Number(text("startedAt"));
  if (text("website") || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success" };
  }

  const parsed = contactSchema.safeParse({ ...values, consent: text("consent") || undefined });
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, true>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key as ContactField] = true;
    }
    return { status: "error", fieldErrors, values };
  }

  const data = parsed.data;
  const mail = getMailConfig();

  if (!mail) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Resend not configured, message not sent. Payload:", data);
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL missing.");
    return { status: "error", values };
  }

  const subjectTag = data.subject ? ` [${data.subject}]` : "";
  const { error } = await mail.resend.emails.send({
    from: mail.from,
    to: mail.to,
    replyTo: data.email,
    subject: `Website contact${subjectTag}: ${data.name}, ${data.company}`,
    react: ContactNotification({ ...data, receivedAt: new Date().toISOString() }),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return { status: "error", values };
  }

  return { status: "success" };
}
