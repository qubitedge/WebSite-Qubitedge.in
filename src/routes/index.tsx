import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/components/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QubitEdge — Sharpening Potential. Building Futures." },
      {
        name: "description",
        content:
          "QubitEdge is a growth ecosystem bridging talent and opportunity through hands-on workshops, cutting-edge IT services, internships, and enterprise solutions. Based in Hyderabad.",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "QubitEdge, internships Hyderabad, IT workshops, AI training, quantum computing, data science courses, enterprise IT solutions, student programs",
      },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://qubitedge.in/" },
      { property: "og:title", content: "QubitEdge — Sharpening Potential. Building Futures." },
      {
        property: "og:description",
        content:
          "Workshops, IT services, internships, and enterprise solutions for students, businesses, and leaders.",
      },
      { property: "og:image", content: "https://qubitedge.in/logo.webp" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "QubitEdge — Sharpening Potential. Building Futures." },
      {
        name: "twitter:description",
        content:
          "Workshops, IT services, internships, and enterprise solutions for students, businesses, and leaders.",
      },
      { name: "twitter:image", content: "https://qubitedge.in/logo.webp" },
    ],
    links: [{ rel: "canonical", href: "https://qubitedge.in/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Home />
    </main>
  );
}
