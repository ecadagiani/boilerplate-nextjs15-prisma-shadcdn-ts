import { auth } from "@/auth";
import { Paths } from "@/constants/paths";
import { Role } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Move this logic to middleware when nextAuth V5 is released

export type AccessControlProps = {
  children: React.ReactNode;
  roles?: Role[] | Role;
  redirectTo?: string;
  redirectToForbidden?: string | null;
  withCallbackUrl?: boolean;
}

export default async function AccessControl ({
  children,
  roles=Role.USER,
  redirectTo=Paths.LOGIN,
  redirectToForbidden=Paths.HOME,
  withCallbackUrl=true,
}: AccessControlProps): Promise<Awaited<JSX.Element>> {
  const session = await auth();
  const headerList = await headers();
  const currentPath = headerList.get("x-current-path");

  if(!session){
    return redirect(redirectTo + (withCallbackUrl ? `?callbackUrl=${currentPath}` : ""));
  }
  
  const roleList = Array.isArray(roles) ? roles : [roles];
  if(!roleList.includes(session.user.role)){
    return redirect(redirectToForbidden || redirectTo);
  }

  return children as JSX.Element;
}
