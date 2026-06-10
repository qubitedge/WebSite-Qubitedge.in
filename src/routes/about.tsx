import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useCMS } from "@/lib/cms";
import { BlockRenderer } from "@/components/BlockRenderer";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us — Qubitedge" }] }),
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
