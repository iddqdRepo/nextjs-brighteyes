/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/forms/adoption",
        destination: "/forms/adoptionForm?type=Dog",
        permanent: true,
      },
      {
        source: "/forms/giftaid",
        destination: "/forms/giftAidForm",
        permanent: true,
      },
      {
        source: "/forms/volunteer",
        destination: "/forms/volunteerForm",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  env: {
    MAPS_API: process.env.MAPS_API,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.paypal.com",
      },
    ],
  },
};

module.exports = nextConfig;
