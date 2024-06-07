import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { TaskType } from "./types";

const endpoint = "task";
export const baseClientQueryKey = "task";

export const cropTasks = [
  "Prep Trays",
  "Seed",
  "Germinate",
  "Light",
  "Harvest",
] as const;

export const useGetTasks = () =>
  useQuery<TaskType[]>({
    queryKey: [baseClientQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetTasksByCropId = (cropId: string) =>
  useQuery<TaskType[]>({
    queryKey: [`${baseClientQueryKey}-${cropId}`],
    queryFn: async () => api.get(`crop/${cropId}/task`),
  });

export const useGetTaskById = (taskId: string) =>
  useQuery<TaskType>({
    queryKey: [`${baseClientQueryKey}-${taskId}`],
    queryFn: async () => api.get(`${endpoint}/${taskId}`),
  });

export const useAddTask = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<TaskType, Error, TaskType>({
    mutationFn: async (newTask: TaskType) => api.post(endpoint, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      onSuccess();
    },
  });

export const useUpdateTask = (
  options: MutationOptions<TaskType, Error, TaskType>
) =>
  useMutation<TaskType, Error, TaskType>({
    mutationFn: async (editedTask: TaskType) =>
      api.put(`${endpoint}/${editedTask.taskId}`, editedTask),
    ...options,
  });

export const useDeleteTask = () =>
  useMutation<TaskType, Error, string>({
    mutationFn: async (taskId) => api.delete(`${endpoint}/${taskId}`),
    onSuccess: (data, taskId) => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      queryClient.removeQueries({
        queryKey: [`${baseClientQueryKey}-${taskId}`],
        exact: true,
      });
    },
  });
