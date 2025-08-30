import type { Metadata } from 'next';
import { Inter, Poppins, Figtree, Birthstone } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poppins',
});
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-figtree',
});
const birthstone = Birthstone({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-birthstone',
});

export const metadata: Metadata = {
  title: 'Wonky Walden Book Nook',
  description: 'Book your cozy reading nook at Wonky Walden',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} ${poppins.variable} ${figtree.variable} ${birthstone.variable}`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

