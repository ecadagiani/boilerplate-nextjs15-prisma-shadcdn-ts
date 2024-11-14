import { auth } from '@/auth';
import { Skeleton } from '@/components/ui/skeleton';

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  const session = await auth();
  if(!session) {
    // if not logged in, display blurred skeleton (and LoginDialog is displayed on top of it)
    return (
      <div className="relative min-h-screen w-full">
        <div className="p-6 grid gap-6">
          {/* Top bar */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
            
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main stats cards */}
            <Skeleton className="h-32 col-span-1" />
            <Skeleton className="h-32 col-span-1" />
            <Skeleton className="h-32 col-span-1" />
              
            {/* Chart area */}
            <Skeleton className="h-64 col-span-1 md:col-span-2" />
              
            {/* Sidebar content */}
            <Skeleton className="h-64 col-span-1" />
              
            {/* Bottom table */}
            <Skeleton className="h-48 col-span-1 md:col-span-3" />
          </div>
        </div>
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
      </div>
    )
  }
  return children;
}
