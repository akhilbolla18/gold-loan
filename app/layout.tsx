"use client";

import { useThemeStore } from "@/store/theme.store";
import MobileContainer from "@/components/layout/MobileContainer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((s) => s.theme);

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <MobileContainer>{children}</MobileContainer>
      </body>
    </html>
  );
}
