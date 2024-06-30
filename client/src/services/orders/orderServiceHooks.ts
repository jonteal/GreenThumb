import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { OrderFormInputsType, OrderType } from "./types";

const endpoint = "order";
export const baseOrderQueryKey = "order";

export const orderStatuses = ["SCHEDULED", "DELIVERED", "PICKEDUP"] as const;
export const paymentStatuses = ["onDelivery", "onPickup"] as const;
export const packagingOptions = ["Small", "Medium", "Large"] as const;
export const repeatOptions = ["No", "Weekly", "Monthly"] as const;

export const useGetOrders = () =>
  useQuery<OrderType[]>({
    queryKey: [baseOrderQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetOrdersByCustomerId = (customerId: string) =>
  useQuery<OrderType[]>({
    queryKey: [`${baseOrderQueryKey}-${customerId}`],
    queryFn: async () => api.get(`customer/${customerId}/order`),
  });

export const useGetOrderById = (orderId: string) =>
  useQuery<OrderType>({
    queryKey: [`${baseOrderQueryKey}-${orderId}`],
    queryFn: async () => api.get(`${endpoint}/${orderId}`),
  });

export const useAddOrder = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<OrderFormInputsType, Error, OrderFormInputsType>({
    mutationFn: async (newOrder: OrderFormInputsType) =>
      api.post(endpoint, newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseOrderQueryKey] });
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
    // @ts-ignore
    onSuccess: (data, orderId) => {
      queryClient.invalidateQueries({ queryKey: [baseOrderQueryKey] });
      queryClient.removeQueries({
        queryKey: [`${baseOrderQueryKey}-${orderId}`],
        exact: true,
      });
    },
  });
