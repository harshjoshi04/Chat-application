import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";

import {
  CHEACK_USER_ROUTE,
  GET_CHAT_DATA,
  GET_MESSAGE,
  HOST,
} from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import LoadingPage from "./common/LoadingPage";

function Main() {
  const [RedirectLogin, setRedirectLogin] = useState(false);
  const [id, setid] = useState("");
  const router = useRouter();
  const [{ userinfo, currentChatUser }, dispatch] = UseStateProvider();
  const [loading, setloading] = useState(false);
  const [socketEvent, setsocketEvent] = useState(false);
  const [internet, setinternet] = useState(false);
  const socketRef = useRef();
  useEffect(() => {
    if (RedirectLogin) router.push("/login");
  }, [RedirectLogin]);
  useEffect(() => {
    if (!userinfo?.email) router.push("/login");
  }, []);
  useEffect(() => {
    socketRef.current = io(HOST);
    socketRef.current.emit("add-user", userinfo?.id);
    dispatch({ type: reducerCases.SET_SOCKET, socketRef });
  }, [userinfo]);
  useEffect(() => {
    dispatch({ type: reducerCases.SET_MESSAGE, mess: [] });
    const getMessage = async () => {
      const { data } = await axios.get(
        `${GET_MESSAGE}/${userinfo?.id}/${currentChatUser?._id}`
      );
      dispatch({ type: reducerCases.SET_MESSAGE, mess: data });
    };
    if (currentChatUser) {
      getMessage();
    }
  }, [currentChatUser]);

  useEffect(() => {
    if (socketRef.current && !socketEvent) {
      socketRef.current.on("msg-recieve", (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: data,
        });
      });
    }
  }, [socketRef.current]);

  useEffect(() => {
    if (userinfo) {
      setloading(true);
      getData();
    }
  }, [userinfo]);

  const getData = async () => {
    const { data } = await axios.get(`${GET_CHAT_DATA}?user=${userinfo?.id}`);
    dispatch({ type: reducerCases.ALL_MEMBER, data: data });
  };

  const handleClose = () => {
    socketRef.current.emit("close");
  };
  useEffect(() => {
    window.addEventListener("beforeunload", handleClose);
    return () => {
      window.removeEventListener("beforeunload", handleClose);
    };
  }, []);
  return (
    <>
      <>
        {loading ? (
          <>
            <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
              <ChatList />
              {currentChatUser ? <Chat /> : <Empty />}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center h-screen bg-panel-header-background">
              <div>
                <LoadingPage />
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
}

export default Main;
