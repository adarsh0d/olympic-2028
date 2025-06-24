import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getCurrentEnvironment } from '../config/environments';
import "@workspace/ui/globals.css"
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Olympic 2028',
  description: 'Welcome to the Olympic 2028 multizone application',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const messages = await getMessages();
  const env = getCurrentEnvironment();

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-gray-50">
            {/* Header with conditional language switcher */}
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <h1 className="text-xl font-semibold text-gray-900">
                      Olympic 2028
                    </h1>
                  </div>
                </div>
              </div>
            </header>

            {/* Main content */}
            <main>
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="text-center text-sm text-gray-500">
                  © 2028 Olympic Games. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
