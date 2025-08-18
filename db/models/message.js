import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const messageModel = mongoose.model("messages", messageSchema);

export const saveMessageToDb = async (message) => {
  try {
    const res = await messageModel.create({ message });
    console.log("message saved ", res);
  } catch (err) {
    console.log(err);
    throw Error("Db error ",err?.message)
  }
};
