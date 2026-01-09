import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            Next.js 15 Boilerplate
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            A modern, production-ready starter template with Next.js 15, Prisma,
            and shadcn/ui
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Next.js 15 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Prisma ORM with PostgreSQL</li>
              <li>NextAuth.js for authentication</li>
              <li>shadcn/ui components</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Home;
