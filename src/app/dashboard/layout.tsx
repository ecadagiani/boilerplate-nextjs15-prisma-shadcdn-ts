import AccessControl from "@/components/auth/AccessControl";
import { Role } from "@prisma/client";
export default async function DashboardLayout({children}:{children: React.ReactNode}) {
  return (
    <AccessControl roles={[Role.ADMIN, Role.USER]}>
      {children}
    </AccessControl>
  );
}
