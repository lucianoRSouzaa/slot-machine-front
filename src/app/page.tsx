import { SlotMachine } from "@/components/SlotMachine";

export default function Home() {
  return (
    <div>
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
