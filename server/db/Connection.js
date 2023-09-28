import mongoose from "mongoose";

export const Connection = async () => {
  try {
    let con = await mongoose.connect(process.env.DATABASE_URL);
    con && console.log("Connection  Successfully");
  } catch (er) {
    console.log(er);
  }
};
