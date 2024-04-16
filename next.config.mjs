import removeImports from 'next-remove-imports';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rzrozpdcyyxnwgvuzuny.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default removeImports()(nextConfig);
