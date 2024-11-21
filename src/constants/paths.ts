export const Paths = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  POST: (slug?:string)=> `/post/${slug}`,

  // Protected routes
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
};

export const ProtectedPaths = [
  `\\${Paths.DASHBOARD}(\/.*)?`,
  `\\${Paths.ADMIN}(\/.*)?`,
];