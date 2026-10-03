"use client";

import React from "react";
import { QueryProvider } from "./QueryProvider";
import { AppProvider } from "@/context/AppContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AppProvider>{children}</AppProvider>
    </QueryProvider>
  );
}
