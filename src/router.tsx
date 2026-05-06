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
      <div className="grid min-h-[60vh] place-items-center px-4">
        <CoderLoader label="Loading the next page…" />
      </div>
    ),
    defaultPendingMs: 200,
  });

  return router;
};

