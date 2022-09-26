import mongoose from "mongoose";

const connection = {};
console.log("MONGO_URI = ", process.env.MONGO_URI);

//check if we’re connected to the database, if not then set up a connection
async function dbConnect() {
  console.log("MONGO_URI = ", process.env.MONGO_URI);

  if (connection.isConnected) {
    return;
  }
  console.log("MONGO_URI = ", process.env.MONGO_URI);

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log("MONGO_URI = ", process.env.MONGO_URI);

  console.log(connection.isConnected);
}

export default dbConnect;
