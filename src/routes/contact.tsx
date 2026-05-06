import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Mail, Phone, MapPin, CheckCircle2, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TPI Computer Club" },
      { name: "description", content: "Get in touch with TPI Computer Club. Address, phone, email and contact form." },
      { property: "og:title", content: "Contact — TPI Computer Club" },
      { property: "og:description", content: "Reach out to the TPI Computer Club committee." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PublicLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Contact</div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Get in touch</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">We respond to most messages within one or two working days.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3 md:px-6">
        <div className="space-y-4 md:col-span-1">
          {[
            { icon: MapPin, title: "Club Room", value: "Computer Department, TPI Campus" },
            { icon: Mail, title: "Email", value: "club@tpi-computer.edu" },
            { icon: Phone, title: "Phone", value: "+880 1700-000000" },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-5">
              <c.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 text-xs text-muted-foreground">{c.title}</div>
              <div className="text-sm font-semibold">{c.value}</div>
            </div>
          ))}
          <div className="aspect-video rounded-xl border border-border bg-grid bg-card" />
        </div>

        <div className="md:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            {sent ? (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-primary-foreground"><CheckCircle2 className="h-7 w-7" /></div>
                <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">Thanks for reaching out — we'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <h3 className="text-lg font-semibold">Send us a message</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Name" name="name" />
                  <Input label="Email" name="email" type="email" />
                </div>
                <Input label="Subject" name="subject" />
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Message</label>
                  <textarea required rows={5} className="w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-primary" />
                </div>
                <button className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Input({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <input required name={name} type={type} className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
    </div>
  );
}
