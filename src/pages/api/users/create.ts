import type { APIRoute } from 'astro';
import { db, User } from 'astro:db';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, password, phone, address, role } = await request.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: 'Faltan campos requeridos' }), { status: 400 });
    }

    await db.insert(User).values({
      id: UUID(),
      name,
      email,
      password: bcrypt.hashSync(password),
      phone: phone || '',
      address: address || '',
      role: role || 'user',
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return new Response(JSON.stringify({ message: 'Error al crear usuario' }), { status: 500 });
  }
};
