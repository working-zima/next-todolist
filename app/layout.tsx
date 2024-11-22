import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toast/toaster";

/** 스타일 */
import "@/public/styles/globals.css";
import "@/public/styles/main.scss";
import { FONT_NOTOSANSKR } from "@/public/assets/fonts/index";

export const metadata: Metadata = {
  title: "TODO-LIST",
  description: "Shadcn UI 및 Supabase를 활용한 TODO-LIST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={FONT_NOTOSANSKR.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
