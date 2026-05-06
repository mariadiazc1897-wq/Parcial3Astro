import { Role, User, db } from 'astro:db';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';

export default async function seed() {
  const roles = [
    { id: 'admin', name: 'Administrador' },
    { id: 'user', name: 'Usuario de sistema' },
    { id: 'sub user', name: 'Usuario subordinado' },
  ];

  const users = [
    {
      id: UUID(),
      name: 'Marisol',
      address: 'Calle 123',
      phone: '123456789',
      email: 'tinosm2721@gmail.com',
      password: bcrypt.hashSync('123456'),
      role: 'admin',
      createdAt: new Date(),
    },
    {
      id: UUID(),
      name: 'Sandra Tino',
      address: 'Calle 456',
      phone: '987654321',
      email: 'brisshernandez797@gmail.com',
      password: bcrypt.hashSync('123456'),
      role: 'user',
      createdAt: new Date(),
    },
    {
      id: UUID(),
      name: 'Matteo',
      address: 'Calle 789',
      phone: '555555555',
      email: 'vanegastinoa@gmail.com',
      password: bcrypt.hashSync('123456'),
      role: 'sub user',
      createdAt: new Date(),
    },
    {
      id: 'PEyni2bVraTEGfboz4eJbW2ylm13',
      name: 'Admin',
      address: 'Calle Admin 1',
      phone: '000000000',
      email: 'admin@astro.com',
      password: bcrypt.hashSync('123456'),
      role: 'admin',
      createdAt: new Date(),
    },
  ];

  await db.insert(Role).values(roles);
  await db.insert(User).values(users);
}