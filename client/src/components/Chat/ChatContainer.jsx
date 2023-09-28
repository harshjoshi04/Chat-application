import { UseStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "../common/Avatar";

function ChatContainer() {
  const [{ messages, userinfo, currentChatUser }] = UseStateProvider();
  const [messagesFocus, setmessagesFocus] = useState(null);
  const [Images, setImages] = useState({
    user: "",
    curr: "",
  });
  const messRef = useRef();

  useEffect(() => {
    document.getElementById("messageId").scrollTop =
      document.getElementById("messageId").scrollHeight;
  }, [messages]);
  return (
    <div
      className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar "
      id="messageId"
    >
      <div className="bg-chat-background  bg-fixed h-full w-full opacity-5 fixed left-auto top-0 z-0 "></div>
      <div className="mx-6 my-6 relative bottom-0 z-40 left-0">
        <div className="flex w-full">
          <div
            className="flex flex-col justify-end w-full gap-1 overflow-auto "
            ref={messRef}
          >
            {messages.map((mess, index) => {
              return (
                <div
                  key={index}
                  className={`flex w-auto gap-2 ${
                    mess?.sender == currentChatUser?._id
                      ? "justify-start"
                      : "justify-end"
                  } `}
                >
                  {mess.messageType == "text" ? (
                    <div
                      className={`text-white px-4  text-lg rounded-full   flex gap-2 items-end max-w-[35%] z-10 bg-search-input-container-background overflow-x-hidden ${
                        mess.sender == currentChatUser?._id && "order-last"
                      }`}
                    >
                      <span className="break-all py-[5px]">
                        {mess?.message}
                      </span>
                      <div className="flex gap-2 items-end ">
                        <span className="text-bubble-meta text-[11px]">
                          {calculateTime(mess?.createdAt)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`text-white px-1 my-3 text-lg rounded-sm relative  flex gap-2 items-end max-w-[35%] z-10 bg-search-input-container-background overflow-x-hidden ${
                          mess.sender == currentChatUser?._id && "order-last"
                        }`}
                      >
                        <img
                          src={`${HOST}/${mess.message}`}
                          className="my-1 rounded"
                        />
                        <div
                          className={`absolute bottom-0 ${
                            mess.sender == currentChatUser?._id
                              ? "left-2"
                              : "right-2"
                          } z-20`}
                        >
                          <span className="text-bubble-meta text-[11px]">
                            {calculateTime(mess?.createdAt)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="text-white flex  justify-center items-center  ">
                    <Avatar
                      image={
                        mess.sender == currentChatUser?._id
                          ? currentChatUser?.profilePicture
                          : userinfo?.profileImage
                      }
                      type={"mess"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
