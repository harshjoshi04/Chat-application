import React, { useEffect, useState } from "react";
import ChatHeader from "../Chat/ChatHeader";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import { UseStateProvider } from "@/context/StateContext";
import ContactsList from "./ContactsList";

function ChatList() {
  const [{ contactsPage }] = UseStateProvider();
  const [pageType, setpageType] = useState("default");
  useEffect(() => {
    if (contactsPage) {
      setpageType("all-contact");
    } else {
      setpageType("default");
    }
  }, [contactsPage]);

  return (
    <>
      <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
        {pageType == "default" ? (
          <>
            <ChatListHeader />
            <SearchBar />
            <List />
          </>
        ) : (
          <>
            <ContactsList />
          </>
        )}
      </div>
    </>
  );
}

export default ChatList;
