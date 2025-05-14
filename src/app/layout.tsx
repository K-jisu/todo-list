import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/provider/tq-provider";

export const metadata: Metadata = {
  title: "Kangjisu todoList",
  description: "Kangjisu todoList",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
