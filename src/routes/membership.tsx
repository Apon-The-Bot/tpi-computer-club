import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — TPI Computer Club" },
      { name: "description", content: "Apply for membership at TPI Computer Club. Hands-on learning, workshops and a strong tech community." },
      { property: "og:title", content: "Membership — TPI Computer Club" },
      { property: "og:description", content: "Become a member of TPI Computer Club." },
    ],
  }),
  component: Membership,
});

const benefits = [
  "Access to all Learning Space courses",
  "Weekly live classes with mentors",
  "Workshops & contests participation",
  "Project & portfolio guidance",
  "Member-only resources and templates",
  "Leadership & volunteering opportunities",
];

const tracks = ["C Programming", "C++ Programming", "C# Programming", "Graphics Design", "Cyber Security"];

function Membership() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    ["name", "department", "semester", "roll", "phone", "email", "track", "reason"].forEach((k) => {
      if (!fd.get(k)) errs[k] = "Required";
    });
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  }

  return (
    <PublicLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Membership</div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Become a member of TPI Computer Club</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Open to all enrolled TPI students with a serious interest in technology, learning and community.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <SectionHeader eyebrow="Why Join" title="What you get as a member" />
          <ul className="mt-6 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl border border-border bg-card p-5">
            <div className="text-sm font-semibold">Eligibility</div>
            <p className="mt-1 text-sm text-muted-foreground">Currently enrolled TPI student in any department and semester.</p>
            <div className="mt-4 text-sm font-semibold">Member responsibilities</div>
            <p className="mt-1 text-sm text-muted-foreground">Active participation, respectful conduct, and at least one event/contribution per semester.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-primary-foreground"><CheckCircle2 className="h-7 w-7" /></div>
              <h3 className="mt-4 text-xl font-semibold">Application received</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">Thank you for applying. The committee will review your application and contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold">Membership Application</h3>
              <Field label="Full Name" name="name" error={errors.name} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Department" name="department" error={errors.department} />
                <Field label="Semester" name="semester" error={errors.semester} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Roll" name="roll" error={errors.roll} />
                <Field label="Phone" name="phone" error={errors.phone} />
              </div>
              <Field label="Email" name="email" type="email" error={errors.email} />
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Interested Skill Track</label>
                <select name="track" className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary">
                  {tracks.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Why do you want to join?</label>
                <textarea name="reason" rows={3} className="w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-primary" />
                {errors.reason && <p className="mt-1 text-xs text-destructive">Please share your reason.</p>}
              </div>
              <button className="w-full rounded-md bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">Submit Application</button>
            </form>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <input name={name} type={type} className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
