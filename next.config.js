module.exports = {
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
    domains: ["www.paypal.com"],
  },
  swcMinify: false,
};
// module.exports = nextConfig;
