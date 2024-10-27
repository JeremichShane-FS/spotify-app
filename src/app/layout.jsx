"use client";

import { Footer, Header } from "@/components/layout";
import { SessionDebugger } from "@/debug";
import AuthProvider from "@/services/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/sass/main.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Spotify App</title>
      </head>
      <body className="page">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SessionDebugger />
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
