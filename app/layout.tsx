import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { StateContextProvider } from '@/Context/StateContext';
import './globals.css'
import { LayoutComponent } from '@/components'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Relentless Store',
  description: 'Ecommerce Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="\electrix-favicon.webp" type="image/x-icon" />
      <body>
        <StateContextProvider>
          <LayoutComponent>
            <Toaster/>
            {children}
          </LayoutComponent>
        </StateContextProvider>
        </body>
    </html>
  )
}
