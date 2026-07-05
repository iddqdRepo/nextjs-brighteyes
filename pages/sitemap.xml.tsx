import { GetServerSideProps } from "next";
import petModel from "../models/petModel";
import dbConnect from "../utils/dbConnect";
import { server } from "../config";

//Serves /sitemap.xml so search engines find every page, including each
//animal currently up for adoption. robots.txt points crawlers here.
const STATIC_ROUTES = [
  "",
  "/about",
  "/adoption",
  "/happy-tails",
  "/donate",
  "/forms",
  "/forms/adoptionForm",
  "/forms/giftAidForm",
  "/forms/volunteerForm",
];

const Sitemap = () => null;

export default Sitemap;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  await dbConnect();
  const pets = await petModel
    .find({ adopted: "No" }, { _id: 1, updatedAt: 1 })
    .lean();

  const urls = [
    ...STATIC_ROUTES.map(
      (route) => `  <url><loc>${server}${route}</loc></url>`
    ),
    ...pets.map(
      (pet: any) =>
        `  <url><loc>${server}/adoption/${pet._id.toString()}</loc></url>`
    ),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return { props: {} };
};
