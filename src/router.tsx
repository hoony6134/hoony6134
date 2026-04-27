import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';

import { detectLanguage, i18n } from '@/common/lib/i18n';

import { routeTree } from './routeTree.gen';

export function getRouter() {
  const queryClient = new QueryClient();
  i18n.changeLanguage(detectLanguage());

  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    context: {
      queryClient,
      i18n,
    },
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
