import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ message: 'Token requerido' }), { status: 400 });
    }

    // Guardar el token en cookie para que el middleware lo detecte
    cookies.set('firebase-token', token, {
      httpOnly: true,
      secure: false,
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error al autenticar con Google' }), { status: 500 });
  }
};
