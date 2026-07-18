// app/layout.tsx - THIS IS THE ROOT LAYOUT

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CAE Copilot - AI Assistant for Computational Mechanics',
  description: 'Upload FEA files, get instant insights, debug convergence, and accelerate your engineering workflow with AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full flex flex-col`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}