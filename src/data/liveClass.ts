export interface LiveClass {
  id: string;
  title: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  meetingLink: string;
  status: "Upcoming" | "Live" | "Ended";
}
export const todaysLiveClass: LiveClass = {
  id: "lc1",
  title: "Pointers & Dynamic Memory in C",
  course: "C Programming",
  instructor: "Md. Rakibul Islam",
  date: new Date().toISOString().slice(0, 10),
  time: "8:00 PM",
  meetingLink: "https://meet.google.com/",
  status: "Live",
};
export const upcomingClasses: LiveClass[] = [
  { id: "lc2", title: "OOP Pillars in C++", course: "C++ Programming", instructor: "Sharmin Akter", date: "Tomorrow", time: "8:00 PM", meetingLink: "https://meet.google.com/", status: "Upcoming" },
  { id: "lc3", title: "Photoshop Layers Deep Dive", course: "Graphics Design", instructor: "Nusrat Jahan", date: "Fri", time: "7:30 PM", meetingLink: "https://meet.google.com/", status: "Upcoming" },
  { id: "lc4", title: "OWASP Top 10 Walkthrough", course: "Cyber Security", instructor: "Arman Chowdhury", date: "Sat", time: "9:00 PM", meetingLink: "https://meet.google.com/", status: "Upcoming" },
];
