/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />

interface User {
  localId: string;
  uid: string;
  email: string;
  name: string;
  avatar: string;
  emailVerified: boolean;
  role: 'user' | 'admin';
}

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    user: User | null;
  }
}
