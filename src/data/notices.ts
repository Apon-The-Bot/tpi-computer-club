export interface Notice {
  id: string;
  title: string;
  category: "General" | "Important" | "Event" | "Class";
  date: string;
  important?: boolean;
  body: string;
}
export const notices: Notice[] = [
  { id: "n1", title: "Membership Drive 2026 Open", category: "Important", date: "2026-05-01", important: true, body: "Applications for new members are now open. Submit your form via the Membership page before May 31st." },
  { id: "n2", title: "Live Class Schedule Updated", category: "Class", date: "2026-04-28", body: "The weekly live class schedule has been updated. Please check your dashboard for new timings." },
  { id: "n3", title: "Annual Tech Fest Announced", category: "Event", date: "2026-04-20", important: true, body: "TPI Tech Fest will be held on August 12. Get ready for workshops, talks and contests." },
  { id: "n4", title: "Lab Maintenance Notice", category: "General", date: "2026-04-12", body: "Computer Lab 2 will be closed on April 18 for routine maintenance." },
  { id: "n5", title: "New Cyber Security Course Launched", category: "General", date: "2026-04-05", body: "Enroll in the new Cyber Security course from the Learning Space." },
];
