import type { APIRoute } from 'astro';
import { db, User, eq } from 'astro:db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id, name, email, phone, address, role } = await request.json();

    if (!id || !name || !email) {
      return new Response(JSON.stringify({ message: 'Faltan campos requeridos' }), { status: 400 });
    }

    await db.update(User).set({
      name,
      email,
      phone: phone || '',
      address: address || '',
      role,
    }).where(eq(User.id, id));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return new Response(JSON.stringify({ message: 'Error al actualizar usuario' }), { status: 500 });
  }
};
