import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';

import { AuthProvider } from '@app/contexts/AuthContext';
import { ThemeProvider } from '@app/contexts/ThemeProvider';
import { queryClient } from '@app/lib/QueryClient';
import { Router } from '@app/Router';
import { Toaster } from '@views/components/ui/Toaster';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="eteg:ui-theme">
          <BrowserRouter>
            <Router />
            <Toaster position="top-right" richColors />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
