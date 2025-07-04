import createNextIntlPlugin from 'next-intl/plugin';
import { getRequestConfig } from 'next-intl/server';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/medals/_next/:path*',
        destination: 'http://localhost:3001/_next/:path*',
      },
      {
        source: '/medals/flags.png',
        destination: 'http://localhost:3001/flags.png',
      },
      {
        source: '/medals/:path*',
        destination: 'http://localhost:3001/medals/:path*',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
