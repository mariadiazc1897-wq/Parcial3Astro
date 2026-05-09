import { defineAction } from 'astro:actions';

export const getUsers = defineAction({
  accept: 'json',
  handler: async (_, { url }) => {
    const base = `${url.protocol}//${url.host}`;
    const response = await fetch(`${base}/api/users/list`);
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
  },
});
