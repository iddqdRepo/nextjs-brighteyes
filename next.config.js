/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    MAPS_API: process.env.MAPS_API,
  },
  images: {
    domains: ["www.paypal.com"],
  },
};
