'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

const SidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {},
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarContext.Provider value={sidebarContextValue}>
        {children}
      </SidebarContext.Provider>
    </QueryClientProvider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
