import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/copyright")({
  beforeLoad: () => {
    throw redirect({
      to: "/policy",
      search: { tab: "copyright" },
      hash: "copyright",
    });
  },
});
