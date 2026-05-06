export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  initials: string;
}

export const team: TeamMember[] = [
  {
    id: "t1",
    name: "Shahidul Islam",
    role: "President",
    department: "CST · 7th Sem · Shift 1",
    bio: "Leads the club's vision, strategy and external collaborations.",
    initials: "SI",
  },
  {
    id: "t2",
    name: "Md. Amanullah Sheikh Apon",
    role: "Vice President",
    department: "CST · 7th Sem · Shift 2",
    bio: "Supports leadership and coordinates club-wide initiatives.",
    initials: "AA",
  },
  {
    id: "t3",
    name: "Tasnim Nahar Tanha",
    role: "General Secretary",
    department: "CST · 7th Sem · Shift 1",
    bio: "Manages communication, notices and member records.",
    initials: "TT",
  },
  {
    id: "t4",
    name: "Tamim Khan",
    role: "Joint General Secretary",
    department: "CST · 5th Sem · Shift 1",
    bio: "Assists the General Secretary in day-to-day operations.",
    initials: "TK",
  },
  {
    id: "t5",
    name: "Afrin Zaman Anika",
    role: "Finance Secretary",
    department: "CST · 7th Sem · Shift 2",
    bio: "Oversees club finances, budgeting and sponsorships.",
    initials: "AA",
  },
  {
    id: "t6",
    name: "Merajul Hridoy",
    role: "Assistant Finance Secretary",
    department: "CST · 7th Sem · Shift 1",
    bio: "Supports financial planning and expense tracking.",
    initials: "MH",
  },
  {
    id: "t7",
    name: "Iyad Al Ramim",
    role: "Event Coordinator",
    department: "CST · 7th Sem · Shift 1",
    bio: "Plans and executes club events, workshops and contests.",
    initials: "IR",
  },
  {
    id: "t8",
    name: "Seratul Alim Khan Rhythm",
    role: "Publication Secretary",
    department: "CST · 7th Sem · Shift 2",
    bio: "Leads publications, content and editorial work for the club.",
    initials: "SR",
  },
  {
    id: "t9",
    name: "Md. Rakib Hasan",
    role: "Media Secretary",
    department: "CST · 5th Sem · Shift 1",
    bio: "Handles media coverage, photography and brand assets.",
    initials: "RH",
  },
  {
    id: "t10",
    name: "Md. Mehedi Hasan Munna",
    role: "Training & Development Secretary",
    department: "CST · 5th Sem · Shift 2",
    bio: "Drives training programs and skill development tracks.",
    initials: "MM",
  },
  {
    id: "t11",
    name: "Oli Ahmed",
    role: "Technical & Communication Secretary",
    department: "CST · 7th Sem · Shift 2",
    bio: "Maintains technical infrastructure and member communication.",
    initials: "OA",
  },
];
