import type { APIRoute } from 'astro';
import { db, User, eq } from 'astro:db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID requerido' }), { status: 400 });
    }

    await db.delete(User).where(eq(User.id, id));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return new Response(JSON.stringify({ message: 'Error al eliminar usuario' }), { status: 500 });
  }
};
