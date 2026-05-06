import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const deleteUser = defineAction({
  accept: 'json',
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }, { url }) => {
    const base = `${url.protocol}//${url.host}`;
    const response = await fetch(`${base}/api/users/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw new Error('Error al eliminar usuario');
    return { success: true };
  },
});
