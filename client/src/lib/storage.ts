// Simple localStorage-based storage for Netlify deployment
export class LocalStorage {
  // Initialize with sample data if not exists
  constructor() {
    this.initializeData();
    this.checkAndUpdateStreak();
  }

  private checkAndUpdateStreak() {
    const user = this.getUser();
    if (!user.lastActivityDate) return;

    const now = new Date();
    const lastActivity = new Date(user.lastActivityDate);
    const timeDiff = now.getTime() - lastActivity.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    // If more than 24 hours have passed, reset streak
    if (daysDiff > 1) {
      this.updateUser({ streak: 0 });
    }
  }

  initializeData() {
    if (!localStorage.getItem('learningApp_initialized')) {
      // Sample courses
      const courses = [
        {
          id: 1,
          title: "Personal Finance 101",
          description: "Master your money, one lesson at a time. Learn the fundamentals of personal finance through interactive lessons.",
          icon: "💰",
          color: "from-green-400 to-green-600",
          totalLessons: 21
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

      // Personal Finance 101 - Complete Curriculum
      const lessons = [
        // Chapter 1: Understanding Money
        {
          id: 1,
          courseId: 1,
          title: "What is Personal Finance?",
          content: "You've earned your first paycheck. Now what? Personal finance is how you manage your money—earning, spending, saving, investing, and protecting it. It's about making smart choices so you can afford the life you want.",
          orderIndex: 0,
          questions: [
            {
              question: "What does personal finance include?",
              options: ["Only saving money", "Earning, spending, saving, investing, and protecting money", "Just paying bills", "Only investing"],
              correct: 1
            }
          ]
        },
        {
          id: 2,
          courseId: 1,
          title: "Needs vs. Wants",
          content: "Imagine you're building a survival kit. Is Netflix in it? Needs are essentials: food, shelter, electricity. Wants are nice-to-haves: gaming subscriptions, fancy coffees.",
          orderIndex: 1,
          questions: [
            {
              question: "Which of these is a NEED?",
              options: ["Designer clothes", "Groceries", "Concert tickets", "Gaming subscription"],
              correct: 1
            },
            {
              question: "Which of these is a WANT?",
              options: ["Rent", "Electricity", "Designer clothes", "Basic groceries"],
              correct: 2
            }
          ]
        },
        {
          id: 3,
          courseId: 1,
          title: "Power of Saving Early",
          content: "Would you rather have ₹100 today or ₹1 crore after 40 years? Thanks to compound interest, small savings grow over time. The earlier you start, the bigger the reward.",
          orderIndex: 2,
          questions: [
            {
              question: "What makes your money grow faster over time?",
              options: ["Keeping it in your wallet", "Compound interest", "Spending it quickly", "Hiding it under your mattress"],
              correct: 1
            }
          ]
        },
        {
          id: 4,
          courseId: 1,
          title: "Mindsets Around Money",
          content: "Two people earn ₹50K. One is broke, one is saving. Why? A scarcity mindset says 'I never have enough.' An abundance mindset says 'I can make this work.'",
          orderIndex: 3,
          questions: [
            {
              question: "Which reflects an abundance mindset?",
              options: ["I never have enough money", "I can make this work", "Money is evil", "I'll always be poor"],
              correct: 1
            }
          ]
        },
        // Chapter 2: Budgeting Like a Boss
        {
          id: 5,
          courseId: 1,
          title: "The 50-30-20 Rule",
          content: "How do you split ₹10,000 without going broke? The 50-30-20 rule: 50% for essentials (rent, food), 30% for wants (entertainment, dining out), 20% for savings and debt repayment.",
          orderIndex: 4,
          questions: [
            {
              question: "In the 50-30-20 rule, what percentage goes to savings?",
              options: ["50%", "30%", "20%", "10%"],
              correct: 2
            },
            {
              question: "What does the 50% cover in the 50-30-20 rule?",
              options: ["Wants and entertainment", "Essentials like rent and food", "Only savings", "Luxury items"],
              correct: 1
            }
          ]
        },
        {
          id: 6,
          courseId: 1,
          title: "Tracking Expenses",
          content: "Ever checked your bank balance and thought, 'Where did it all go?' Expense tracking helps you see patterns. Apps, journals, or spreadsheets all work.",
          orderIndex: 5,
          questions: [
            {
              question: "What is the main benefit of tracking expenses?",
              options: ["It's fun to do", "Helps you see spending patterns", "Makes you feel guilty", "Wastes your time"],
              correct: 1
            },
            {
              question: "Which tool can be used for expense tracking?",
              options: ["Only expensive software", "Apps, journals, or spreadsheets", "Only bank statements", "Just your memory"],
              correct: 1
            }
          ]
        },
        {
          id: 7,
          courseId: 1,
          title: "Build a Budget",
          content: "You have ₹10,000/month. Make it count. Budgeting is planning your money before you spend it. It's about being intentional with every rupee.",
          orderIndex: 6,
          questions: [
            {
              question: "What is budgeting?",
              options: ["Spending money randomly", "Planning your money before you spend it", "Only for rich people", "Restricting all fun"],
              correct: 1
            }
          ]
        },
        {
          id: 8,
          courseId: 1,
          title: "Fixed vs. Variable Costs",
          content: "Which costs change? Which don't? Fixed costs stay the same each month (rent, subscriptions). Variable costs change (groceries, entertainment, shopping).",
          orderIndex: 7,
          questions: [
            {
              question: "Which is an example of a FIXED cost?",
              options: ["Groceries", "Movie tickets", "Rent", "Restaurant bills"],
              correct: 2
            },
            {
              question: "Which is an example of a VARIABLE cost?",
              options: ["Monthly rent", "Internet subscription", "Shopping expenses", "Insurance premium"],
              correct: 2
            }
          ]
        },
        // Chapter 3: Smart Saving Habits
        {
          id: 9,
          courseId: 1,
          title: "Emergency Funds",
          content: "Your phone breaks. You need ₹5,000. Do you swipe or panic? Emergency funds = 3–6 months of expenses, untouched unless it's urgent.",
          orderIndex: 8,
          questions: [
            {
              question: "How much should you keep in an emergency fund?",
              options: ["1 week of expenses", "3-6 months of expenses", "1 year of salary", "₹100 only"],
              correct: 1
            },
            {
              question: "When should you use your emergency fund?",
              options: ["For vacation", "For shopping sales", "For actual emergencies only", "Whenever you want"],
              correct: 2
            }
          ]
        },
        {
          id: 10,
          courseId: 1,
          title: "Setting Short-Term Goals",
          content: "You want a new laptop in 3 months. Plan it. Goals give saving a purpose. Break them into monthly targets to make them achievable.",
          orderIndex: 9,
          questions: [
            {
              question: "Why are short-term goals important for saving?",
              options: ["They're not important", "They give saving a purpose", "They're too hard", "Only for rich people"],
              correct: 1
            }
          ]
        },
        {
          id: 11,
          courseId: 1,
          title: "Automating Your Savings",
          content: "If you can't see it, you won't spend it. Auto-debits move money into savings before you even touch it. It's like paying your future self first.",
          orderIndex: 10,
          questions: [
            {
              question: "What is the main benefit of automating savings?",
              options: ["It's complicated", "Money is saved before you can spend it", "It costs extra", "It's only for banks"],
              correct: 1
            }
          ]
        },
        {
          id: 12,
          courseId: 1,
          title: "Smart Saving vs. Hoarding",
          content: "Saving everything = success? Not really. Saving too much can lead to fear-driven hoarding. Balance is key - save for your goals, but also live your life.",
          orderIndex: 11,
          questions: [
            {
              question: "What does healthy saving mean?",
              options: ["Save everything you earn", "Never spend on anything fun", "Balance saving with living", "Only save if you're rich"],
              correct: 2
            }
          ]
        },
        // Chapter 4: Intro to Investing
        {
          id: 13,
          courseId: 1,
          title: "Why Investing Beats Saving",
          content: "Your bank gives 3%. Inflation eats 6%. Who wins? Saving is safe, but investing grows wealth. You need both to build long-term financial security.",
          orderIndex: 12,
          questions: [
            {
              question: "What's the risk of only saving money?",
              options: ["It's perfectly safe", "Inflation reduces buying power", "Banks will steal it", "Nothing wrong"],
              correct: 1
            }
          ]
        },
        {
          id: 14,
          courseId: 1,
          title: "Compound Interest",
          content: "Earn interest on your interest. Mind = blown. The earlier you start, the more your money snowballs. Time is your biggest advantage in building wealth.",
          orderIndex: 13,
          questions: [
            {
              question: "What makes compound interest powerful?",
              options: ["It's complicated", "You earn interest on your interest", "Only banks benefit", "It takes too long"],
              correct: 1
            }
          ]
        },
        {
          id: 15,
          courseId: 1,
          title: "Types of Investments",
          content: "Not all eggs go in one basket. Stocks = high risk, high return. Fixed Deposits = safe, low return. Mutual funds = middle ground with professional management.",
          orderIndex: 14,
          questions: [
            {
              question: "Which investment typically offers the highest potential return?",
              options: ["Fixed Deposits", "Savings Account", "Stocks", "Cash under mattress"],
              correct: 2
            },
            {
              question: "What are mutual funds?",
              options: ["Only for rich people", "A middle ground with professional management", "The riskiest investment", "Same as savings account"],
              correct: 1
            }
          ]
        },
        {
          id: 16,
          courseId: 1,
          title: "Risk vs. Return",
          content: "Would you risk ₹100 for ₹500? Higher return = higher risk. The key is balancing your risk appetite with your financial goals and timeline.",
          orderIndex: 15,
          questions: [
            {
              question: "What is the relationship between risk and return?",
              options: ["No relationship", "Higher risk = higher potential return", "Higher risk = lower return", "They're the same thing"],
              correct: 1
            }
          ]
        },
        {
          id: 17,
          courseId: 1,
          title: "Start Small",
          content: "You don't need ₹50,000. You need consistency. Even ₹100/month can start your investing journey. The habit matters more than the amount initially.",
          orderIndex: 16,
          questions: [
            {
              question: "What matters most when starting to invest?",
              options: ["Having lots of money", "Consistency and building the habit", "Perfect market timing", "Expensive advice"],
              correct: 1
            }
          ]
        },
        // Chapter 5: Spending Wisely & Financial Hygiene
        {
          id: 18,
          courseId: 1,
          title: "Avoiding Impulse Buys",
          content: "That Instagram ad got you again. Wait 24 hours before buying non-essentials. Use the 'wishlist' rule - if you still want it after a day, then consider it.",
          orderIndex: 17,
          questions: [
            {
              question: "What's the best way to fight impulse shopping?",
              options: ["Buy immediately", "Wait 24 hours before buying", "Never buy anything", "Ask everyone for advice"],
              correct: 1
            }
          ]
        },
        {
          id: 19,
          courseId: 1,
          title: "Credit Cards 101",
          content: "Swipe now, cry later? Credit cards are powerful tools if used wisely. Always pay the full amount before the due date to avoid interest charges.",
          orderIndex: 18,
          questions: [
            {
              question: "Which credit card habit is healthy?",
              options: ["Pay only minimum amount", "Pay full amount before due date", "Never pay the bill", "Max out the limit"],
              correct: 1
            }
          ]
        },
        {
          id: 20,
          courseId: 1,
          title: "Good Debt vs. Bad Debt",
          content: "Not all debt is evil. Good debt grows your value (education loans, business loans). Bad debt drains your wealth (luxury item EMIs, unnecessary loans).",
          orderIndex: 19,
          questions: [
            {
              question: "Which is considered good debt?",
              options: ["Loan for luxury car", "Education loan", "Credit card debt for shopping", "Loan for vacation"],
              correct: 1
            }
          ]
        },
        {
          id: 21,
          courseId: 1,
          title: "Building a Financial Routine",
          content: "Money needs maintenance. Weekly check-ins and monthly reviews build control and confidence. Create habits: Monday = review expenses, 1st = save, 15th = budget check.",
          orderIndex: 20,
          questions: [
            {
              question: "Why is a financial routine important?",
              options: ["It's unnecessary work", "Builds control and confidence", "Only for accountants", "Wastes time"],
              correct: 1
            },
            {
              question: "How often should you review your finances?",
              options: ["Never", "Only when problems occur", "Weekly check-ins and monthly reviews", "Once a year"],
              correct: 2
            }
          ]
        },
        // Design Basics Course
        {
          id: 22,
          courseId: 2,
          title: "Color Theory Fundamentals",
          content: "Understanding color relationships and how to use them effectively. Colors can evoke emotions, create harmony, and guide user attention in your designs.",
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
          id: 23,
          courseId: 2,
          title: "Typography Basics",
          content: "Learn to choose and combine fonts for better readability and design. Good typography enhances communication and creates visual hierarchy.",
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
        lastActive: new Date().toISOString(),
        lastActivityDate: null,
        lastCompletedLessonId: null
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

  async updateUser(updates) {
    const user = this.getUser();
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('learningApp_user', JSON.stringify(updatedUser));
    return Promise.resolve(updatedUser);
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

  async updateProgress(lessonId, completed, xpEarned) {
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

    // Update user XP and streak if lesson completed
    if (completed && xpEarned > 0) {
      const user = this.getUser();
      const now = new Date();
      const today = now.toDateString();
      
      // Check if this is a new day of activity
      const lastActivityDate = user.lastActivityDate ? new Date(user.lastActivityDate).toDateString() : null;
      let newStreak = user.streak;
      
      if (lastActivityDate !== today) {
        // If last activity was yesterday, increment streak
        if (lastActivityDate) {
          const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString();
          if (lastActivityDate === yesterday) {
            newStreak += 1;
          } else {
            newStreak = 1; // Reset streak if gap is more than 1 day
          }
        } else {
          newStreak = 1; // First activity
        }
      }
      
      this.updateUser({ 
        xp: user.xp + xpEarned,
        streak: newStreak,
        lastActive: new Date().toISOString(),
        lastActivityDate: now.toISOString(),
        lastCompletedLessonId: lessonId
      });
    }

    return Promise.resolve(progressEntry);
  }
}

export const storage = new LocalStorage();