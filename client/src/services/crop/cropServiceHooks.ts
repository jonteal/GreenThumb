import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services/api";
import { CropType } from "./types";

const endpoint = "crop";
export const baseCropQueryKey = "crop";

export const cropTasks = [
  "Prep Trays",
  "Seed",
  "Germinate",
  "Light",
  "Harvest",
] as const;

export const daysOptions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
] as const;

export const unitsOptions = ["oz", "g"] as const;

export const useGetCrops = () =>
  useQuery<CropType[]>({
    queryKey: [baseCropQueryKey],
    queryFn: async () => api.get(endpoint),
  });

export const useGetCropById = (cropId: string) =>
  useQuery<CropType>({
    queryKey: [`${baseCropQueryKey}-${cropId}`],
    queryFn: async () => api.get(`${endpoint}/${cropId}`),
  });

export const useAddCrop = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<CropType, Error, CropType>({
    mutationFn: async (newCrop: CropType) => api.post(endpoint, newCrop),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseCropQueryKey] });
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
      queryClient.invalidateQueries({ queryKey: [baseCropQueryKey] });
      queryClient.removeQueries({
        queryKey: [`${baseCropQueryKey}-${cropId}`],
        exact: true,
      });
    },
  });
