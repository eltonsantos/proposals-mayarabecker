import { AuthProvider } from '@/contexts/AuthContext';
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Proposals Mayara',
  description: 'Proposals System Mayara Becker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <AuthProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} className={inter.className}>
          {children}
          <ToastContainer position='bottom-right' />
        </body>
      </html>
    </AuthProvider>
  )
}
