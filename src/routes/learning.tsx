import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useCMS } from "@/lib/cms";
import { BlockRenderer } from "@/components/BlockRenderer";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning & Internships — QubitEdge" },
      {
        name: "description",
        content:
          "Explore QubitEdge's learning programs and internship opportunities in AI, data science, quantum computing, and software development. Gain real-world experience and industry mentorship.",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "QubitEdge internships, AI internship Hyderabad, data science internship, software development internship, student learning programs, tech internship India",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://qubitedge.in/learning" },
      { property: "og:title", content: "Learning & Internships — QubitEdge" },
      {
        property: "og:description",
        content:
          "Internship opportunities in AI, data science, quantum computing, and software development with real-world experience and industry mentorship.",
      },
      { property: "og:image", content: "https://qubitedge.in/Internships.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Learning & Internships — QubitEdge" },
      {
        name: "twitter:description",
        content:
          "Internship opportunities in AI, data science, quantum computing, and software development with industry mentorship.",
      },
      { name: "twitter:image", content: "https://qubitedge.in/Internships.webp" },
    ],
    links: [{ rel: "canonical", href: "https://qubitedge.in/learning" }],
  }),
  component: Learning,
});

function Learning() {
  const { content } = useCMS();
  const blocks = content.pages?.learning ?? [];

  return (
    <main className="min-h-screen text-white pt-16 selection:bg-[#64CEFB]/30">
      <Navbar />
      <div>
        {blocks.map((b) => (
          <BlockRenderer key={b.id} block={b} />
        ))}
      </div>
    </main>
  );
}
