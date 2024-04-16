import { default as mongoose } from "mongoose";
import { User } from "./modals";


const connection = {};

export async function connectToDb() {
  try {
    if (connection.isConnected) {
      console.log("using existing connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;

  } catch (error) {
    console.log(error.message);
    throw new Error("Error connecting to the database");
  }
}

