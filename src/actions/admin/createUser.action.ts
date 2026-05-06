import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const createUser = defineAction({
  accept: 'json',
  input: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.string(),
  }),
  handler: async ({ name, email, password, phone, address, role }, { url }) => {
    const base = `${url.protocol}//${url.host}`;
    const response = await fetch(`${base}/api/users/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone, address, role }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error((err as any).message ?? 'Error al crear usuario');
    }
    return { success: true };
  },
});
