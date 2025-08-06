// Personal Finance 101 course data based on the attached PDF
export const personalFinanceCourse = {
  title: "Personal Finance 101",
  description: "Master Your Money, One Lesson at a Time",
  icon: "💰",
  color: "duolingo-green",
  totalLessons: 22,
  chapters: [
    {
      title: "Understanding Money",
      description: "Why money matters, and how to take control of it",
      lessons: [
        {
          title: "What is Personal Finance?",
          content: "You've earned your first paycheck. Now what? Personal finance is how you manage your money—earning, spending, saving, investing, and protecting it. It's about making smart choices so you can afford the life you want.",
          orderIndex: 0,
          questions: [
            {
              question: "What does personal finance include?",
              options: ["Only earning money", "Earning, spending, saving, investing", "Just paying bills", "Only investing"],
              correct: 1
            }
          ]
        },
        {
          title: "Needs vs. Wants",
          content: "Imagine you're building a survival kit. Is Netflix in it? Needs are essentials: food, shelter, electricity. Wants are nice-to-haves: gaming subscriptions, fancy coffees. Understanding this difference is the foundation of smart spending.",
          orderIndex: 1,
          questions: [
            {
              question: "Which of these is a 'Need'?",
              options: ["Gaming subscription", "Groceries", "Designer clothes", "Concert ticket"],
              correct: 1
            }
          ]
        },
        {
          title: "Power of Saving Early",
          content: "Would you rather have ₹100 today or ₹1 crore after 40 years? Thanks to compound interest, small savings grow over time. The earlier you start, the bigger the reward. Time is your money's best friend.",
          orderIndex: 2,
          questions: [
            {
              question: "What makes your money grow faster?",
              options: ["Spending it quickly", "Starting to save early", "Keeping it in a wallet", "Only saving large amounts"],
              correct: 1
            }
          ]
        },
        {
          title: "Mindsets Around Money",
          content: "Two people earn ₹50K. One is broke, one is saving. Why? A scarcity mindset says 'I never have enough.' An abundance mindset says 'I can make this work.' Your mindset shapes your financial future.",
          orderIndex: 3,
          questions: [
            {
              question: "Which reflects an abundance mindset?",
              options: ["I never have enough money", "I can make this work", "Money is always tight", "I can't afford anything"],
              correct: 1
            }
          ]
        }
      ]
    },
    {
      title: "Budgeting Like a Boss",
      description: "Control where your money goes instead of wondering where it went",
      lessons: [
        {
          title: "The 50-30-20 Rule",
          content: "How do you split ₹10,000 without going broke? Simple: 50% for essentials (rent, groceries), 30% for wants (entertainment, dining out), and 20% for savings. This rule keeps you balanced and on track.",
          orderIndex: 4,
          questions: [
            {
              question: "In the 50-30-20 rule, what percentage goes to savings?",
              options: ["50%", "30%", "20%", "10%"],
              correct: 2
            }
          ]
        },
        {
          title: "Tracking Expenses",
          content: "Ever checked your bank balance and thought, 'Where did it all go?' Expense tracking helps you see patterns. Apps, journals, or spreadsheets all work. The key is consistency, not perfection.",
          orderIndex: 5,
          questions: [
            {
              question: "What's the main purpose of expense tracking?",
              options: ["To restrict spending", "To see spending patterns", "To impress others", "To make budgeting harder"],
              correct: 1
            }
          ]
        },
        {
          title: "Build a Budget",
          content: "You have ₹10,000/month. Make it count. Budgeting is planning your money before you spend it. List your income, subtract essentials, allocate wants, and prioritize savings. Your future self will thank you.",
          orderIndex: 6,
          questions: [
            {
              question: "When should you create a budget?",
              options: ["After spending money", "Before spending money", "Only when broke", "Never"],
              correct: 1
            }
          ]
        },
        {
          title: "Fixed vs. Variable Costs",
          content: "Which costs change? Which don't? Fixed costs like rent and subscriptions stay the same. Variable costs like groceries and shopping change monthly. Understanding this helps you control your spending better.",
          orderIndex: 7,
          questions: [
            {
              question: "Which is a fixed cost?",
              options: ["Groceries", "Entertainment", "Rent", "Shopping"],
              correct: 2
            }
          ]
        }
      ]
    },
    {
      title: "Smart Saving Habits",
      description: "Save to buy freedom, not just things",
      lessons: [
        {
          title: "Emergency Funds",
          content: "Your phone breaks. You need ₹5,000. Do you swipe or panic? Emergency funds equal 3–6 months of expenses, untouched unless it's urgent. This fund is your financial safety net.",
          orderIndex: 8,
          questions: [
            {
              question: "When should you use your emergency fund?",
              options: ["For vacation", "For new clothes", "For phone repair", "For dining out"],
              correct: 2
            }
          ]
        },
        {
          title: "Setting Short-Term Goals",
          content: "You want a new laptop in 3 months. Plan it. Goals give saving a purpose. Break them into monthly targets: ₹15,000 laptop ÷ 3 months = ₹5,000/month. Clear goals make saving easier.",
          orderIndex: 9,
          questions: [
            {
              question: "What makes short-term saving easier?",
              options: ["Vague plans", "Clear monthly targets", "Ignoring the goal", "Saving randomly"],
              correct: 1
            }
          ]
        },
        {
          title: "Automating Your Savings",
          content: "If you can't see it, you won't spend it. Auto-debits move money into savings before you even touch it. Set up automatic transfers and let technology do the hard work for you.",
          orderIndex: 10,
          questions: [
            {
              question: "What's the benefit of automated savings?",
              options: ["More complexity", "Saves money before spending", "Requires daily attention", "Makes budgeting harder"],
              correct: 1
            }
          ]
        },
        {
          title: "Smart Saving vs. Hoarding",
          content: "Saving everything = success? Not really. Saving too much can lead to fear-driven hoarding. Balance is key: save for goals, but also enjoy life responsibly. Money is a tool, not a treasure to hoard.",
          orderIndex: 11,
          questions: [
            {
              question: "Healthy saving means:",
              options: ["Saving 100% of income", "Never spending money", "Balanced saving and spending", "Only saving when forced"],
              correct: 2
            }
          ]
        }
      ]
    },
    {
      title: "Intro to Investing",
      description: "Your money should work while you sleep",
      lessons: [
        {
          title: "Why Investing Beats Saving",
          content: "Your bank gives 3%. Inflation eats 6%. Who wins? Saving is safe, but investing grows wealth. You need both: savings for security, investments for growth. Don't let inflation steal your purchasing power.",
          orderIndex: 12,
          questions: [
            {
              question: "What's the risk of only saving money?",
              options: ["Too much growth", "Inflation reduces value", "Money disappears", "Banks charge fees"],
              correct: 1
            }
          ]
        },
        {
          title: "Compound Interest",
          content: "Earn interest on your interest. Mind = blown. The earlier you start, the more your money snowballs. ₹1,000 today becomes ₹7,000 in 20 years at 10% annual return. Time amplifies money.",
          orderIndex: 13,
          questions: [
            {
              question: "What makes compound interest powerful?",
              options: ["High fees", "Time and early start", "Complex calculations", "Large initial amounts only"],
              correct: 1
            }
          ]
        },
        {
          title: "Types of Investments",
          content: "Not all eggs go in one basket. Stocks = high risk, high return. FDs = safe, low return. Mutual funds = middle ground. Diversify your investments to balance risk and reward.",
          orderIndex: 14,
          questions: [
            {
              question: "Which investment typically offers the highest returns?",
              options: ["Fixed Deposits", "Stocks", "Savings Account", "Gold"],
              correct: 1
            }
          ]
        },
        {
          title: "Risk vs. Return",
          content: "Would you risk ₹100 for ₹500? Higher return = higher risk. Balance your appetite: young investors can take more risk, older investors prefer safety. Know your comfort zone.",
          orderIndex: 15,
          questions: [
            {
              question: "What's the relationship between risk and return?",
              options: ["No relationship", "Higher risk, higher potential return", "Lower risk, higher return", "Risk doesn't matter"],
              correct: 1
            }
          ]
        },
        {
          title: "Start Small",
          content: "You don't need ₹50,000. You need consistency. Even ₹100/month can start your investing journey. Start small, learn the ropes, then gradually increase. Consistency beats large irregular investments.",
          orderIndex: 16,
          questions: [
            {
              question: "What matters most in investing?",
              options: ["Large initial amount", "Perfect timing", "Consistency", "Complex strategies"],
              correct: 2
            }
          ]
        }
      ]
    },
    {
      title: "Spending Wisely & Financial Hygiene",
      description: "A budget without discipline is just a wishlist",
      lessons: [
        {
          title: "Avoiding Impulse Buys",
          content: "That Instagram ad got you again. Wait 24 hours before buying non-essentials. Use the 'wishlist' rule: add it to a list, wait, then decide. Most impulse wants fade with time.",
          orderIndex: 17,
          questions: [
            {
              question: "Best way to fight impulse shopping?",
              options: ["Buy immediately", "Wait 24 hours", "Ask friends to decide", "Use credit cards"],
              correct: 1
            }
          ]
        },
        {
          title: "Credit Cards 101",
          content: "Swipe now, cry later? Credit is powerful if used wisely. Always pay the full amount before the due date. Treat credit like cash: if you can't afford it now, don't buy it.",
          orderIndex: 18,
          questions: [
            {
              question: "Which credit card habit is healthy?",
              options: ["Pay minimum amount", "Pay full amount on time", "Miss payments", "Max out credit limit"],
              correct: 1
            }
          ]
        },
        {
          title: "Good Debt vs. Bad Debt",
          content: "Not all debt is evil. Good debt grows your value: education loans, business loans. Bad debt pays for lifestyle: EMIs on gadgets, luxury items. Borrow to build, not to consume.",
          orderIndex: 19,
          questions: [
            {
              question: "Which is considered good debt?",
              options: ["Credit card debt", "Education loan", "Luxury car EMI", "Shopping loan"],
              correct: 1
            }
          ]
        },
        {
          title: "Scam & Digital Safety",
          content: "Got a message saying you won ₹1 crore? Run. Learn to spot phishing, fake UPI links, and clone apps. Banks never ask for passwords via SMS. When in doubt, verify directly with the bank.",
          orderIndex: 20,
          questions: [
            {
              question: "What should you do with suspicious financial messages?",
              options: ["Click all links", "Share personal details", "Verify directly with bank", "Forward to friends"],
              correct: 2
            }
          ]
        },
        {
          title: "Building a Financial Routine",
          content: "Money needs maintenance. Weekly check-ins and monthly reviews build control and confidence. Monday = review expenses, 1st = save money, 15th = budget adjustments. Make money management a habit.",
          orderIndex: 21,
          questions: [
            {
              question: "Why is a financial routine important?",
              options: ["It's complicated", "Builds control and confidence", "Wastes time", "Only for experts"],
              correct: 1
            }
          ]
        }
      ]
    }
  ]
};