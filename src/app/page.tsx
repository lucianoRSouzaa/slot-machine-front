import { SlotMachine } from "@/components/slot-machine/SlotMachine";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="flex flex-1 justify-center items-center">
          <SlotMachine />
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
