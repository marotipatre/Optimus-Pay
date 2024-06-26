import mongoose, { Mongoose } from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  try {
    if (global.mongoose && global.mongoose.conn) {
      console.log("Connected from previous");
      return global.mongoose.conn;
    } else {
      console.log("Connectting ...");
      const conString =
        "mongodb+srv://neerajchoubisa876:neerajchoubisa876@cluster0.0inc49f.mongodb.net/optimus?retryWrites=true&w=majority";

      const promise = mongoose.connect(conString, {
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      global.mongoose = {
        conn: await promise,
        promise,
      };

      console.log("Newly connected");
      return await promise;
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};
