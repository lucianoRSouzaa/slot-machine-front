import { SlotMachine } from "@/components/slot-machine/SlotMachine";

export default function Game() {
  return (
    <div>
      <SlotMachine />

      <p>
        <span role="img" aria-label="code">
          {/* pelo code */}
          &#x1F911;
        </span>
      </p>
    </div>
  );
}
