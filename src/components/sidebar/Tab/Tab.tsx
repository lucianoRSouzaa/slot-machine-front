import Link from "next/link";
import { SidebarTabProps } from "./tab-props";

export function SidebarTab({ icon, text, href }: SidebarTabProps) {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2 text-white gap-1.5 transition-colors rounded-md hover:bg-accent hover:text-black"
    >
      {icon}
      <p className="text-sm">{text}</p>
    </Link>
  );
}
