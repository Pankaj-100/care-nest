import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "CareNest",
  description: "CareNest is a platform for care Provider and care Seeker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} text-[var(--blue-gray)]  antialiased`}
      >
       <Providers> {children}</Providers>
                      <ToastContainer position="top-right" autoClose={3000} />

      </body>
    </html>
  );
}
