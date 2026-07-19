// app/layout.tsx - FIXED VERSION

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // ✅ ADD THIS LINE - Sets the base URL for all metadata
  metadataBase: new URL('https://cae-copilot.vercel.app'),
  
  title: 'CAE Copilot - Your CAE Expert for Every Simulation Problem',
  description: 'From convergence issues to UMAT debugging, contact problems to material modeling — CAE Copilot solves it all. Launching with full ABAQUS support.',
  keywords: 'CAE, FEA, ABAQUS, ANSYS, LS-DYNA, HyperWorks, MATLAB, COMSOL, AI, Engineering, Simulation, Computational Mechanics, NVH, Crashworthiness, UMAT, VUMAT, USDFLD, UEL, DLOAD, Convergence',
  authors: [{ name: 'Dr. Baij Nath Singh' }],
  
  openGraph: {
    title: 'CAE Copilot - Your CAE Expert for Every Simulation Problem',
    description: 'From convergence issues to UMAT debugging, contact problems to material modeling — CAE Copilot solves it all. Launching with full ABAQUS support.',
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
    title: 'CAE Copilot - Your CAE Expert for Every Simulation Problem',
    description: 'From convergence issues to UMAT debugging, contact problems to material modeling — CAE Copilot solves it all. Launching with full ABAQUS support.',
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