import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useCMS } from "@/lib/cms";
import { useAdmin } from "@/lib/AdminContext";
import { BlockRenderer } from "@/components/BlockRenderer";
import { BlockWrapper } from "@/components/BlockWrapper";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Workshops — qubitedge" },
      {
        name: "description",
        content:
          "Join qubitedge's micro-workshops and skill-building sessions in AI, quantum computing, data science, business analytics, and more. Short, intensive, and industry-relevant training.",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "qubitedge workshops, AI workshop Hyderabad, quantum computing workshop, data science training, micro-workshops, tech skill building, business analytics workshop",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://qubitedge.in/workshops" },
      { property: "og:title", content: "Workshops — qubitedge" },
      {
        property: "og:description",
        content:
          "Micro-workshops and skill-building sessions in AI, quantum computing, data science, and more. Short, intensive, industry-relevant training.",
      },
      { property: "og:image", content: "https://qubitedge.in/micro-workshops.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Workshops — qubitedge" },
      {
        name: "twitter:description",
        content:
          "Micro-workshops in AI, quantum computing, data science, and more. Short, intensive, industry-relevant training.",
      },
      { name: "twitter:image", content: "https://qubitedge.in/micro-workshops.webp" },
    ],
    links: [{ rel: "canonical", href: "https://qubitedge.in/workshops" }],
  }),
  component: Workshops,
});

function Workshops() {
  const { content } = useCMS();
  const { isAdmin } = useAdmin();
  const blocks = content.pages?.workshops ?? [];

  return (
    <main className="min-h-screen text-white pt-16 selection:bg-[#64CEFB]/30">
      <Navbar />
      <div>
        {blocks.map((b, i) => (
          isAdmin ? (
            <BlockWrapper key={b.id} blockId={b.id} blockType={b.type} pageId="workshops" index={i} total={blocks.length}>
              <BlockRenderer block={b} pageId="workshops" />
            </BlockWrapper>
          ) : (
            <BlockRenderer key={b.id} block={b} pageId="workshops" />
          )
        ))}
      </div>
    </main>
  );
}
