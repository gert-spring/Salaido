import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(160),
  email: z.email().max(200),
  message: z.string().trim().min(1).max(5000),
  subject: z.string().trim().max(80).optional().default(""),
  consent: z.literal("on"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "company" | "email" | "message" | "consent";

export type ContactState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<ContactField, true>>;
  values?: Partial<Record<"name" | "company" | "email" | "message" | "subject", string>>;
};

export const initialContactState: ContactState = { status: "idle" };
