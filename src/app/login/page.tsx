import { auth } from '@/auth';
import LoginForm from '@/components/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';
 
export default async function LoginPage() {
  const session = await auth();

  if(session) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-black/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-black/60 text-center">
            Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <Link 
            href="/"
            className="
              inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium 
              transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
              bg-white text-black border border-black shadow hover:bg-black hover:text-white h-9 px-4 py-2 
              w-full mt-2
              "
          >
            Go Back
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}