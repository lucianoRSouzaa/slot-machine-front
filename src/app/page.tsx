import { SlotMachine } from "@/components/SlotMachine";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <p className="text-primary">Slot Machine</p>

      <SlotMachine />

      {/* exibir emoji de code: 1F911 */}
      <p>
        <span role="img" aria-label="code">
          {/* pelo code */}
          &#x1F911;
        </span>
      </p>
    </div>
  );
}
