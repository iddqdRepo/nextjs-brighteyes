/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPS_API: process.env.MAPS_API,
  },
};

module.exports = nextConfig;
