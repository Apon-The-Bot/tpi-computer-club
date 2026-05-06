export type EventCategory = "Workshop" | "Seminar" | "Competition" | "Training" | "Awareness";
export interface ClubEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  location: string;
  description: string;
  upcoming: boolean;
}
export const events: ClubEvent[] = [
  { id: "e1", title: "Intro to Web Development Workshop", category: "Workshop", date: "2026-05-22", location: "TPI Lab 3", description: "Hands-on session on HTML, CSS and basic JavaScript.", upcoming: true },
  { id: "e2", title: "Cyber Awareness Seminar", category: "Awareness", date: "2026-06-04", location: "Main Auditorium", description: "Learn how to stay safe online and recognize common attacks.", upcoming: true },
  { id: "e3", title: "C Programming Contest", category: "Competition", date: "2026-06-18", location: "Computer Lab", description: "Solve algorithmic problems using C in a timed contest.", upcoming: true },
  { id: "e4", title: "Photoshop Bootcamp", category: "Training", date: "2026-07-02", location: "Design Studio", description: "Three-day intensive bootcamp on Adobe Photoshop.", upcoming: true },
  { id: "e5", title: "Industry Talk: Careers in IT", category: "Seminar", date: "2025-12-12", location: "Main Auditorium", description: "Insights from industry leaders on building an IT career.", upcoming: false },
  { id: "e6", title: "Logo Design Challenge", category: "Competition", date: "2025-11-20", location: "Online", description: "A 48-hour design sprint to create a club mascot.", upcoming: false },
];
