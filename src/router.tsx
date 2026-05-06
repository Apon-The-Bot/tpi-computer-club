import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { CoderLoader } from "./components/ui/coder-loader";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: () => (
      <div className="fixed inset-0 z-50 grid place-items-center bg-background/50 backdrop-blur-xl animate-fade-in">
        <CoderLoader label="Loading the next page…" size={260} />
      </div>
    ),
    defaultPendingMs: 200,
  });

  return router;
};

