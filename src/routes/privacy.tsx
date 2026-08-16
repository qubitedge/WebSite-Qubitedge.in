import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  beforeLoad: () => {
    throw redirect({
      to: "/policy",
      search: { tab: "privacy" },
      hash: "privacy",
    });
  },
});
