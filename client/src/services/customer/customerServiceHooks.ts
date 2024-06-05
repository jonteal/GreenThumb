import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { CustomerType } from "./types";

const endpoint = "customer";
export const baseClientQueryKey = "customer";

export const useGetCustomers = () =>
  useQuery<CustomerType[]>({
    queryKey: [baseClientQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetCustomerById = (customerId: string) =>
  useQuery<CustomerType>({
    queryKey: [`${baseClientQueryKey}-${customerId}`],
    queryFn: async () => api.get(`${endpoint}/${customerId}`),
  });

export const useAddCustomer = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<CustomerType, Error, CustomerType>({
    mutationFn: async (newCustomer: CustomerType) =>
      api.post(endpoint, newCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      onSuccess();
    },
  });

export const useUpdateCustomer = (
  options: MutationOptions<CustomerType, Error, CustomerType>
) =>
  useMutation<CustomerType, Error, CustomerType>({
    mutationFn: async (editedCustomer: CustomerType) =>
      api.put(`${endpoint}/${editedCustomer.customerId}`, editedCustomer),
    ...options,
  });

export const useDeleteCustomer = () =>
  useMutation<CustomerType, Error, string>({
    mutationFn: async (customerId) => api.delete(`${endpoint}/${customerId}`),
    onSuccess: (data, customerId) => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      queryClient.removeQueries({
        queryKey: [`${baseClientQueryKey}-${customerId}`],
        exact: true,
      });
    },
  });
