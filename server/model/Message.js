import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    reciever: {
      type: String,
    },
    messageType: {
      type: String,
    },
    message: {
      type: String,
    },
    messageStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", MessageSchema);

export default Messages;
