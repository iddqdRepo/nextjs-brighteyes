import dbConnect from "../../../utils/dbConnect";
import PetModel from "../../../models/petModel";

function viewBio({ animal }) {
  return (
    <>
      <div>View Bio for animal</div>
      <div>{animal.type}</div>
    </>
  );
}

export default viewBio;

export const getServerSideProps = async (context) => {
  await dbConnect();
  console.log(context.query.id);

  const result = await PetModel.find({ _id: context.query.id });
  let animal = result[0].toObject();
  console.log("result is: ", result);
  if (animal._id) {
    animal._id = animal._id.toString();
  }
  if (animal.createdAt) {
    animal.createdAt = animal.createdAt.toString();
  }
  if (animal.updatedAt) {
    animal.updatedAt = animal.updatedAt.toString();
  }

  return { props: { animal } };
};
