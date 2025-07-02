import { 
  users, courses, lessons, userProgress
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export class DatabaseStorage {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserXP(userId: number, xp: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ xp })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async updateUserStreak(userId: number, streak: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ streak })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async updateUserHearts(userId: number, hearts: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ hearts })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db
      .insert(courses)
      .values(course)
      .returning();
    return newCourse;
  }

  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.courseId, courseId))
      .orderBy(lessons.orderIndex);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson || undefined;
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [newLesson] = await db
      .insert(lessons)
      .values(lesson)
      .returning();
    return newLesson;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
  }

  async getCourseProgress(userId: number, courseId: number): Promise<UserProgress[]> {
    return await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.courseId, courseId)));
  }

  async createProgress(progress: InsertUserProgress): Promise<UserProgress> {
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

  async updateProgress(userId: number, lessonId: number, completed: boolean, xpEarned: number): Promise<UserProgress | undefined> {
    const [progress] = await db
      .update(userProgress)
      .set({ completed, xpEarned })
      .where(and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId)))
      .returning();
    return progress || undefined;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private lessons: Map<number, Lesson>;
  private userProgress: Map<string, UserProgress>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentLessonId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.lessons = new Map();
    this.userProgress = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentLessonId = 1;
    this.currentProgressId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample courses
    const financeQuestions = [
      {
        question: "What is the main purpose of a budget?",
        options: ["To restrict spending", "To track income and expenses", "To invest money"],
        correct: 1
      }
    ];

    const designQuestions = [
      {
        question: "What is the main purpose of visual hierarchy?",
        options: ["To make things pretty", "To guide the viewer's eye", "To use more colors"],
        correct: 1
      }
    ];

    // Personal Finance Course
    const financeCourse: Course = {
      id: this.currentCourseId++,
      title: "Personal Finance 101",
      description: "Learn budgeting, saving, and smart money management in bite-sized lessons.",
      icon: "fas fa-piggy-bank",
      color: "duolingo-green",
      totalLessons: 3
    };
    this.courses.set(financeCourse.id, financeCourse);

    // Design Course
    const designCourse: Course = {
      id: this.currentCourseId++,
      title: "Design Basics",
      description: "Master fundamental design principles, color theory, and visual hierarchy.",
      icon: "fas fa-palette",
      color: "duolingo-blue",
      totalLessons: 1
    };
    this.courses.set(designCourse.id, designCourse);

    // Finance lessons
    const financeLesson1: Lesson = {
      id: this.currentLessonId++,
      courseId: financeCourse.id,
      title: "What is a Budget?",
      content: "A budget is a plan for how you'll spend your money. It helps you track your income and expenses so you can make smart financial decisions and reach your goals.",
      orderIndex: 0,
      questions: [financeQuestions[0]]
    };
    this.lessons.set(financeLesson1.id, financeLesson1);

    const financeLesson2: Lesson = {
      id: this.currentLessonId++,
      courseId: financeCourse.id,
      title: "Income vs. Expenses",
      content: "Income is money you earn from work, investments, or other sources. Expenses are money you spend on things like rent, food, and entertainment. The goal is to have more income than expenses.",
      orderIndex: 1,
      questions: [{
        question: "Which should be higher for good financial health?",
        options: ["Expenses", "Income", "They should be equal"],
        correct: 1
      }]
    };
    this.lessons.set(financeLesson2.id, financeLesson2);

    const financeLesson3: Lesson = {
      id: this.currentLessonId++,
      courseId: financeCourse.id,
      title: "What is the 50-30-20 Rule?",
      content: "The 50-30-20 rule is a simple budgeting method that divides your after-tax income into three categories: 50% for needs (rent, groceries, utilities), 30% for wants (dining out, entertainment), and 20% for savings and debt repayment.",
      orderIndex: 2,
      questions: [{
        question: "According to the 50-30-20 rule, what percentage should go to savings?",
        options: ["30%", "20%", "50%"],
        correct: 1
      }]
    };
    this.lessons.set(financeLesson3.id, financeLesson3);

    // Design lesson
    const designLesson1: Lesson = {
      id: this.currentLessonId++,
      courseId: designCourse.id,
      title: "What is Visual Hierarchy?",
      content: "Visual hierarchy is the arrangement of elements to show their order of importance. It guides the viewer's eye through your design using size, color, contrast, and spacing.",
      orderIndex: 0,
      questions: [designQuestions[0]]
    };
    this.lessons.set(designLesson1.id, designLesson1);

    // Create default user (fresh start for new users)
    const defaultUser: User = {
      id: this.currentUserId++,
      username: "demo",
      password: "demo",
      xp: 0,
      streak: 0,
      hearts: 5,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    this.users.set(defaultUser.id, defaultUser);

    // No pre-completed lessons for new users - they start fresh!
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      xp: 0, 
      streak: 0, 
      hearts: 5,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserXP(userId: number, xp: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.xp = xp;
      this.users.set(userId, user);
      return user;
    }
    return undefined;
  }

  async updateUserStreak(userId: number, streak: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.streak = streak;
      this.users.set(userId, user);
      return user;
    }
    return undefined;
  }

  async updateUserHearts(userId: number, hearts: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.hearts = hearts;
      this.users.set(userId, user);
      return user;
    }
    return undefined;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const newCourse: Course = { ...course, id };
    this.courses.set(id, newCourse);
    return newCourse;
  }

  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const id = this.currentLessonId++;
    const newLesson: Lesson = { ...lesson, id };
    this.lessons.set(id, newLesson);
    return newLesson;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId);
  }

  async getCourseProgress(userId: number, courseId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId && progress.courseId === courseId);
  }

  async createProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const newProgress: UserProgress = { 
      id,
      userId: progress.userId,
      courseId: progress.courseId,
      lessonId: progress.lessonId,
      completed: progress.completed ?? false,
      xpEarned: progress.xpEarned ?? 0
    };
    this.userProgress.set(`${progress.userId}-${progress.lessonId}`, newProgress);
    return newProgress;
  }

  async updateProgress(userId: number, lessonId: number, completed: boolean, xpEarned: number): Promise<UserProgress | undefined> {
    const key = `${userId}-${lessonId}`;
    const progress = this.userProgress.get(key);
    if (progress) {
      progress.completed = completed;
      progress.xpEarned = xpEarned;
      this.userProgress.set(key, progress);
      return progress;
    }
    return undefined;
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
