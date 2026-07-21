import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import { ApiError } from '@/api/errors';

const queryConfig: DefaultOptions = {
  queries: {
    // Tiempo que la data se considera "fresh" antes de hacer refetch
    staleTime: 1000 * 60 * 5, // 5 minutos
    // Tiempo que el cache se mantiene después de que no hay subscribers
    gcTime: 1000 * 60 * 10, // 10 minutos
    // Número de reintentos en caso de error
    retry: 1,
    // Reintentar solo en errores de red
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  mutations: {
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

/**
 * Configurar manejo de errores global
 */
queryClient.getQueryCache().subscribe((event) => {
  if (event.type === 'error') {
    const error = event.error as ApiError;
    console.error('[QueryClient] Query error:', {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    });
  }
});

queryClient.getMutationCache().subscribe((event) => {
  if (event.type === 'error') {
    const error = event.error as ApiError;
    console.error('[QueryClient] Mutation error:', {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    });
  }
});
