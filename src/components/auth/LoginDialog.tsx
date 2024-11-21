"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Paths } from "@/constants/paths"
import { isRoute } from "@/utils/route"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoginForm from "./LoginForm"

export function LoginDialog({className}: {className: string}) {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if(isRoute(pathname, Paths.DASHBOARD) && session.status !== 'authenticated') {
      setOpen(true);
    }
  }, [session, pathname]);

  const handleOpenChange = (open: boolean) => {
    if(isRoute(pathname, Paths.DASHBOARD) && !open) {
      router.push('/');
    }
    setOpen(open);
  }

  // we do not need to close LoginDialog when login is successful,
  // because the LoginDialog is unmounted by the navbar when login is successful

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className={className}>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-center">
            Please enter your credentials to continue.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      
        <Link // todo use button if pathname is not protected
          onClick={() => setOpen(false)}
          href={isRoute(pathname, Paths.DASHBOARD) || isRoute(pathname, Paths.ADMIN) ? Paths.HOME : pathname} 
          className="w-full text-center py-2 border border-black hover:bg-black hover:text-white transition-colors duration-200 rounded-md text-sm font-medium"
        >
        Go Back
        </Link>
      </DialogContent>
    </Dialog>
  )
}
