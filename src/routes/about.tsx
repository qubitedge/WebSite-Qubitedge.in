import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useCMS } from "@/lib/cms";
import { useAdmin } from "@/lib/AdminContext";
import { BlockRenderer } from "@/components/BlockRenderer";
import { BlockWrapper } from "@/components/BlockWrapper";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — qubitedge" },
      {
        name: "description",
        content:
          "Learn about qubitedge — our mission, vision, team, and the story behind our commitment to sharpening potential and building futures through education and innovation.",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "qubitedge about, company mission, EdTech Hyderabad, innovation team, student growth, tech company India",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://qubitedge.in/about" },
      { property: "og:title", content: "About Us — qubitedge" },
      {
        property: "og:description",
        content:
          "Learn about qubitedge — our mission, vision, and the team building futures through education and innovation.",
      },
      { property: "og:image", content: "https://qubitedge.in/logo.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Us — qubitedge" },
      {
        name: "twitter:description",
        content:
          "Learn about qubitedge — our mission, vision, and the team building futures through education and innovation.",
      },
      { name: "twitter:image", content: "https://qubitedge.in/logo.webp" },
    ],
    links: [{ rel: "canonical", href: "https://qubitedge.in/about" }],
  }),
  component: About,
});

function About() {
  const { content } = useCMS();
  const { isAdmin } = useAdmin();
  const blocks = content.pages?.about ?? [];

  return (
    <main className="min-h-screen text-white pt-16 selection:bg-[#64CEFB]/30">
      <Navbar />
      <div>
        {blocks.map((b, i) => (
          isAdmin ? (
            <BlockWrapper key={b.id} blockId={b.id} blockType={b.type} pageId="about" index={i} total={blocks.length}>
              <BlockRenderer block={b} pageId="about" />
            </BlockWrapper>
          ) : (
            <BlockRenderer key={b.id} block={b} pageId="about" />
          )
        ))}
      </div>
    </main>
  );
}
