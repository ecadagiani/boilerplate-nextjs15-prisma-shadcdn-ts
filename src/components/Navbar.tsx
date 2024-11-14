'use client';

import { LoginDialog } from "@/components/LoginDialog";
import LogoutButton from "@/components/LogoutButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport
} from "@/components/ui/navigation-menu";
import { cn } from "@/utils/shadcn";
import { Home, Loader2, Pencil, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const UserNavigation = () => {
  const { data: session } = useSession();
  
  return (
    <ul className="grid w-[200px] gap-2 p-4">
      <div className="flex items-center gap-2 p-2 border-b border-zinc-200 dark:border-zinc-800">
        <User className="h-4 w-4" />
        <span className="text-sm">{session?.user?.name}</span>
      </div>
      <li>
        <NavigationMenuLink asChild>
          <Link
            className="
            w-full
            flex justify-start items-center gap-2 p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors
            "
            href="/dashboard"
          >
            <Pencil className="h-4 w-4" />
            My Posts
          </Link>
        </NavigationMenuLink>
      </li>
      <li>
        <NavigationMenuLink asChild>
          <LogoutButton />
        </NavigationMenuLink>
      </li>
    </ul>
  );
};

export default function Navbar() {
  const { data: sessionData, status } = useSession();
  
  return (
    <header className="
      sticky
      top-0 z-50 w-full px-6 py-4 
      bg-white/75 dark:bg-zinc-950/75
      border-b border-zinc-200 dark:border-zinc-800
      backdrop-blur supports-[backdrop-filter]:bg-background/60
      flex justify-between items-center
    ">
      <NavigationMenu >
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" className={cn(
              navigationMenuTriggerStyle(),
              "flex items-center gap-2"
            )}>
              <Home className="h-4 w-4" />
              Home
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu withViewport={false}>
        <NavigationMenuList>
          {status === 'loading' ? (
            <NavigationMenuItem>
              <Loader2 className="h-4 w-4 animate-spin" />
            </NavigationMenuItem>
          ) : status === 'authenticated' && sessionData.user ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{sessionData.user.name}</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <UserNavigation />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <LoginDialog className={navigationMenuTriggerStyle()} />
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
        <NavigationMenuViewport right />
      </NavigationMenu>
    </header>
  )
}
