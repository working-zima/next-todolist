import type { Metadata } from "next";
import { FONT_NOTOSANSKR } from "@/public/assets/fonts/index";

/** 스타일 */
import "@/public/styles/globals.css";
import "@/public/styles/main.scss";

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
        <div className="page">
          <main className="page__main">{children}</main>
        </div>
      </body>
    </html>
  );
}
