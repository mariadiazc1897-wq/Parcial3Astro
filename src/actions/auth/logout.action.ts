import { defineAction } from 'astro:actions';

export const logout = defineAction({
  accept: 'json',
  handler: async (_, { cookies }) => {
    // Eliminar la cookie de sesión — esto es lo que realmente cierra la sesión
    cookies.delete('firebase-token', { path: '/' });
    return { success: true };
  },
});
