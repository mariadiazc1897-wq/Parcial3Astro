// src/actions/auth/login.action.ts
import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';

export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebase.auth, email, password);

      const token = await userCredential.user.getIdToken();

      cookies.set('firebase-token', token, {
        httpOnly: true,
        secure: false,
        path: '/',
        expires: remember_me
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
          : new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      if (remember_me) {
        cookies.set('email', email, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
          path: '/',
        });
      }

      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
        }
      };

    } catch (error) {
      // ✅ Fix: el catch ahora maneja los errores correctamente
      const firebaseError = error as AuthError;
      console.log('Login error:', firebaseError.code);

      if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/invalid-credential') {
        throw new Error('Correo o contraseña incorrectos');
      }
      if (firebaseError.code === 'auth/wrong-password') {
        throw new Error('Contraseña incorrecta');
      }
      if (firebaseError.code === 'auth/too-many-requests') {
        throw new Error('Demasiados intentos. Intenta más tarde');
      }

      throw new Error('Error al ingresar. Verifica tus credenciales');
    }
  },
});
