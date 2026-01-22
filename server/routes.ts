import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get(api.tasks.list.path, async (req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.get(api.tasks.get.path, async (req, res) => {
    const task = await storage.getTask(Number(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  });

  app.post(api.tasks.create.path, async (req, res) => {
    try {
      const input = api.tasks.create.input.parse(req.body);
      const task = await storage.createTask(input);
      res.status(201).json(task);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", field: err.errors[0].path.join(".") });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.put(api.tasks.update.path, async (req, res) => {
    try {
      const input = api.tasks.update.input.parse(req.body);
      const task = await storage.updateTask(Number(req.params.id), input);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (err) {
       if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", field: err.errors[0].path.join(".") });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete(api.tasks.delete.path, async (req, res) => {
    await storage.deleteTask(Number(req.params.id));
    res.status(204).send();
  });

  // Seed data
  const existing = await storage.getTasks();
  if (existing.length === 0) {
    await storage.createTask({
      title: "Design System Review",
      description: "Review the glassmorphism components and color palette.",
      priority: "high",
      status: "in-progress",
      category: "Work",
      isNote: false,
      dueDate: new Date(Date.now() + 86400000) // Tomorrow
    });
    await storage.createTask({
      title: "Grocery Shopping",
      description: "Buy fruits, vegetables, and almond milk.",
      priority: "medium",
      status: "todo",
      category: "Personal",
      isNote: false,
      dueDate: new Date(Date.now() + 172800000) // Day after tomorrow
    });
    await storage.createTask({
      title: "Project Ideas",
      description: "1. AI Chatbot\n2. Finance Tracker\n3. Portfolio Site",
      priority: "low",
      status: "todo",
      category: "Ideas",
      isNote: true
    });
    await storage.createTask({
      title: "Gym Workout",
      description: "Leg day routine.",
      priority: "medium",
      status: "done",
      category: "Health",
      isNote: false,
      dueDate: new Date(Date.now() - 86400000) // Yesterday
    });
  }

  return httpServer;
}
