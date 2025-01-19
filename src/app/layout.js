'use client';

import "./styles/globals.css";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ko">
        <body >
          <Header />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
