import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { ProductType } from "./types";

const endpoint = "product";
export const baseProductQueryKey = "crop";

export const unitsOptions = ["oz", "g"] as const;

export const useGetProducts = () =>
  useQuery<ProductType[]>({
    queryKey: [baseProductQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetProductById = (productId: string) =>
  useQuery<ProductType>({
    queryKey: [`${baseProductQueryKey}-${productId}`],
    queryFn: async () => api.get(`${endpoint}/${productId}`),
  });

export const useAddProduct = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<ProductType, Error, ProductType>({
    mutationFn: async (newProduct: ProductType) =>
      api.post(endpoint, newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseProductQueryKey] });
      onSuccess();
    },
  });

export const useUpdateProduct = (
  options: MutationOptions<ProductType, Error, ProductType>
) =>
  useMutation<ProductType, Error, ProductType>({
    mutationFn: async (editedProduct: ProductType) =>
      api.put(`${endpoint}/${editedProduct.productId}`, editedProduct),
    ...options,
  });

export const useDeleteProduct = () =>
  useMutation<ProductType, Error, string>({
    mutationFn: async (productId) => api.delete(`${endpoint}/${productId}`),
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries({ queryKey: [baseProductQueryKey] });
      queryClient.removeQueries({
        queryKey: [`${baseProductQueryKey}-${productId}`],
        exact: true,
      });
    },
  });
