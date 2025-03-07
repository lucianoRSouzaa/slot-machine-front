"use client";

import { memo, useEffect, useState } from "react";
import { Button } from "../button";
import { Reel } from "../slot-machine/Reel";
import { getRandomDistinct } from "../slot-machine/SlotMachine";
import { CardProps } from "./card-props";

export function CardComponent({
  description,
  level,
  multipleGain,
  symbols,
  title,
}: CardProps) {
  const [reelSymbols, setReelSymbols] = useState<string[][]>([]);

  useEffect(() => {
    const initialSymbols: string[][] = [];
    for (let i = 0; i < 3; i++) {
      const symbolsArray: string[] = [];
      for (let j = 0; j < 3; j++) {
        symbolsArray.push(getRandomDistinct(symbolsArray, symbols));
      }
      initialSymbols.push(symbolsArray);
    }
    setReelSymbols(initialSymbols);
  }, []);

  return (
    <div className="bg-backgound-card text-font-white rounded-lg shadow-md p-6 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-font-description mb-4">{description}</p>

        <div className="flex justify-center mb-5 gap-5">
          {reelSymbols?.length &&
            [0, 1, 2].map((reelIndex) => (
              <Reel
                key={reelIndex}
                symbols={reelSymbols[reelIndex]}
                position={0}
                spinning={false}
                reelIndex={reelIndex}
              />
            ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm">Level: {level}</span>
          <span className="text-sm text-green-400">
            Multiple Gain: ${multipleGain}
          </span>
        </div>
      </div>

      <Button>Play now</Button>
    </div>
  );
}

export const Card = memo(CardComponent);
