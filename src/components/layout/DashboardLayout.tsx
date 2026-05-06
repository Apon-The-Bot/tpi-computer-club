import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Radio,
  TrendingUp,
  Bell,
  Calendar,
  User,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import logo from "/logo.png?url";

const items = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/dashboard", label: "Live Class", icon: Radio, hash: "live" },
  { to: "/profile", label: "My Progress", icon: TrendingUp },
  { to: "/notices", label: "Notices", icon: Bell },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function DashboardLayout({ children, title }: { children: ReactNode; title?: string }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-3 border-b border-sidebar-border px-5">
          <Link to="/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logo} alt="TPI" className="h-8 w-8 rounded-full ring-1 ring-sidebar-border" />
            <div>
              <div className="text-xs font-semibold">Learning Space</div>
              <div className="text-[10px] text-muted-foreground">TPI Computer Club</div>
            </div>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <nav className="px-3 py-4">
          {items.map((it, idx) => {
            const active = path === it.to && !("hash" in it && it.hash);
            const Icon = it.icon;
            return (
              <Link
                key={idx}
                to={it.to}
                onClick={() => setOpen(false)}
                className={`mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{it.label}</span>
              </Link>
            );
          })}
          <div className="my-4 border-t border-sidebar-border" />
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Website
          </Link>
        </nav>
      </aside>

      {/* Backdrop */}
      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
            <div>
              <div className="text-sm font-semibold">{title ?? "Dashboard"}</div>
              <div className="text-[11px] text-muted-foreground font-mono">tpi-club / learning-space</div>
            </div>
          </div>
          <Link to="/profile" className="flex items-center gap-2 rounded-full border border-border px-2 py-1 text-xs">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-gradient text-[11px] font-bold text-primary-foreground">AI</span>
            <span className="hidden sm:inline">Ariful Islam</span>
          </Link>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
