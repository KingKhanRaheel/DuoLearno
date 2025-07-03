import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import Courses from "@/pages/Courses";
import Profile from "@/pages/Profile";
import Course from "@/pages/Course";
import Lesson from "@/pages/Lesson";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/Navigation";
import FloatingStats from "@/components/FloatingStats";

function Router() {
  return (
    <div className="relative">
      <FloatingStats />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/courses" component={Courses} />
        <Route path="/profile" component={Profile} />
        <Route path="/course/:id" component={Course} />
        <Route path="/lesson/:id" component={Lesson} />
        <Route component={NotFound} />
      </Switch>
      <Navigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
