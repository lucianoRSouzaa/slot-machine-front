import { memo } from "react";
import { HelpCircle, Home } from "lucide-react";
import { SidebarTab, SidebarTabType } from "./Tab";
import { Button } from "../button";

const sidebarTabs: SidebarTabType[] = [
  {
    href: "/",
    text: "Home",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    href: "/about",
    text: "Help",
    icon: <HelpCircle className="mr-2 h-4 w-4" />,
  },
];

export function SidebarComponent() {
  return (
    <nav className="sidebar p-4 h-screen w-64 bg-background-weaker flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <p className="text-primary text-2xl font-semibold">Slot Machine</p>

        <div className="flex flex-col gap-1">
          {sidebarTabs.map((tab) => (
            <SidebarTab
              key={tab.href}
              href={tab.href}
              icon={tab.icon}
              text={tab.text}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button variant="secondary">
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </nav>
  );
}

export const Sidebar = memo(SidebarComponent);
