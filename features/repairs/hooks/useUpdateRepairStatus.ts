import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { repairsApi } from '@/lib/api/endpoints/repairs';
import type { Repair } from '@/types';

export function useUpdateRepairStatus() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      repairsApi.updateStatus(id, status),
    onMutate: async ({ id, status }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ['repairs', id] });

      // Snapshot the previous value
      const previousRepair = queryClient.getQueryData<Repair>(['repairs', id]);

      // Optimistically update
      queryClient.setQueryData<Repair>(['repairs', id], (old) =>
        old ? { ...old, status: status as any } : old
      );

      return { previousRepair };
    },
    onError: (error: any, { id }, context) => {
      // Rollback on error
      if (context?.previousRepair) {
        queryClient.setQueryData(['repairs', id], context.previousRepair);
      }
      const message = error.response?.data?.detail || 'Failed to update status';
      enqueueSnackbar(message, { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Status updated successfully', { variant: 'success' });
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['repairs', id] });
      queryClient.invalidateQueries({ queryKey: ['repairs'] });
    },
  });
}

