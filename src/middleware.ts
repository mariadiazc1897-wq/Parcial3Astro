import { defineMiddleware } from 'astro:middleware';

const privateRoutes = ['/dashboard', '/admin', '/protected'];
const notAuthenticatedRoutes = ['/login', '/register'];

function parseJWT(token: string) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const onRequest = defineMiddleware(
  async ({ url, cookies, locals, redirect }, next) => {
    const token = cookies.get('firebase-token')?.value;

    if (token) {
      const payload = parseJWT(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        const uid = payload.user_id ?? payload.sub;
        locals.isLoggedIn = true;
        locals.user = {
          localId: uid,
          uid: uid,
          email: payload.email ?? '',
          name: payload.name ?? payload.email ?? 'Usuario',
          avatar: payload.picture ?? '',
          emailVerified: payload.email_verified ?? false,
          role: 'user' as 'user' | 'admin',
        };
      } else {
        cookies.delete('firebase-token', { path: '/' });
        locals.isLoggedIn = false;
        locals.user = null;
      }
    } else {
      locals.isLoggedIn = false;
      locals.user = null;
    }

    if (!locals.isLoggedIn && privateRoutes.includes(url.pathname)) {
      return redirect('/login');
    }

    if (locals.isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/protected');
    }

    return next();
  }
);
