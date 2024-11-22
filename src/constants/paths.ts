export const Paths = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  POST: (slug?:string)=> `/post/${slug}`,
  EDIT: (slug?:string)=> `/dashboard/edit/${slug}`,
  PREVIEW: (slug?:string)=> `/dashboard/preview/${slug}`,
  NEW: '/dashboard/new',

  // Protected routes
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
};

export const ProtectedPaths = [
  `\\${Paths.DASHBOARD}(\/.*)?`,
  `\\${Paths.ADMIN}(\/.*)?`,
];