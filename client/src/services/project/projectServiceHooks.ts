import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { ProjectType } from "./types";

const endpoint = "project";
export const baseProjectQueryKey = "project";

export const projectStatuses = ["ACTIVE", "INACTIVE"] as const;

export const useGetProjects = () =>
  useQuery<ProjectType[]>({
    queryKey: [baseProjectQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetProjectsByClientId = (customerId: string) =>
  useQuery<ProjectType[]>({
    queryKey: [`${baseProjectQueryKey}-${customerId}`],
    queryFn: async () => api.get(`customer/${customerId}/project`),
  });

export const useGetProjectById = (clientProjectId: string) =>
  useQuery<ProjectType>({
    queryKey: [`${baseProjectQueryKey}-${clientProjectId}`],
    queryFn: async () => api.get(`${endpoint}/${clientProjectId}`),
  });

export const useAddProject = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<ProjectType, Error, ProjectType>({
    mutationFn: async (newProject: ProjectType) =>
      api.post(endpoint, newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseProjectQueryKey] });
      onSuccess();
    },
  });

export const useUpdateProject = (
  options: MutationOptions<ProjectType, Error, ProjectType>
) =>
  useMutation<ProjectType, Error, ProjectType>({
    mutationFn: async (editedProject: ProjectType) =>
      api.put(`${endpoint}/${editedProject.customerProjectId}`, editedProject),
    ...options,
  });

export const useDeleteProject = () =>
  useMutation<ProjectType, Error, string>({
    mutationFn: async (clientProjectId) =>
      api.delete(`${endpoint}/${clientProjectId}`),
    onSuccess: (data, clientProjectId) => {
      queryClient.invalidateQueries({
        queryKey: [baseProjectQueryKey],
      });
      queryClient.removeQueries({
        queryKey: [`${baseProjectQueryKey}-${clientProjectId}`],
        exact: true,
      });
    },
  });
