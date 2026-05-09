import type { APIRoute } from 'astro';
import { firebase } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const remember_me = formData.get('remember_me') === 'on';

  try {
    const userCredential = await signInWithEmailAndPassword(firebase.auth, email, password);
    const token = await userCredential.user.getIdToken();

    cookies.set('firebase-token', token, {
      httpOnly: true,
      secure: false,
      path: '/',
      maxAge: remember_me ? 60 * 60 * 24 * 365 : 60 * 60 * 24,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};