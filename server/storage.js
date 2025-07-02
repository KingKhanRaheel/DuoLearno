import { 
  users, courses, lessons, userProgress,
  insertUserSchema, insertCourseSchema, insertLessonSchema, insertUserProgressSchema
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq, and } from "drizzle-orm";

export class DatabaseStorage {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser) {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserXP(userId, xp) {
    const [user] = await db
      .update(users)
      .set({ xp })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async updateUserStreak(userId, streak) {
    const [user] = await db
      .update(users)
      .set({ streak })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async updateUserHearts(userId, hearts) {
    const [user] = await db
      .update(users)
      .set({ hearts })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async getAllCourses() {
    return await db.select().from(courses);
  }

  async getCourse(id) {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async createCourse(course) {
    const [newCourse] = await db
      .insert(courses)
      .values(course)
      .returning();
    return newCourse;
  }

  async getLessonsByCourse(courseId) {
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.courseId, courseId))
      .orderBy(lessons.orderIndex);
  }

  async getLesson(id) {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson || undefined;
  }

  async createLesson(lesson) {
    const [newLesson] = await db
      .insert(lessons)
      .values(lesson)
      .returning();
    return newLesson;
  }

  async getUserProgress(userId) {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
  }

  async getCourseProgress(userId, courseId) {
    return await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.courseId, courseId)));
  }

  async createProgress(progress) {
    const [newProgress] = await db
      .insert(userProgress)
      .values({
        userId: progress.userId,
        courseId: progress.courseId,
        lessonId: progress.lessonId,
        completed: progress.completed ?? false,
        xpEarned: progress.xpEarned ?? 0
      })
      .returning();
    return newProgress;
  }

  async updateProgress(userId, lessonId, completed, xpEarned) {
    const [progress] = await db
      .update(userProgress)
      .set({ completed, xpEarned })
      .where(and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId)))
      .returning();
    return progress || undefined;
  }
}

// Initialize database with sample data
async function initializeDatabase() {
  // Check if we already have data
  const existingUsers = await db.select().from(users).limit(1);
  if (existingUsers.length > 0) {
    return; // Database already initialized
  }

  // Create demo user
  const [demoUser] = await db
    .insert(users)
    .values({
      username: "demo",
      password: "demo",
      xp: 0,
      streak: 0,
      hearts: 5,
      lastActiveDate: new Date().toISOString().split('T')[0]
    })
    .returning();

  // Create courses
  const [financeCourse] = await db
    .insert(courses)
    .values({
      title: "Personal Finance 101",
      description: "Learn budgeting, saving, and smart money management in bite-sized lessons.",
      icon: "fas fa-piggy-bank",
      color: "duolingo-green",
      totalLessons: 3
    })
    .returning();

  const [designCourse] = await db
    .insert(courses)
    .values({
      title: "Design Basics",
      description: "Master fundamental design principles, color theory, and visual hierarchy.",
      icon: "fas fa-palette",
      color: "duolingo-blue",
      totalLessons: 1
    })
    .returning();

  // Create lessons
  await db.insert(lessons).values([
    {
      courseId: financeCourse.id,
      title: "What is a Budget?",
      content: "A budget is a plan for how you'll spend your money. It helps you track your income and expenses so you can make smart financial decisions and reach your goals.",
      orderIndex: 0,
      questions: [{
        question: "What is the main purpose of a budget?",
        options: ["To restrict spending", "To track income and expenses", "To invest money"],
        correct: 1
      }]
    },
    {
      courseId: financeCourse.id,
      title: "Income vs. Expenses",
      content: "Income is money you earn from work, investments, or other sources. Expenses are money you spend on things like rent, food, and entertainment. The goal is to have more income than expenses.",
      orderIndex: 1,
      questions: [{
        question: "Which should be higher for good financial health?",
        options: ["Expenses", "Income", "They should be equal"],
        correct: 1
      }]
    },
    {
      courseId: financeCourse.id,
      title: "What is the 50-30-20 Rule?",
      content: "The 50-30-20 rule is a simple budgeting method that divides your after-tax income into three categories: 50% for needs (rent, groceries, utilities), 30% for wants (dining out, entertainment), and 20% for savings and debt repayment.",
      orderIndex: 2,
      questions: [{
        question: "According to the 50-30-20 rule, what percentage should go to savings?",
        options: ["30%", "20%", "50%"],
        correct: 1
      }]
    },
    {
      courseId: designCourse.id,
      title: "What is Visual Hierarchy?",
      content: "Visual hierarchy is the arrangement of elements to show their order of importance. It guides the viewer's eye through your design using size, color, contrast, and spacing.",
      orderIndex: 0,
      questions: [{
        question: "What is the main purpose of visual hierarchy?",
        options: ["To make things pretty", "To guide the viewer's eye", "To use more colors"],
        correct: 1
      }]
    }
  ]);

  console.log("Database initialized with sample data");
}

// Initialize database on startup
const databaseStorage = new DatabaseStorage();
initializeDatabase().catch(console.error);

export const storage = databaseStorage;