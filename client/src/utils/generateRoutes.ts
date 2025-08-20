import type { ISidebarItmes } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItmes[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};