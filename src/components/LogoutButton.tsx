'use client';

import { logout } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <Button 
      variant="ghost"
      className="
      w-full
      flex justify-start items-center gap-2 p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors
      "
      onClick={() => logout(router, pathname)}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  )
}
