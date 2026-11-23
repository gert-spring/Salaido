import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";

export type ContactNotificationProps = {
  name: string;
  company: string;
  email: string;
  message: string;
  subject?: string;
  receivedAt: string;
};

const styles = {
  body: { backgroundColor: "#F5F3ED", fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', margin: 0, padding: "32px 0" },
  container: { backgroundColor: "#FFFFFF", margin: "0 auto", maxWidth: "560px", padding: "32px" },
  eyebrow: { color: "#101E35", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 },
  heading: { color: "#101E35", fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 400, margin: "12px 0 0" },
  hr: { borderColor: "#E5E7EB", margin: "24px 0" },
  label: { color: "#5B6577", fontSize: "12px", margin: "0 0 2px" },
  value: { color: "#101E35", fontSize: "15px", margin: "0 0 16px" },
  message: { color: "#101E35", fontSize: "15px", lineHeight: "1.6", whiteSpace: "pre-wrap" as const, margin: 0 },
};

export default function ContactNotification({ name, company, email, message, subject, receivedAt }: ContactNotificationProps) {
  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Company", company],
    ["Email", email],
    ...(subject ? ([["Subject", subject]] as Array<[string, string]>) : []),
    ["Received", receivedAt],
  ];

  return (
    <Html lang="en">
      <Head />
      <Preview>{`New message from ${name}, ${company}`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.eyebrow}>salaido.com contact form</Text>
          <Heading style={styles.heading}>New message from {name}</Heading>
          <Hr style={styles.hr} />
          <Section>
            {rows.map(([label, value]) => (
              <div key={label}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
              </div>
            ))}
          </Section>
          <Hr style={styles.hr} />
          <Text style={styles.label}>Message</Text>
          <Text style={styles.message}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}

ContactNotification.PreviewProps = {
  name: "Alex Example",
  company: "Example BV",
  email: "alex@example.com",
  message: "We would like to meet at Celosphere.",
  subject: "Celosphere",
  receivedAt: new Date().toISOString(),
} satisfies ContactNotificationProps;
