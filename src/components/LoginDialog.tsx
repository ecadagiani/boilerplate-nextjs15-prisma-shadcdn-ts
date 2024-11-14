"use client"

import { isProtectedRoute } from "@/auth"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
    if(isProtectedRoute(pathname) && session.status !== 'authenticated') {
      setOpen(true);
    }
  }, [session, pathname]);

  const handleOpenChange = (open: boolean) => {
    if(isProtectedRoute(pathname) && !open) {
      router.push('/');
    }
    setOpen(open);
  }

  const handleSuccess = () => {
    setOpen(false);
    if(isProtectedRoute(pathname)) {
      // if we are on a protected route, the page display an unauthenticated message, and LoginDialog is open.
      // when login is successful, we refresh the page, to refresh dashboard or admin layout (server component) to display the authenticated page.
      router.refresh();
    }
  }



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
        <LoginForm onSuccess={handleSuccess}  />
      
        <Link // todo use button if pathname is not protected
          onClick={() => setOpen(false)}
          href={isProtectedRoute(pathname) ? "/" : pathname} 
          className="w-full text-center py-2 border border-black hover:bg-black hover:text-white transition-colors duration-200 rounded-md text-sm font-medium"
        >
        Go Back
        </Link>
      </DialogContent>
    </Dialog>
  )
}
