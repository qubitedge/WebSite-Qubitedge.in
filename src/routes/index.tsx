import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/components/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qubitedge — Sharpening Potential. Building Futures." },
      { name: "description", content: "Qubitedge is an ecosystem for growth, bridging talent and opportunity through workshops, IT services, and enterprise solutions." },
      { property: "og:title", content: "Qubitedge — Sharpening Potential. Building Futures." },
      { property: "og:description", content: "Workshops, IT services, and enterprise solutions for students, businesses and leaders." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-black min-h-screen relative">
      <Navbar />
      <Home />
    </main>
  );
}
