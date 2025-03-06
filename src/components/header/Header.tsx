import { memo } from "react";

export function HeaderComponent() {
  return (
    <header className="p-4 flex-1 bg-background-weaker flex items-center justify-between">
      <p className="text-2xl font-bold text-font-white">Slot Machine</p>

      <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
        <span className="font-semibold text-sm text-font-white">Balance: </span>
        <span className="text-sm text-font-white">$1000.00</span>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
