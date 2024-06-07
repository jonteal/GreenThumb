import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { CropType } from "./types";

const endpoint = "crop";
export const baseClientQueryKey = "crop";

export const cropTasks = [
  "Prep Trays",
  "Seed",
  "Germinate",
  "Light",
  "Harvest",
] as const;

export const useGetCrops = () =>
  useQuery<CropType[]>({
    queryKey: [baseClientQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetCropById = (cropId: string) =>
  useQuery<CropType>({
    queryKey: [`${baseClientQueryKey}-${cropId}`],
    queryFn: async () => api.get(`${endpoint}/${cropId}`),
  });

export const useAddCrop = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<CropType, Error, CropType>({
    mutationFn: async (newCrop: CropType) => api.post(endpoint, newCrop),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      onSuccess();
    },
  });

export const useUpdateCrop = (
  options: MutationOptions<CropType, Error, CropType>
) =>
  useMutation<CropType, Error, CropType>({
    mutationFn: async (editedCrop: CropType) =>
      api.put(`${endpoint}/${editedCrop.cropId}`, editedCrop),
    ...options,
  });

export const useDeleteCrop = () =>
  useMutation<CropType, Error, string>({
    mutationFn: async (cropId) => api.delete(`${endpoint}/${cropId}`),
    onSuccess: (data, cropId) => {
      queryClient.invalidateQueries({ queryKey: [baseClientQueryKey] });
      queryClient.removeQueries({
        queryKey: [`${baseClientQueryKey}-${cropId}`],
        exact: true,
      });
    },
  });
