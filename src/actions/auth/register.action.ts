import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from 'firebase/auth';
import { firebase } from '@/firebase/config';
import { db, User } from 'astro:db';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    address: z.string().optional().default(''),
    phone: z.string().optional().default(''),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, address, phone, email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set('name', name, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), path: '/' });
      cookies.set('email', email, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), path: '/' });
    } else {
      cookies.delete('email', { path: '/' });
      cookies.delete('name', { path: '/' });
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(firebase.auth, email, password);

      await updateProfile(userCredential.user, { displayName: name });

      await sendEmailVerification(userCredential.user, {
        url: 'http://localhost:4321/protected?emailVerified=true',
      });

      // ✅ Fix: el punto y coma estaba mal puesto, ahora inserta correctamente
      await db.insert(User).values({
        id: userCredential.user.uid,
        name: name,
        address: address || '',
        phone: phone || '',
        email: email,
        password: '---',       // Firebase maneja la contraseña
        createdAt: new Date(),
        role: 'user',
      });

      // ✅ Guardar token en cookie para que el middleware lo detecte
      const token = await userCredential.user.getIdToken();
      cookies.set('firebase-token', token, {
        httpOnly: true,
        secure: false,
        path: '/',
        expires: remember_me
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
          : new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      return {
        success: true,
        message: `Bienvenido ${name}, tu cuenta ha sido creada exitosamente.`,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
        }
      };

    } catch (error) {
      const firebaseError = error as AuthError;
      console.log(firebaseError);

      if (firebaseError.code === 'auth/email-already-in-use') {
        throw new Error('El correo ya está en uso');
      }
      if (firebaseError.code === 'auth/weak-password') {
        throw new Error('La contraseña es muy débil. Usa al menos 6 caracteres');
      }

      throw new Error('Ocurrió un error al crear tu cuenta. Intenta nuevamente');
    }
  },
});
