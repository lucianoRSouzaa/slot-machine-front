import { ReactNode } from "react";

export interface SidebarTabProps {
  icon: ReactNode;
  text: string;
  href: string;
}

export type SidebarTabType = SidebarTabProps;
