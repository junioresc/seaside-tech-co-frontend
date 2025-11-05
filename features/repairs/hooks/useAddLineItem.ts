import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { repairsApi } from '@/lib/api/endpoints/repairs';
import type { Repair, LineItem } from '@/types';

export function useAddLineItem(repairId: string) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (lineItem: Omit<LineItem, 'id'>) => repairsApi.addLineItem(repairId, lineItem),
    onMutate: async (newLineItem) => {
      await queryClient.cancelQueries({ queryKey: ['repairs', repairId] });
      const previousRepair = queryClient.getQueryData<Repair>(['repairs', repairId]);

      // Optimistically add line item with temporary ID
      queryClient.setQueryData<Repair>(['repairs', repairId], (old) => {
        if (!old) return old;
        return {
          ...old,
          line_items: [
            ...old.line_items,
            { ...newLineItem, id: `temp-${Date.now()}` } as LineItem,
          ],
        };
      });

      return { previousRepair };
    },
    onError: (error: any, _, context) => {
      if (context?.previousRepair) {
        queryClient.setQueryData(['repairs', repairId], context.previousRepair);
      }
      const message = error.response?.data?.detail || 'Failed to add line item';
      enqueueSnackbar(message, { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Line item added', { variant: 'success' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['repairs', repairId] });
    },
  });
}

