import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { ClientType } from "./types";

const endpoint = "client";
export const baseClientQueryKey = "client";
export const clientStatuses = ["LEAD", "CURRENT", "COLD"];

export const useGetClients = () =>
  useQuery<ClientType[]>({
    queryKey: [baseClientQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetClientById = (clientId: string) =>
  useQuery<ClientType>({
    queryKey: [`${baseClientQueryKey}-${clientId}`],
    queryFn: async () => api.get(`${endpoint}/${clientId}`),
  });

export const useAddClient = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<ClientType, Error, ClientType>({
    mutationFn: async (newClient: ClientType) => api.post(endpoint, newClient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      onSuccess();
    },
  });

export const useUpdateClient = (
  options: MutationOptions<ClientType, Error, ClientType>
) =>
  useMutation<ClientType, Error, ClientType>({
    mutationFn: async (editedClient: ClientType) =>
      api.put(`${endpoint}/${editedClient.clientId}`, editedClient),
    ...options,
  });

export const useDeleteClient = () =>
  useMutation<ClientType, Error, string>({
    mutationFn: async (clientId) => api.delete(`${endpoint}/${clientId}`),
    onSuccess: (data, clientId) => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      queryClient.removeQueries({
        queryKey: [`${baseClientQueryKey}-${clientId}`],
        exact: true,
      });
    },
  });
