import type { Metadata, Viewport } from "next";
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
  title: {
    default: "Jenish Thapa | Portfolio",
    template: "%s | Jenish Thapa",
  },
  description: "Portfolio website of Jenish Thapa - End-to-End Developer, BITS Pilani student. Specializing in scalable web applications, AWS, Docker, and innovative technology solutions.",
  keywords: ["Jenish Thapa", "Portfolio", "Web Developer", "BITS Pilani", "Full Stack Developer", "AWS", "Docker", "Next.js", "React"],
  authors: [{ name: "Jenish Thapa" }],
  creator: "Jenish Thapa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jenish.dev",
    title: "Jenish Thapa | Portfolio",
    description: "End-to-End Developer | Scalable Web Apps | AWS & Docker",
    siteName: "Jenish Thapa Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jenish Thapa | Portfolio",
    description: "End-to-End Developer | Scalable Web Apps | AWS & Docker",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
