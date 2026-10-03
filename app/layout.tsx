import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omar-farha.vercel.app"),
  title: "Omar Farha | Frontend Developer Portfolio",
  description:
    "Frontend Developer specializing in React, Next.js, and TypeScript. Creating responsive, user-friendly web applications with modern technologies. Based in Egypt.",
  keywords: [
    "Omar Farha",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Web Developer Egypt",
    "Portfolio",
  ],
  authors: [{ name: "Omar Farha", url: "https://omar-farha.vercel.app/" }],
  creator: "Omar Farha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omar-farha.vercel.app/",
    title: "Omar Farha | Frontend Developer Portfolio",
    description:
      "Frontend Developer specializing in React, Next.js, and TypeScript. Creating responsive, user-friendly web applications.",
    siteName: "Omar Farha Portfolio",
    images: [
      {
        url: "/omar.jpg",
        width: 800,
        height: 1000,
        alt: "Omar Farha - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Farha | Frontend Developer Portfolio",
    description:
      "Frontend Developer specializing in React, Next.js, and TypeScript.",
    images: ["/omar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#000319" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
