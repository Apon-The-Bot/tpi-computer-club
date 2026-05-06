import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

import appCss from "../styles.css?url";
import { CoderLoader } from "@/components/ui/coder-loader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TPI Computer Club — Think. Create. Innovate." },
      { name: "description", content: "TPI Computer Club is a student-driven IT community offering courses, workshops, live classes and a complete Learning Space." },
      { name: "author", content: "TPI Computer Club" },
      { property: "og:title", content: "TPI Computer Club — Think. Create. Innovate." },
      { property: "og:description", content: "Programming, design, cyber security and a full Learning Space LMS for TPI students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  // Initial mount: kick off "ready" after a small delay so the success state shows on first paint
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Show loader on every navigation (including same-route re-clicks)
  useEffect(() => {
    const trigger = () => {
      setDone(false);
      setLoading(true);
    };
    const finish = () => {
      // route is resolved -> tell loader it can switch to success
      setDone(true);
    };

    const unsub = router.subscribe("onBeforeNavigate", trigger);
    const unsubResolved = router.subscribe("onResolved", finish);

    // Catch same-route clicks (router won't fire navigation events for those)
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = (e.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || target.target === "_blank") return;
      const currentPath = window.location.pathname;
      const linkPath = href.split("?")[0].split("#")[0];
      if (linkPath === currentPath) {
        trigger();
        // simulate a quick resolve so success still shows
        setTimeout(finish, 50);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      unsub();
      unsubResolved();
      document.removeEventListener("click", onClick);
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {loading && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-background/90 backdrop-blur-md animate-in fade-in duration-200">
          <CoderLoader
            done={done}
            size={320}
            label="Loading…"
            cycleMs={1500}
            slapMs={550}
            successHoldMs={1200}
            onSuccessHoldComplete={() => setLoading(false)}
          />
        </div>
      )}
    </QueryClientProvider>
  );
}
