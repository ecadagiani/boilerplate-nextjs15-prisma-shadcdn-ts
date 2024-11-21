import AccessControl from "@/components/auth/AccessControl";
import { Role } from "@prisma/client";

export default async function AdminLayout({children}:{children: React.ReactNode}) {
  return (
    <AccessControl roles={Role.ADMIN}>
      {children}
    </AccessControl>
  );
}
