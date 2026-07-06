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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.paypal.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};
