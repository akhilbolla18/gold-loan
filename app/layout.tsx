"use client";

import { Work_Sans, DM_Sans, Lato } from "next/font/google";
import { useThemeStore } from "@/store/theme.store";
import MobileContainer from "@/components/layout/MobileContainer";
import "./globals.css";

// Configure Google Fonts with Next.js font optimization
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((s) => s.theme);

  return (
    <html
      lang="en"
      data-theme={theme}
      className={`${workSans.variable} ${dmSans.variable} ${lato.variable}`}
    >
      <body>
        <MobileContainer>{children}</MobileContainer>
      </body>
    </html>
  );
}
