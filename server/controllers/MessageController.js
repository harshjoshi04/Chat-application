import Messages from "../model/Message.js";
import User from "../model/UserModel.js";

export const AddMessage = async (req, res) => {
  try {
    const { message, from, to, messageType } = req.body;
    if (!message) {
      return res.send("NOoooo");
    }
    const getUser = onlineUsers.get(to);
    const data = new Messages({
      sender: from,
      reciever: to,
      message: message,
      messageType,
      messageStatus: getUser ? "delivered" : "sent",
    });
    const response = await data.save();
    // console.log(response);
    return res.status(201).send(response);
  } catch (error) {
    return res.status(501).send(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const { from, to } = req.params;
    const message = await Messages.find({
      $or: [
        {
          sender: from,
          reciever: to,
        },
        {
          sender: to,
          reciever: from,
        },
      ],
    }).sort({ createdAt: 1 });
    let unreadMessages = [];
    message.forEach((mess, index) => {
      if (mess.messageStatus !== "read" && mess.sender == to) {
        message[index].messageStatus = "read";
        unreadMessages.push(mess._id);
      }
    });
    await Messages.updateMany(
      {
        _id: { $in: unreadMessages },
      },
      {
        $set: {
          messageStatus: "read",
        },
      }
    );
    return res.status(201).send(message);
  } catch (er) {
    console.log(er);
    return res.status(401).send(er);
  }
};

export const FindSendMessage = async (req, res) => {
  try {
    const { user } = req.query;
    if (user) {
      const mess = await Messages.find({
        $or: [
          {
            sender: user,
          },
          {
            reciever: user,
          },
        ],
      });
      let data = [];
      mess.forEach((val) => {
        data.push(val?.sender);
        data.push(val?.reciever);
      });
      let unique = [...new Set(data)];
      const TotalUser = await User.find({
        _id: { $in: unique },
      });
      return res.status(201).send(TotalUser);
    }
    return res.status(501).send("Done");
  } catch (er) {
    console.log(er);
    return res.status(401).send(er);
  }
};
