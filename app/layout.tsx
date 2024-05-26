import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conference",
  description: "Virtual Meeting Rooms",
  icons: {
    icon: '/icons/logo.svg',
  }
};

import 'react-datepicker/dist/react-datepicker.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      appearance={{
        layout: {
          logoImageUrl:"../icons/yoom-logo.svg",
          socialButtonsVariant:"iconButton"
        },
        variables: {
          colorBackground: "#1c1f2e",
          colorText: '#fff',
          colorPrimary: "#0e78f9",
          colorInputBackground: '#252a41',
          colorInputText: "#fff"
        }
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-2`}>
            {children}
            <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
