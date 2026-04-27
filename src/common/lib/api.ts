import createFetchClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';

// let refreshPromise: ReturnType<
//   typeof api.POST<
//     ApiPaths.AuthController_refresh,
//     MaybeOptionalInit<paths[ApiPaths.AuthController_refresh], 'post'>
//   >
// > | null = null;

// const middleware: Middleware = {
//   async onRequest({ request }) {
//   },
//   async onResponse({ request, response, options }) {
//   },
// };

export const api = createFetchClient({
  baseUrl: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
});
// api.use(middleware);

export const $api = createQueryClient(api);
