import { useCMS } from "@/lib/cms";
import { BlockRenderer } from "./BlockRenderer";

export function Home() {
  const { content } = useCMS();
  const bg = content.background;

  return (
    <div className="relative text-white">

      {content.blocks.map((b) => (
        <BlockRenderer key={b.id} block={b} />
      ))}
    </div>
  );
}
