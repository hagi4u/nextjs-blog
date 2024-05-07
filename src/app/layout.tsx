import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Providers';
import Sidebar from '@/components/Sidebar';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'hagi4u blog',
  description: 'hagi4u blog',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <Providers>
          <div className={`flex h-screen w-screen ${inter.className}`}>
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <div className="flex flex-1 flex-col overflow-y-auto">
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
