"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Reel } from "./Reel";

const symbols: string[] = ["🤑", "🥶", "👽", "❤️‍🔥", "💥"];

// Helper to pick a random emoji excluding given ones.
const getRandomDistinct = (exclusions: string[]): string => {
  let candidate: string;
  do {
    candidate = symbols[Math.floor(Math.random() * symbols.length)];
  } while (exclusions.includes(candidate));
  return candidate;
};

const mapSymbolToValue: { [key: string]: number } = {
  money_mouth_face: 0,
  cold_face: 1,
  alien: 2,
  heart_on_fire: 3,
  collision: 4,
};

interface ApiResponse {
  win: boolean;
  result: string[];
}

const fetchResultsFromAPI = async (): Promise<number[]> => {
  const response = await axios.post<ApiResponse>("/api/play", {
    machine_id: "97a7d476-902e-4dc4-abff-8b8b62666ccb",
    amount_bet: 1,
  });

  const data = response.data;

  console.log(data);

  if (data.win) {
    console.log(data.result);
  }

  const result: number[] = [];

  for (let i = 0; i < 3; i++) {
    const icon = data.result[i];
    const symbolIndex = mapSymbolToValue[icon];
    result.push(symbolIndex);
  }

  return result;
};

export const SlotMachine: React.FC = () => {
  const [reelSymbols, setReelSymbols] = useState<string[][]>([]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("");
  const [reelPositions, setReelPositions] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const initialSymbols: string[][] = [];
    for (let i = 0; i < 3; i++) {
      const symbolsArray: string[] = [];
      for (let j = 0; j < 3; j++) {
        symbolsArray.push(getRandomDistinct(symbolsArray));
      }
      initialSymbols.push(symbolsArray);
    }
    setReelSymbols(initialSymbols);
  }, []);

  const spin = async () => {
    if (reelSymbols.length === 0) return;

    setMessage("");
    setSpinning(true);

    const apiResult = await fetchResultsFromAPI();

    const updatedReelSymbols: string[][] = [[], [], []];
    const newPositions = [...reelPositions];

    const reelSpinDurations = [
      2000 + Math.random() * 1000,
      2500 + Math.random() * 1000,
      3000 + Math.random() * 1000,
    ];

    for (let i = 0; i < 3; i++) {
      const spinSymbols: string[] = [];
      for (let j = 0; j < 30; j++) {
        spinSymbols.push(symbols[Math.floor(Math.random() * symbols.length)]);
      }
      // Insert the API emoji at second-to-last position.
      spinSymbols.splice(spinSymbols.length - 1, 0, symbols[apiResult[i]]);

      updatedReelSymbols[i] = [...reelSymbols[i], ...spinSymbols];

      const spinDistance = -(spinSymbols.length * 60);
      newPositions[i] += spinDistance;
    }

    // Ensure the last three emojis in each reel are different without changing the API emoji.
    for (let i = 0; i < 3; i++) {
      const reel = updatedReelSymbols[i];
      const len = reel.length;
      const indexAPI = len - 2; // API emoji (cannot be changed)
      const indexLast = len - 1; // Last emoji
      const indexThird = len - 3; // Third-to-last emoji

      // If last emoji equals API emoji, update it.
      if (reel[indexLast] === reel[indexAPI]) {
        console.log("last emoji equals API emoji");

        reel[indexLast] = getRandomDistinct([reel[indexAPI]]);
      }
      // If third-to-last emoji equals API or last emoji, update it.
      if (
        reel[indexThird] === reel[indexAPI] ||
        reel[indexThird] === reel[indexLast]
      ) {
        console.log("third-to-last emoji equals API or last emoji");

        reel[indexThird] = getRandomDistinct([reel[indexAPI], reel[indexLast]]);
      }
    }

    setReelSymbols(updatedReelSymbols);
    setReelPositions(newPositions);

    setTimeout(() => {
      setSpinning(false);
      if (apiResult.every((val) => val === apiResult[0])) {
        setMessage("Você venceu!");
      } else {
        setMessage("Tente novamente!");
      }

      const totalShift: number[] = [];
      for (let i = 0; i < 3; i++) {
        totalShift[i] = Math.floor(Math.abs(newPositions[i]) / 60);
      }

      setReelSymbols((prevReelSymbols) =>
        prevReelSymbols.map((symbolsArray, i) => {
          const symbolsToKeep = symbolsArray.slice(
            totalShift[i],
            totalShift[i] + 3
          );
          return symbolsToKeep;
        })
      );

      setReelPositions([0, 0, 0]);
    }, Math.max(...reelSpinDurations) + 100);
  };

  return (
    <div className="text-center bg-[#222] max-w-[300px] my-12 mx-auto p-5 rounded-lg">
      {reelSymbols.length > 0 ? (
        <>
          <div className="flex justify-center mb-5 gap-5">
            {[0, 1, 2].map((reelIndex) => (
              <Reel
                key={reelIndex}
                symbols={reelSymbols[reelIndex]}
                position={reelPositions[reelIndex]}
                spinning={spinning}
                reelIndex={reelIndex}
              />
            ))}
          </div>
          <button onClick={spin} disabled={spinning}>
            Girar
          </button>
          {message && <p>{message}</p>}
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};
