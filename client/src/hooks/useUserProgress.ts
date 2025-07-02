import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storage } from "@/lib/storage";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => storage.getUser()
  });
}

export function useUserProgress() {
  return useQuery({
    queryKey: ["user", "progress"],
    queryFn: () => storage.getUserProgress()
  });
}

export function useCourseProgress(courseId) {
  return useQuery({
    queryKey: ["course", courseId, "progress"],
    queryFn: () => storage.getCourseProgress(courseId),
    enabled: courseId > 0
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ lessonId, xpEarned }) =>
      storage.updateProgress(lessonId, true, xpEarned || 10),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["user", "progress"] });
      queryClient.invalidateQueries({ queryKey: ["course"] });
    }
  });
}

export function useUpdateHearts() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (hearts) =>
      storage.updateUser({ hearts }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
}