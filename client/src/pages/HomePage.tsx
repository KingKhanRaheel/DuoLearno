import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Brain, Trophy, Zap } from 'lucide-react';
import { Link } from 'wouter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-primary to-teal-primary bg-clip-text mb-4 text-[#3c44be]">
            Welcome to Duolearno
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Interactive learning platform that makes education fun and engaging. Learn at your own pace with gamified lessons.
          </p>
          <Link href="/courses">
            <Button className="bg-purple-primary hover:bg-purple-primary/90 text-white px-10 py-5 text-xl rounded-full transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl font-semibold">
              Start Learning
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glassmorphism border-none">
            <CardHeader className="text-center">
              <BookOpen className="w-12 h-12 mx-auto text-purple-primary mb-2" />
              <CardTitle className="text-lg">Interactive Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Engaging courses across multiple subjects designed for effective learning.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-none">
            <CardHeader className="text-center">
              <Brain className="w-12 h-12 mx-auto text-teal-primary mb-2" />
              <CardTitle className="text-lg">Quiz System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Test your knowledge with interactive quizzes and instant feedback.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-none">
            <CardHeader className="text-center">
              <Trophy className="w-12 h-12 mx-auto text-yellow-500 mb-2" />
              <CardTitle className="text-lg">XP System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Earn experience points and track your progress through gamification.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-none">
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 mx-auto text-orange-500 mb-2" />
              <CardTitle className="text-lg">Daily Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Build learning habits with daily streak tracking and rewards.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How it Works Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Course</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select from our variety of engaging courses across different subjects.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Lessons</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Work through interactive lessons with quizzes and immediate feedback.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your learning journey with XP points and daily streaks.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="glassmorphism border-none max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Ready to Begin Your Learning Journey?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join thousands of learners who are already improving their skills with Duolearno.
              </p>
              <Link href="/courses">
                <Button className="bg-gradient-to-r from-purple-primary to-teal-primary hover:opacity-90 text-white px-10 py-5 text-xl rounded-full transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl font-semibold">
                  Explore Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}