import { SlotMachine } from "@/components/slot-machine/SlotMachine";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { Card } from "@/components/card/Card";
import { CardProps } from "@/components/card/card-props";

const cards: CardProps[] = [
  {
    description: "Match pairs of adorable animals in this fun game.",
    level: 1,
    multipleGain: 5,
    symbols: ["🐶", "🐱", "🐭", "🐹", "🐰"],
    title: "Animal Kingdom",
  },
  {
    description:
      "Match pairs of adorable animals in this fun game but this is so much better.",
    level: 2,
    multipleGain: 10,
    symbols: ["🤩", "🥶", "😂", "🥵", "🍕"],
    title: "Emoji Fun",
  },
];

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-6 text-font-white">
            Machine Challenges
          </h3>

          <div className="flex flex-1 justify-center items-stretch gap-8">
            {cards.map((card) => (
              <Card
                key={card.title}
                description={card.description}
                level={card.level}
                multipleGain={card.multipleGain}
                symbols={card.symbols}
                title={card.title}
              />
            ))}
            {/* <SlotMachine /> */}
          </div>
        </div>

        {/* exibir emoji de code: 1F911 */}
        {/* <p>
        <span role="img" aria-label="code">
          &#x1F911;
        </span>
      </p> */}
      </div>
    </div>
  );
}
