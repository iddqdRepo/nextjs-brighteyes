import mongoose from "mongoose";

const Schema = mongoose.Schema;

//structure of the document
const petSchema = new Schema({
  id: String,
  type: String,
  name: String,
  age: String,
  sex: String,
  yearsOrMonths: String,
  breed: String,
  size: String,
  image: String,
  suitableForChildren: String,
  suitableForAnimals: String,
  adopted: String,
  desc: String,
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

//Model provides us with an interface to communicate with the databse collection
//looks for the model name (Pet), pluralises it, the look for that collection inside the database
export default mongoose.models.Pets || mongoose.model("Pets", petSchema);
