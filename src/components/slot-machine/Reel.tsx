import { EmojiBox } from "./EmojiBox";

interface ReelProps {
  symbols: string[];
  position: number;
  spinning: boolean;
  reelIndex: number;
}

export function Reel({ symbols, position, spinning, reelIndex }: ReelProps) {
  return (
    <div className="w-[64px] h-[188px] overflow-hidden border-2 border-[#333] rounded-lg bg-[#333]">
      <div
        className="flex flex-col"
        style={{
          transform: `translateY(${position}px)`,
          transition: spinning
            ? `transform ${2 + reelIndex * 0.5}s cubic-bezier(0.33, 1, 0.68, 1)`
            : "none",
        }}
      >
        {symbols.map((symbol, index) => (
          <EmojiBox symbol={symbol} key={index} />
        ))}
      </div>
    </div>
  );
}
