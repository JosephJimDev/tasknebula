import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  priority: text("priority").notNull().default("medium"), // low, medium, high
  status: text("status").notNull().default("todo"), // todo, in-progress, done
  category: text("category").notNull().default("personal"),
  dueDate: timestamp("due_date"),
  isNote: boolean("is_note").default(false), // Distinct between task and note
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

// API Types
export type CreateTaskRequest = InsertTask;
export type UpdateTaskRequest = Partial<InsertTask>;
export type TaskResponse = Task;
