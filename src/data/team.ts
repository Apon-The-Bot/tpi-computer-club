export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  initials: string;
}
export const team: TeamMember[] = [
  { id: "t1", name: "Engr. Mahbubur Rahman", role: "Chief Advisor", department: "Computer Department", bio: "Guiding the club with 15+ years of teaching experience.", initials: "MR" },
  { id: "t2", name: "Sadia Islam", role: "President", department: "CST · 7th Sem", bio: "Leads the club's strategy and external collaborations.", initials: "SI" },
  { id: "t3", name: "Rakibul Hasan", role: "Vice President", department: "CST · 6th Sem", bio: "Coordinates training programs and weekly workshops.", initials: "RH" },
  { id: "t4", name: "Nusrat Jahan", role: "General Secretary", department: "CST · 5th Sem", bio: "Manages communication, notices and member records.", initials: "NJ" },
  { id: "t5", name: "Tanvir Ahmed", role: "Executive · Programming", department: "CST · 5th Sem", bio: "Runs the programming track and contest preparation.", initials: "TA" },
  { id: "t6", name: "Mehedi Hasan", role: "Executive · Design", department: "CST · 4th Sem", bio: "Leads design challenges and brand assets.", initials: "MH" },
  { id: "t7", name: "Arman Chowdhury", role: "Executive · Cyber Security", department: "CST · 6th Sem", bio: "Drives cyber security awareness and training.", initials: "AC" },
  { id: "t8", name: "Sharmin Akter", role: "Volunteer", department: "CST · 3rd Sem", bio: "Supports event logistics and member onboarding.", initials: "SA" },
];
