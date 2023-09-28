import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

export default function MainList({ data }) {
  const [{ currentChatUser, socket }, dispatch] = UseStateProvider();
  const [status, setstatus] = useState(false);
  const [userid, setuserid] = useState("");
  const handleSetCurrentUser = () => {
    dispatch({ type: reducerCases.CURRENT_CHAT_USER, user: { ...data } });
  };
  useEffect(() => {
    socket.current.emit("check", data?._id);
    socket.current.on("status", ({ st, data }) => {
      setstatus(st);
      setuserid(data);
    });
  }, []);
  return (
    <div
      className={`flex relative cursor-pointer items-center transition-all hover:bg-background-default-hover my-4 ${
        currentChatUser?._id == data?._id &&
        "bg-panel-header-background border-l-4 pl-4 border-conversation-border"
      }`}
      onClick={handleSetCurrentUser}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar type="lg" image={data?.profilePicture} />
      </div>
      {status && data?._id == userid ? (
        <div
          className={`absolute   bg-green-400 z-10 p-2 ${
            currentChatUser?._id == data?._id
              ? "bottom-1 left-20"
              : "bottom-1 left-14"
          } rounded-full`}
        />
      ) : null}
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span className="text-white">{data?.name}</span>
          </div>
        </div>
        <div className="flex border-b border-text-light pb-2 pt-1 pr-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {data?.about}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
