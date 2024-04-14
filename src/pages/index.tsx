import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="h-[200px]">
      <h1>Hello world</h1>
    </main>
  );
}
