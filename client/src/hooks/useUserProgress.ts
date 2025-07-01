import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { User, UserProgress } from "@shared/schema";

export function useUser() {
  return useQuery<User>({
    queryKey: ["/api/user"],
  });
}

export function useUserProgress() {
  return useQuery<UserProgress[]>({
    queryKey: ["/api/user/progress"],
  });
}

export function useCourseProgress(courseId: number) {
  return useQuery<UserProgress[]>({
    queryKey: ["/api/user/progress", courseId],
    enabled: courseId > 0,
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ lessonId, xpEarned }: { lessonId: number; xpEarned?: number }) => {
      const res = await apiRequest("POST", `/api/lessons/${lessonId}/complete`, { xpEarned });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/progress"] });
    },
  });
}

export function useUpdateHearts() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (hearts: number) => {
      const res = await apiRequest("PATCH", "/api/user/hearts", { hearts });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
  });
}
