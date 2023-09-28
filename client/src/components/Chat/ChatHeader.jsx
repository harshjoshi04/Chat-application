import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import { UseStateProvider } from "@/context/StateContext";
import { MdClose } from "react-icons/md";
import { reducerCases } from "@/context/constants";
function ChatHeader() {
  const [{ currentChatUser, socket }, dispatch] = UseStateProvider();
  const [status, setstatus] = useState(false);
  useEffect(() => {
    socket.current.emit("check", currentChatUser?._id);
    socket.current.on("status", ({ st }) => {
      setstatus(st);
    });
  });
  const handleClodeUser = () => {
    dispatch({ type: reducerCases.CURRENT_CHAT_USER, user: null });
  };
  return (
    <div className="h-16 px-4 py-3 flex  justify-between items-center bg-panel-header-background z-10">
      <div className="flex items-center justify-center gap-6">
        <Avatar type={"sm"} image={currentChatUser?.profilePicture} />
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChatUser?.name} </span>
          <span className="text-secondary text-sm">
            {status ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div>
        <MdClose
          className="text-panel-header-icon text-2xl cursor-pointer"
          onClick={handleClodeUser}
        />
      </div>
    </div>
  );
}

export default ChatHeader;
