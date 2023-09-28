import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_CHAT_DATA, IMAGE_UPLOAD, MESSAGE_ADD } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import { MdPhotoLibrary } from "react-icons/md";

function MessageBar() {
  const [{ userinfo, currentChatUser, socket }, dispatch] = UseStateProvider();
  const [message, setmessage] = useState("");
  const [emoji, setemoji] = useState(false);
  const emojiRef = useRef(null);
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (event.target.id !== "emojiOpen") {
        if (emojiRef.current && !emojiRef.current.contains(event.target)) {
          setemoji(false);
        }
      }
    };
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  const handleSend = async () => {
    try {
      if (!message.length) return 0;
      const { data } = await axios.post(MESSAGE_ADD, {
        from: userinfo?.id,
        to: currentChatUser?._id,
        messageType: "text",
        message,
      });

      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: data,
      });
      getData();
      socket.current.emit("send-msg", {
        ...data,
      });
      setmessage("");
    } catch (er) {
      console.log(er);
    }
  };
  const getData = async () => {
    const { data } = await axios.get(`${GET_CHAT_DATA}?user=${userinfo?.id}`);
    dispatch({ type: reducerCases.ALL_MEMBER, data: data });
  };
  const photoChange = async (e) => {
    try {
      let img = e.target.files[0];
      if (img) {
        let Formdata = new FormData();
        Formdata.append("image", img);
        const {
          data: { image: NewMessage },
        } = await axios.post(IMAGE_UPLOAD, Formdata);

        const { data } = await axios.post(MESSAGE_ADD, {
          from: userinfo?.id,
          to: currentChatUser?._id,
          messageType: "image",
          message: NewMessage,
        });
        dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: data });
        socket.current.emit("send-msg", {
          ...data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <>
        <div className="flex gap-6">
          <input
            type="file"
            name=""
            id="photo"
            className="hidden"
            onChange={photoChange}
          />
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl "
            title="Emoji"
            id="emojiOpen"
            onClick={() => setemoji(!emoji)}
          />
          {emoji && (
            <div className="absolute bottom-24 left-16 z-40" ref={emojiRef}>
              <EmojiPicker
                theme="dark"
                onEmojiClick={(emoji) => {
                  setmessage((prev) => (prev += emoji.emoji));
                }}
              />
            </div>
          )}
          <label htmlFor="photo">
            <MdPhotoLibrary
              className="text-panel-header-icon cursor-pointer text-xl "
              title="Attach File"
            />
          </label>
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Type a message"
            className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
        </div>
        <div className=" flex  w-20 items-center justify-center gap-1  ">
          <button onClick={handleSend} className="transition-all">
            <BiSend className="text-panel-header-icon  cursor-pointer text-4xl  transition-all hover:scale-110" />
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
