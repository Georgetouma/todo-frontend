import './globals.css';
import { Inter } from 'next/font/google';

import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo-list application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
          
          <main>{children}</main>
       
      </body>
    </html>
  );
}