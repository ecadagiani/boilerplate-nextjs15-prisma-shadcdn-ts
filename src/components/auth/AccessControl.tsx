import { auth } from "@/auth";
import { Paths } from "@/constants/paths";
import { Role } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * AccessControl - A component for handling role-based access control in Next.js applications
 *
 * @remarks
 * While this component can be used to protect specific views or components, it's recommended
 * to implement access control at the middleware level when possible for better performance
 * and security.
 *
 * @example
 * ```tsx
 * // Basic usage - only allows authenticated users
 * <AccessControl>
 *   <ProtectedComponent />
 * </AccessControl>
 *
 * // Restrict to specific roles
 * <AccessControl roles={[Role.ADMIN, Role.MODERATOR]}>
 *   <AdminPanel />
 * </AccessControl>
 *
 * // Custom component fallback for unauthorized access
 * <AccessControl roles={Role.ADMIN} fallback={<UnauthorizedMessage />}>
 *   <AdminPanel />
 * </AccessControl>
 *
 * // Custom redirect for unauthorized access
 * <AccessControl
 *   roles={Role.ADMIN}
 *   redirectTo="/login"
 *   redirectToForbidden="/forbidden"
 *   withCallbackUrl={true}
 *   withCallbackUrlForbidden={true}
 * >
 *   <AdminPanel />
 * </AccessControl>
 * ```
 */
export interface AccessControlProps {
  children: React.ReactNode
  roles?: Role[] | Role | null
  fallback?: React.ReactNode | null
  redirectTo?: string
  redirectToForbidden?: string | null
  withCallbackUrl?: boolean
  withCallbackUrlForbidden?: boolean
}

export default async function AccessControl({
  children,
  roles = null,
  fallback = null,
  redirectTo = Paths.LOGIN,
  redirectToForbidden = Paths.HOME,
  withCallbackUrl = true,
  withCallbackUrlForbidden = false,
}: AccessControlProps): Promise<Awaited<JSX.Element>> {
  const session = await auth();
  const headerList = await headers();
  const currentPath = headerList.get("x-current-path");

  if (!session) {
    return fallback as JSX.Element || redirect(redirectTo + (withCallbackUrl ? `?callbackUrl=${currentPath}` : ""));
  }

  if (roles) {
    const roleList = Array.isArray(roles) ? roles : [roles];
    if (!roleList.includes(session.user.role)) {
      const redirectUrl = (redirectToForbidden || redirectTo) + (withCallbackUrlForbidden ? `?callbackUrl=${currentPath}` : "");
      return fallback as JSX.Element || redirect(redirectUrl);
    }
  }

  return children as JSX.Element;
}
