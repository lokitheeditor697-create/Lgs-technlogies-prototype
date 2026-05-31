import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LGS Technologies - #1 Platform for Free Tech & Non-Tech Internships",
  description: "Kickstart your career with LGS Technologies. Explore 100+ highly specialized free internships, hands-on projects, mentorship, and earn industry-recognized credentials globally.",
  keywords: [
    "free internship", 
    "internships", 
    "tech internship", 
    "non-tech internship", 
    "online internship", 
    "student internship", 
    "LGS Technologies", 
    "programming internship", 
    "marketing internship",
    "remote internships",
    "internships for college students"
  ],
  authors: [{ name: "LGS Technologies" }],
  creator: "LGS Technologies",
  publisher: "LGS Technologies",
  openGraph: {
    title: "LGS Technologies - Build Your Career with Free Internships",
    description: "Join 20K+ students globally. Get hands-on experience with real-world projects and industry-recognized certificates.",
    url: "https://lgstechnologies.in", // Placeholder URL
    siteName: "LGS Technologies",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import Preloader from '@/components/layout/Preloader';
import MouseSpotlight from '@/components/layout/MouseSpotlight';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFC] text-gray-900 selection:bg-blue-500/30">
        <MouseSpotlight />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
