import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useCMS } from "@/lib/cms";
import { BlockRenderer } from "@/components/BlockRenderer";

export const Route = createFileRoute("/learning")({
  head: () => ({ meta: [{ title: "Learning — Qubitedge" }] }),
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
