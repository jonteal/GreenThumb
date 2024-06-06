import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { OrderType } from "./types";

const endpoint = "order";
export const baseClientQueryKey = "order";

export const orderStatuses = ["SCHEDULED", "DELIVERED", "PICKEDUP"] as const;
export const paymentStatuses = ["onDelivery", "onPickup"] as const;

export const useGetOrders = () =>
  useQuery<OrderType[]>({
    queryKey: [baseClientQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetOrderById = (orderId: string) =>
  useQuery<OrderType>({
    queryKey: [`${baseClientQueryKey}-${orderId}`],
    queryFn: async () => api.get(`${endpoint}/${orderId}`),
  });

export const useAddOrder = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<OrderType, Error, OrderType>({
    mutationFn: async (newOrder: OrderType) => api.post(endpoint, newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      onSuccess();
    },
  });

export const useUpdateOrder = (
  options: MutationOptions<OrderType, Error, OrderType>
) =>
  useMutation<OrderType, Error, OrderType>({
    mutationFn: async (editedOrder: OrderType) =>
      api.put(`${endpoint}/${editedOrder.orderId}`, editedOrder),
    ...options,
  });

export const useDeleteOrder = () =>
  useMutation<OrderType, Error, string>({
    mutationFn: async (orderId) => api.delete(`${endpoint}/${orderId}`),
    onSuccess: (data, orderId) => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      queryClient.removeQueries({
        queryKey: [`${baseClientQueryKey}-${orderId}`],
        exact: true,
      });
    },
  });
