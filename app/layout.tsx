// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CAE Copilot - AI Assistant for Computational Mechanics',
  description: 'Upload FEA files, debug convergence issues, and accelerate your engineering workflow with AI. Built for engineers, by engineers.',
  keywords: 'CAE, FEA, ABAQUS, ANSYS, LS-DYNA, AI, Engineering, Simulation, Computational Mechanics, NVH, Crashworthiness',
  authors: [{ name: 'Dr. Baij Nath Singh' }],
  openGraph: {
    title: 'CAE Copilot - AI Assistant for Computational Mechanics',
    description: 'Upload FEA files, get instant insights, debug convergence, and accelerate your engineering workflow with AI.',
    url: 'https://cae-copilot.vercel.app',
    siteName: 'CAE Copilot',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CAE Copilot - AI Assistant for Computational Mechanics',
    description: 'Upload FEA files, get instant insights, debug convergence, and accelerate your engineering workflow with AI.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}