/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  styledComponents: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  }
};

module.exports = nextConfig;
