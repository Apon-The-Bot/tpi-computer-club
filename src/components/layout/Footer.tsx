import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Facebook, Mail } from "lucide-react";
import logo from "/logo.png?url";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[oklch(0.16_0.04_260)]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="TPI Computer Club" className="h-10 w-10 rounded-full ring-1 ring-border" />
              <div>
                <div className="text-sm font-semibold">TPI Computer Club</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Think · Create · Innovate</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A student-driven technology club focused on programming, design, cybersecurity and real-world digital skills.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">Quick Links</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/committee" className="hover:text-foreground">Committee</Link></li>
              <li><Link to="/events" className="hover:text-foreground">Events</Link></li>
              <li><Link to="/notices" className="hover:text-foreground">Notices</Link></li>
              <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">Learning Space</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/learning" className="hover:text-foreground">Overview</Link></li>
              <li><Link to="/courses" className="hover:text-foreground">All Courses</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-foreground">My Profile</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>TPI Campus, Computer Department</li>
              <li>club@tpi-computer.edu</li>
              <li>+880 1700-000000</li>
            </ul>
            <div className="mt-4 flex gap-3 text-muted-foreground">
              <a href="#" className="rounded-md border border-border p-2 hover:text-primary"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="rounded-md border border-border p-2 hover:text-primary"><Github className="h-4 w-4" /></a>
              <a href="#" className="rounded-md border border-border p-2 hover:text-primary"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="rounded-md border border-border p-2 hover:text-primary"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} TPI Computer Club. All rights reserved.</div>
          <div className="font-mono">v1.0 · Built with care by the club</div>
        </div>
      </div>
    </footer>
  );
}
