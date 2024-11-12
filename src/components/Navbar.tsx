'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { LoginDialog } from "./LoginDialog";

export default function Navbar() {
  return (
        <NavigationMenu className="
        w-full max-w-full flex justify-end border-b border-gray-200 px-4
        py-2 sticky top-0 z-50 bg-white dark:bg-zinc-950
        ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <LoginDialog className={navigationMenuTriggerStyle()}></LoginDialog>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
  )
}
