import React from "react";
import Avatar from "../common/Avatar";
import { UseStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { reducerCases } from "@/context/constants";

import { MdLogout } from "react-icons/md";
import { useRouter } from "next/router";
function ChatListHeader() {
  const route = useRouter();
  const [{ userinfo }, dispatch] = UseStateProvider();
  const handleContectpage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTECTS });
  };
  const handleLogOut = () => {
    dispatch({ type: reducerCases.SET_USER_INFO, userinfo: null });
    dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
    route.push("/login");
  };
  return (
    <>
      <div className="h-16 px-4 py-3 flex justify-between items-center">
        <div className="cursor-pointer">
          <Avatar type="sm" image={userinfo?.profileImage} />
        </div>
        <div className="flex gap-6 text-panel-header-icon">
          <BsFillChatLeftTextFill
            title="New Chat"
            className="cursor-pointer"
            onClick={handleContectpage}
          />
          <MdLogout
            title="LogOut"
            className="cursor-pointer"
            onClick={handleLogOut}
          />
        </div>
      </div>
    </>
  );
}

export default ChatListHeader;
