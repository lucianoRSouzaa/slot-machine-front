export function EmojiBox({ symbol }: { symbol: string }) {
  return (
    <div className="text-[48px] w-[60px] h-[60px] flex items-center justify-center">
      {symbol}
    </div>
  );
}
