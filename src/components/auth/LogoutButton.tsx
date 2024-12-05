"use client";

import { Button } from "@/components/ui/button";
import { Paths } from "@/constants/paths";
import { isProtectedRoute } from "@/utils/route";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = () => {
    setIsPending(true);
    const redirectTo = isProtectedRoute(pathname) ? Paths.HOME : pathname;
    signOut({
      redirectTo,
    });
    // do not set isPending to false, because the page will reload
  };

  return (
    <Button
      variant="ghost"
      className="
      w-full
      flex justify-start items-center gap-2 p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors
      "
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending
        ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )
        : (
          <LogOut className="h-4 w-4" />)}
      Logout
    </Button>
  );
}
