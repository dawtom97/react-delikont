/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress:true,
  styledComponents: true,
  // experimental: {
  //   images: {
  //     unoptimized: true,
  //   },
  // },
  images: {
    domains: ['delikont-mbackend.pl']
  },
};
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([
  [withBundleAnalyzer],
  // your other plugins here
])

module.exports = nextConfig;
