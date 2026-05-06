import collabAnnouncement from "@/assets/collab-announcement.png";
import collabCareerSummit from "@/assets/collab-career-summit.png";
import collabCareerGuidelines from "@/assets/collab-career-guidelines.png";
import collabAiSummit from "@/assets/collab-ai-summit.png";

export type EventCategory = "Workshop" | "Seminar" | "Competition" | "Training" | "Awareness" | "Collaboration";
export interface ClubEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  location: string;
  description: string;
  upcoming: boolean;
  image?: string;
  host?: string;
}
export const events: ClubEvent[] = [
  { id: "c1", title: "Polytechnic Coders × TPI Computer Club — Collaboration Announcement", category: "Collaboration", date: "2025-12-15", location: "Online", description: "Official partnership announcement between Polytechnic Coders by Programming Hero and TPI Computer Club.", upcoming: false, image: collabAnnouncement, host: "Programming Hero" },
  { id: "c2", title: "Career Guidelines & QnA Session", category: "Seminar", date: "2025-12-20", location: "Online · 7:30 – 8:30 PM", description: "Live session with Jhankar Mahbub (CEO, Programming Hero) and Mohammad Anisul Islam, organised by TPI Computer Club.", upcoming: false, image: collabCareerGuidelines, host: "Programming Hero × TPI" },
  { id: "c3", title: "Polytechnic Career Summit", category: "Collaboration", date: "2026-05-30", location: "Online · Registration Open", description: "Official Polytechnic Career Summit in collaboration with Programming Hero — career roadmaps, mentorship and industry insights.", upcoming: true, image: collabCareerSummit, host: "Programming Hero × TPI" },
  { id: "c4", title: "AI Career Summit 2026", category: "Collaboration", date: "2026-07-15", location: "Online · Registration Open", description: "Presented by Programming Hero × Polytechnic Coders — explore the AI career landscape with industry leaders.", upcoming: true, image: collabAiSummit, host: "Programming Hero × TPI" },
  { id: "e1", title: "Intro to Web Development Workshop", category: "Workshop", date: "2026-05-22", location: "TPI Lab 3", description: "Hands-on session on HTML, CSS and basic JavaScript.", upcoming: true },
  { id: "e2", title: "Cyber Awareness Seminar", category: "Awareness", date: "2026-06-04", location: "Main Auditorium", description: "Learn how to stay safe online and recognize common attacks.", upcoming: true },
  { id: "e3", title: "C Programming Contest", category: "Competition", date: "2026-06-18", location: "Computer Lab", description: "Solve algorithmic problems using C in a timed contest.", upcoming: true },
  { id: "e4", title: "Photoshop Bootcamp", category: "Training", date: "2026-07-02", location: "Design Studio", description: "Three-day intensive bootcamp on Adobe Photoshop.", upcoming: true },
  { id: "e5", title: "Industry Talk: Careers in IT", category: "Seminar", date: "2025-12-12", location: "Main Auditorium", description: "Insights from industry leaders on building an IT career.", upcoming: false },
  { id: "e6", title: "Logo Design Challenge", category: "Competition", date: "2025-11-20", location: "Online", description: "A 48-hour design sprint to create a club mascot.", upcoming: false },
];
