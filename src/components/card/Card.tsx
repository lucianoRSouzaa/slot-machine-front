import { memo } from "react";
import { Button } from "../button";

export function CardComponent() {
  return (
    <div className="bg-backgound-card text-font-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">Animal Kingdom</h3>
      <p className="text-font-description mb-4">
        Match pairs of adorable animals in this fun game.
      </p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">Stake: $20</span>
        <span className="text-sm text-green-400">Potential Win: $100</span>
      </div>

      <Button>Play now</Button>
    </div>
  );
}

export const Card = memo(CardComponent);
