// Simple localStorage-based storage for Netlify deployment
export class LocalStorage {
  // Initialize with sample data if not exists
  constructor() {
    this.initializeData();
  }

  initializeData() {
    if (!localStorage.getItem('learningApp_initialized')) {
      // Sample courses
      const courses = [
        {
          id: 1,
          title: "Personal Finance 101",
          description: "Learn budgeting, saving, and smart spending habits for financial freedom.",
          icon: "💰",
          color: "from-green-400 to-green-600",
          totalLessons: 3
        },
        {
          id: 2,
          title: "Design Basics",
          description: "Master color theory, typography, and layout principles for great design.",
          icon: "🎨",
          color: "from-blue-400 to-blue-600",
          totalLessons: 2
        }
      ];

      // Sample lessons
      const lessons = [
        {
          id: 1,
          courseId: 1,
          title: "Understanding Your Money",
          content: "Learn the basics of personal finance and why budgeting matters.",
          orderIndex: 0,
          questions: [
            {
              question: "What is the first step in creating a budget?",
              options: ["Track your expenses", "Buy expensive things", "Ignore your spending", "Guess your income"],
              correct: 0
            },
            {
              question: "How much should you save each month?",
              options: ["Nothing", "At least 10-20% of income", "Everything", "Only when you feel like it"],
              correct: 1
            }
          ]
        },
        {
          id: 2,
          courseId: 1,
          title: "Creating Your First Budget",
          content: "Step-by-step guide to creating a realistic budget that works.",
          orderIndex: 1,
          questions: [
            {
              question: "What's the 50/30/20 budget rule?",
              options: ["50% needs, 30% wants, 20% savings", "50% wants, 30% needs, 20% fun", "Random numbers", "50% savings only"],
              correct: 0
            }
          ]
        },
        {
          id: 3,
          courseId: 1,
          title: "Smart Spending Habits",
          content: "Learn how to make smart purchasing decisions and avoid impulse buying.",
          orderIndex: 2,
          questions: [
            {
              question: "Before making a big purchase, you should:",
              options: ["Buy it immediately", "Wait 24 hours and think about it", "Ask everyone's opinion", "Flip a coin"],
              correct: 1
            }
          ]
        },
        {
          id: 4,
          courseId: 2,
          title: "Color Theory Fundamentals",
          content: "Understanding color relationships and how to use them effectively.",
          orderIndex: 0,
          questions: [
            {
              question: "What are complementary colors?",
              options: ["Colors that look nice", "Colors opposite on the color wheel", "Only red and blue", "Any bright colors"],
              correct: 1
            }
          ]
        },
        {
          id: 5,
          courseId: 2,
          title: "Typography Basics",
          content: "Learn to choose and combine fonts for better readability and design.",
          orderIndex: 1,
          questions: [
            {
              question: "What makes text easy to read?",
              options: ["Very small font", "Good contrast and appropriate size", "Fancy decorative fonts", "All caps"],
              correct: 1
            }
          ]
        }
      ];

      // Default user
      const user = {
        id: 1,
        username: "demo",
        xp: 0,
        streak: 0,
        hearts: 5,
        lastActive: new Date().toISOString()
      };

      localStorage.setItem('learningApp_courses', JSON.stringify(courses));
      localStorage.setItem('learningApp_lessons', JSON.stringify(lessons));
      localStorage.setItem('learningApp_user', JSON.stringify(user));
      localStorage.setItem('learningApp_progress', JSON.stringify([]));
      localStorage.setItem('learningApp_initialized', 'true');
    }
  }

  // User methods
  getUser() {
    return JSON.parse(localStorage.getItem('learningApp_user') || '{}');
  }

  updateUser(updates) {
    const user = this.getUser();
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('learningApp_user', JSON.stringify(updatedUser));
    return updatedUser;
  }

  // Course methods
  getAllCourses() {
    return JSON.parse(localStorage.getItem('learningApp_courses') || '[]');
  }

  getCourse(id) {
    const courses = this.getAllCourses();
    return courses.find(course => course.id === id);
  }

  // Lesson methods
  getLessonsByCourse(courseId) {
    const lessons = JSON.parse(localStorage.getItem('learningApp_lessons') || '[]');
    return lessons
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getLesson(id) {
    const lessons = JSON.parse(localStorage.getItem('learningApp_lessons') || '[]');
    return lessons.find(lesson => lesson.id === id);
  }

  // Progress methods
  getUserProgress() {
    return JSON.parse(localStorage.getItem('learningApp_progress') || '[]');
  }

  getCourseProgress(courseId) {
    const progress = this.getUserProgress();
    return progress.filter(p => {
      const lesson = this.getLesson(p.lessonId);
      return lesson && lesson.courseId === courseId;
    });
  }

  updateProgress(lessonId, completed, xpEarned) {
    const progress = this.getUserProgress();
    const existingIndex = progress.findIndex(p => p.lessonId === lessonId);
    
    const progressEntry = {
      id: existingIndex >= 0 ? progress[existingIndex].id : Date.now(),
      userId: 1,
      lessonId,
      completed,
      xpEarned,
      completedAt: completed ? new Date().toISOString() : null
    };

    if (existingIndex >= 0) {
      progress[existingIndex] = progressEntry;
    } else {
      progress.push(progressEntry);
    }

    localStorage.setItem('learningApp_progress', JSON.stringify(progress));

    // Update user XP if lesson completed
    if (completed && xpEarned > 0) {
      const user = this.getUser();
      this.updateUser({ 
        xp: user.xp + xpEarned,
        lastActive: new Date().toISOString()
      });
    }

    return progressEntry;
  }
}

export const storage = new LocalStorage();