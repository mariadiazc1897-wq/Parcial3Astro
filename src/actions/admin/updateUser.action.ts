import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const updateUser = defineAction({
  accept: 'json',
  input: z.object({
    id: z.string(),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.string(),
  }),
  handler: async ({ id, name, email, phone, address, role }, { url }) => {
    const base = `${url.protocol}//${url.host}`;
    const response = await fetch(`${base}/api/users/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, email, phone, address, role }),
    });
    if (!response.ok) throw new Error('Error al actualizar usuario');
    return { success: true };
  },
});
