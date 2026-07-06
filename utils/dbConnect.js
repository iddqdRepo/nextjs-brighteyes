import mongoose from "mongoose";

//Preserve Mongoose 6's current query filtering semantics explicitly and avoid
//a silent behavior change when the next major version is adopted.
mongoose.set("strictQuery", true);

const MONGO_URI = process.env.MONGO_URI;

//Reuse a single connection (and a single in-flight connection promise) across
//serverless invocations. Without this, every cold lambda opens new connections
//until MongoDB refuses them, which surfaces as intermittent 500s on form submits.
let cached = global._mongooseConnection;

if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    //Let the next request retry a fresh connection instead of caching a failure.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
