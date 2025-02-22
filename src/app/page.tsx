import { SlotMachine } from "@/components/SlotMachine";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-1 justify-center items-center">
        <SlotMachine />
      </div>

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
