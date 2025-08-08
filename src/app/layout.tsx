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
  title: "EC-Fitness",
  description:
    "EC-Fitness is a fitness app that helps you track your workouts and progress.",
  authors: [{ name: "Elvis Okoro" }],
  icons: {
    icon: "/images/favicon.jpeg",
  },
  keywords: [
    "gym",
    "fitness",
    "workout",
    "exercise",
    "strength training",
    "weightlifting",
    "cardio",
    "aerobics",
    "HIIT",
    "functional training",
    "personal training",
    "fitness classes",
    "yoga",
    "pilates",
    "crossfit",
    "bodybuilding",
    "calisthenics",
    "group workouts",
    "bootcamp",
    "indoor cycling",
    "spin classes",
    "boxing",
    "martial arts",
    "sports conditioning",
    "stretching",
    "flexibility",
    "core training",
    "nutrition",
    "meal planning",
    "healthy lifestyle",
    "wellness",
    "recovery",
    "physiotherapy",
    "injury prevention",
    "gym membership",
    "fitness app",
    "online training",
    "virtual workouts",
    "fitness challenges",
    "progress tracking",
    "body composition",
    "weight loss",
    "muscle gain",
    "endurance",
    "fitness goals",
    "strength goals",
    "training programs",
    "fitness motivation",
    "health and fitness",
    "sports performance",
    "outdoor workouts",
  ],
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
