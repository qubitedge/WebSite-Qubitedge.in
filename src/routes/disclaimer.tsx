import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  beforeLoad: () => {
    throw redirect({
      to: "/policy",
      search: { tab: "disclaimer" },
      hash: "disclaimer",
    });
  },
});
