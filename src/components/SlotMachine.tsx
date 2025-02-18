"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SlotMachine.module.css";

const symbols: string[] = ["🤑", "🥶", "👽", "❤️‍🔥", "💥"];

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
    player_id: "player1",
    machine_id: "machine5",
    amount_bet: 50,
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
        symbolsArray.push(symbols[Math.floor(Math.random() * symbols.length)]);
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
      spinSymbols.splice(spinSymbols.length - 1, 0, symbols[apiResult[i]]);

      updatedReelSymbols[i] = [...reelSymbols[i], ...spinSymbols];

      const spinDistance = -(spinSymbols.length * 60);
      newPositions[i] += spinDistance;
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
    <div className={styles.slotMachine}>
      {reelSymbols.length > 0 ? (
        <>
          <div className={styles.reels}>
            {[0, 1, 2].map((reelIndex) => (
              <div key={reelIndex} className={styles.reelContainer}>
                <div
                  className={styles.reel}
                  style={{
                    transform: `translateY(${reelPositions[reelIndex]}px)`,
                    transition: spinning
                      ? `transform ${
                          2 + reelIndex * 0.5
                        }s cubic-bezier(0.33, 1, 0.68, 1)`
                      : "none",
                  }}
                >
                  {reelSymbols[reelIndex].map((symbol, index) => (
                    <div key={index} className={styles.symbol}>
                      {symbol}
                    </div>
                  ))}
                </div>
              </div>
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
