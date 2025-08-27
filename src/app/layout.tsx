import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'ResumePilot',
  description: 'Craft the perfect resume with AI-powered scoring and templates.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
