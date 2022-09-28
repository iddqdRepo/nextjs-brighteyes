import React from "react";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";

function viewBio({ viewBio }: { viewBio: any }) {
  console.log(viewBio[0]);
  return (
    <div className="">
      <h1 className="text-red-600 ">View Bio for animal</h1>
    </div>
  );
}

export default viewBio;

export async function getStaticPaths() {
  dbConnect();
  const data = await petModel.find({ adopted: "No" });
  console.log("data", data.length);
  //mapping through to create an array of the paths
  const paths = data.map((obj) => {
    console.log(obj.name);
    return {
      params: { viewBio: obj.name.toString() },
    };
  });

  // console.log("PATHS", paths);
  //returning paths to tell Next to build pages in the paths array
  return {
    paths, //paths which is the same as paths:paths
    fallback: false, // false = if a user tries to visit a route that doesnt exist, it shows a 404 page
  };
}

export async function getStaticProps(context: { params: { viewBio: any } }) {
  dbConnect();
  console.log(context.params.viewBio);

  const anim = context.params.viewBio;
  // Find and return the page to be rendered (in this case, with the correct slug that we used to build the paths)
  const dataTemp = await petModel.find({ name: anim }).lean();

  // console.log("dataTemp = ", dataTemp);
  const data = dataTemp.map((doc) => {
    doc._id = doc._id.toString();
    if (doc.createdAt) {
      doc.createdAt = doc.createdAt.toString();
    }
    if (doc.updatedAt) {
      doc.updatedAt = doc.updatedAt.toString();
    }
    return doc;
  });

  return {
    props: {
      viewBio: data,
    },
    revalidate: 10, // In seconds
  };
}
