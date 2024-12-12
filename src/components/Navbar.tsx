import LogoutButton from "@/components/auth/LogoutButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Paths } from "@/constants/paths";
import { cn } from "@/utils/shadcn";
import {
  Home, Pencil, PlusCircle, User,
} from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";

function UserNavigation() {
  return (
    <ul className="grid w-[200px] gap-2 p-4">
      <li>
        <NavigationMenuLink asChild>
          <Link
            className="
            w-full bg-transparent
            flex justify-start items-center gap-2 p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors
            "
            href={Paths.ACCOUNT}
          >
            <User className="h-4 w-4" />
            My Account
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
}

export interface NavbarProps {
  session: Session | null
}

export default function Navbar({ session }: NavbarProps) {
  const status = session ? "authenticated" : "unauthenticated";
  const sessionData = session;
  // const { data: sessionData, status } = useSession();
  return (
    <header className="
      sticky
      top-0 z-50 w-full px-6 py-4
      bg-white/75 dark:bg-zinc-950/75
      border-b border-zinc-200 dark:border-zinc-800
      backdrop-blur supports-[backdrop-filter]:bg-background/60
      flex justify-between items-center
    "
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href={Paths.HOME}
              className={cn(
                navigationMenuTriggerStyle(),
                "flex items-center gap-2 bg-transparent",
              )}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </NavigationMenuItem>
          {status === "authenticated" && (
            <>
              <NavigationMenuItem>
                <Link
                  href={Paths.DASHBOARD}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex items-center gap-2 bg-transparent",
                  )}
                >
                  <Pencil className="h-4 w-4" />
                  My Posts
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href={Paths.NEW}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex items-center gap-2 bg-transparent",
                  )}
                >
                  <PlusCircle className="h-4 w-4" />
                  New Post
                </Link>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu withViewport={false}>
        <NavigationMenuList>
          {status === "authenticated"
            ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{sessionData?.user.name}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <UserNavigation />
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
            : (
              <NavigationMenuItem>
                <Link href={Paths.LOGIN} className={navigationMenuTriggerStyle()}>
                  Login
                </Link>
              </NavigationMenuItem>
            )}
        </NavigationMenuList>
        <NavigationMenuViewport right />
      </NavigationMenu>
    </header>
  );
}
