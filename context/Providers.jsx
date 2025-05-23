"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './auth-context';
import { CartProvider } from './cart-context';
import { CheckoutProvider } from './checkout-context';

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      forcedTheme={!mounted ? undefined : null}
    >
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <Toaster position="top-center" />
            {children}
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
