import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/AuthRoutes.js";
import bodyParser from "body-parser";
import { Connection } from "./db/Connection.js";
import Messagerouter from "./routes/MessageRoutes.js";
import { Server } from "socket.io";
dotenv.config();
Connection();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", router);
app.use("/api/messages", Messagerouter);

const localServer = app.listen(port, () => {
  console.log(`server start on ${port}`);
});

const io = new Server(localServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUser = onlineUsers.get(data.reciever);
    if (sendUser) {
      // emit means send data from user
      socket.to(sendUser).emit("msg-recieve", {
        ...data,
      });
    }
  });
  socket.on("check", (data) => {
    const sen = onlineUsers.get(data);

    if (sen) {
      socket.emit("status", { st: true, data });
    } else {
      socket.emit("status", { st: false, data });
    }
  });
  socket.on("close", () => {
    socket.disconnect();
  });
});
