import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { TeamMemberType } from "./types";

const endpoint = "team";
export const baseClientQueryKey = "team";

export const useGetTeam = () =>
  useQuery<TeamMemberType[]>({
    queryKey: [baseClientQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetTeamMemberById = (teamMemberId: string) =>
  useQuery<TeamMemberType>({
    queryKey: [`${baseClientQueryKey}-${teamMemberId}`],
    queryFn: async () => api.get(`${endpoint}/${teamMemberId}`),
  });

export const useAddTeamMember = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<TeamMemberType, Error, TeamMemberType>({
    mutationFn: async (newTeamMember: TeamMemberType) =>
      api.post(endpoint, newTeamMember),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      onSuccess();
    },
  });

// export const useUpdateTask = (
//   options: MutationOptions<TaskType, Error, TaskType>
// ) =>
//   useMutation<TaskType, Error, TaskType>({
//     mutationFn: async (editedTask: TaskType) =>
//       api.put(`${endpoint}/${editedTask.taskId}`, editedTask),
//     ...options,
//   });

// export const useDeleteTask = () =>
//   useMutation<TaskType, Error, string>({
//     mutationFn: async (taskId) => api.delete(`${endpoint}/${taskId}`),
//     onSuccess: (data, taskId) => {
//       queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
//       queryClient.removeQueries({
//         queryKey: [`${baseClientQueryKey}-${taskId}`],
//         exact: true,
//       });
//     },
//   });
