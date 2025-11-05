'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { wsClient } from './client';

/**
 * Hook to listen for WebSocket events and invalidate queries
 */
export function useWebSocketUpdates() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Connect to WebSocket
    wsClient.connect();

    // Listen for repair updates
    const unsubscribeRepair = wsClient.on('repair_updated', (data) => {
      queryClient.invalidateQueries({ queryKey: ['repairs', data.id] });
      queryClient.invalidateQueries({ queryKey: ['repairs'] });
    });

    // Listen for appointment updates
    const unsubscribeAppt = wsClient.on('appointment_updated', (data) => {
      queryClient.invalidateQueries({ queryKey: ['appointments', data.id] });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    });

    // Listen for cart updates
    const unsubscribeCart = wsClient.on('cart_updated', () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    });

    // Cleanup
    return () => {
      unsubscribeRepair();
      unsubscribeAppt();
      unsubscribeCart();
      // Don't disconnect as other components may be using it
    };
  }, [queryClient]);
}

/**
 * Hook for custom WebSocket event listening
 */
export function useWebSocketEvent(eventType: string, handler: (data: any) => void) {
  useEffect(() => {
    const unsubscribe = wsClient.on(eventType, handler);
    return unsubscribe;
  }, [eventType, handler]);
}

