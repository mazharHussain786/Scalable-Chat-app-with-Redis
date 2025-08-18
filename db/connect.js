import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected Db")
  } catch (err) {
    console.log(err);
  }
};
