import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "../../globals.css";
import { Providers } from "./Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FloatingContactButton from "@/components/common/float-contact";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | CareWorks | Careseeker",
    default: "CareWorks | Careseeker",
  },
  description: "CareWorks is a platform for care Provider and care Seeker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo-2.svg" />
      </head>
      <body
        className={`${roboto.className} text-[var(--blue-gray)]  antialiased`}
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
          <Providers> {children}</Providers>
        </GoogleOAuthProvider>
        <FloatingContactButton />
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
