import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "backend",
    });

    console.log("DB Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
