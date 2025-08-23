import type { Metadata } from 'next';
import { Inter, Birthstone, Figtree, Nunito, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });
const birthstone = Birthstone({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-birthstone'
});
const figtree = Figtree({ 
  subsets: ['latin'],
  variable: '--font-figtree'
});
const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito'
});
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Wonky Malden Book Nook',
  description: 'Book your cozy reading nook at Wonky Malden',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${birthstone.variable} ${figtree.variable} ${nunito.variable} ${poppins.variable}`}>
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

