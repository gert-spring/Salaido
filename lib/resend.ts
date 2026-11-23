import "server-only";
import { Resend } from "resend";

let client: Resend | null = null;

/** Mail settings from env. Returns null when not configured (local dev without keys). */
export function getMailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  if (!client) client = new Resend(apiKey);
  return {
    resend: client,
    to: to.split(",").map((a) => a.trim()).filter(Boolean),
    from,
  };
}
