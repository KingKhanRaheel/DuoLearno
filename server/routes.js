import { createServer } from "http";
import { storage } from "./storage.js";
import { insertUserProgressSchema } from "../shared/schema.js";

export async function registerRoutes(app) {
  // Get current user (demo user for now)
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUserByUsername("demo");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to get courses" });
    }
  });

  // Get course by ID
  app.get("/api/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to get course" });
    }
  });

  // Get lessons for a course
  app.get("/api/courses/:id/lessons", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const lessons = await storage.getLessonsByCourse(courseId);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ error: "Failed to get lessons" });
    }
  });

  // Get lesson by ID
  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ error: "Failed to get lesson" });
    }
  });

  // Get user progress
  app.get("/api/user/progress", async (req, res) => {
    try {
      const user = await storage.getUserByUsername("demo");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const progress = await storage.getUserProgress(user.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user progress" });
    }
  });

  // Get course progress
  app.get("/api/user/progress/:courseId", async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const user = await storage.getUserByUsername("demo");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const progress = await storage.getCourseProgress(user.id, courseId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to get course progress" });
    }
  });

  // Complete a lesson
  app.post("/api/lessons/:id/complete", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const { xpEarned } = req.body;
      
      const user = await storage.getUserByUsername("demo");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      // Update or create progress
      const existingProgress = await storage.getCourseProgress(user.id, lesson.courseId);
      const lessonProgress = existingProgress.find(p => p.lessonId === lessonId);
      
      if (lessonProgress) {
        await storage.updateProgress(user.id, lessonId, true, xpEarned || 15);
      } else {
        await storage.createProgress({
          userId: user.id,
          courseId: lesson.courseId,
          lessonId: lessonId,
          completed: true,
          xpEarned: xpEarned || 15
        });
      }

      // Update user XP
      const newXP = user.xp + (xpEarned || 15);
      await storage.updateUserXP(user.id, newXP);

      res.json({ success: true, xpEarned: xpEarned || 15, totalXP: newXP });
    } catch (error) {
      res.status(500).json({ error: "Failed to complete lesson" });
    }
  });

  // Update user hearts
  app.patch("/api/user/hearts", async (req, res) => {
    try {
      const { hearts } = req.body;
      const user = await storage.getUserByUsername("demo");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const updatedUser = await storage.updateUserHearts(user.id, hearts);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update hearts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}