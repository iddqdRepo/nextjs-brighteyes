const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://nextjs-brighteyes-o2zv-iddqdrepo.vercel.app";
// : "https://brighteyesanimalsanctuary.com";
