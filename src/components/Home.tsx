import { useCMS } from "@/lib/cms";
import { useAdmin } from "@/lib/AdminContext";
import { BlockRenderer } from "./BlockRenderer";
import { BlockWrapper } from "./BlockWrapper";

export function Home() {
  const { content } = useCMS();
  const { isAdmin } = useAdmin();
  const blocks = content.pages?.home ?? content.blocks ?? [];

  return (
    <div className="relative text-white">
      {blocks.map((b, i) => (
        isAdmin ? (
          <BlockWrapper key={b.id} blockId={b.id} blockType={b.type} pageId="home" index={i} total={blocks.length}>
            <BlockRenderer block={b} pageId="home" />
          </BlockWrapper>
        ) : (
          <BlockRenderer key={b.id} block={b} pageId="home" />
        )
      ))}
    </div>
  );
}
