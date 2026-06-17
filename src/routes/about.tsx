import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useCMS } from "@/lib/cms";
import { BlockRenderer } from "@/components/BlockRenderer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — QubitEdge" },
      {
        name: "description",
        content:
          "Learn about QubitEdge — our mission, vision, team, and the story behind our commitment to sharpening potential and building futures through education and innovation.",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "QubitEdge about, company mission, EdTech Hyderabad, innovation team, student growth, tech company India",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://qubitedge.in/about" },
      { property: "og:title", content: "About Us — QubitEdge" },
      {
        property: "og:description",
        content:
          "Learn about QubitEdge — our mission, vision, and the team building futures through education and innovation.",
      },
      { property: "og:image", content: "https://qubitedge.in/logo.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Us — QubitEdge" },
      {
        name: "twitter:description",
        content:
          "Learn about QubitEdge — our mission, vision, and the team building futures through education and innovation.",
      },
      { name: "twitter:image", content: "https://qubitedge.in/logo.webp" },
    ],
    links: [{ rel: "canonical", href: "https://qubitedge.in/about" }],
  }),
  component: About,
});

function About() {
  const { content } = useCMS();
  const blocks = content.pages?.about ?? [];

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
