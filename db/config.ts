
import { column, defineDb, defineTable } from 'astro:db';

export const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    phone: column.text({ optional: true }),      // ✅ agrega
    address: column.text({ optional: true }),    // ✅ agrega
    createdAt: column.date({ default: new Date() }),
    role: column.text({ references: () => Role.columns.id }),
  },
});

export const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
  },
});

export default defineDb({
  tables: { User, Role },
});