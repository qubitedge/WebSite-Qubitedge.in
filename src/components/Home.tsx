import { useCMS } from "@/lib/cms";
import { BlockRenderer } from "./BlockRenderer";

export function Home() {
  const { content } = useCMS();
  const blocks = content.pages?.home ?? content.blocks ?? [];

  return (
    <div className="relative text-white">
      {blocks.map((b) => (
        <BlockRenderer key={b.id} block={b} />
      ))}
    </div>
  );
}
