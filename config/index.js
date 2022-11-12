const dev = process.env.NODE_ENV !== "production";

export function getRoute() {
  console.log("inHEre");
}
export const server = dev
  ? "http://localhost:3000"
  : "https://brighteyesanimalsanctuary.com/";
