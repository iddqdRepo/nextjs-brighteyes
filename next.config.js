module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
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
};
// module.exports = nextConfig;
