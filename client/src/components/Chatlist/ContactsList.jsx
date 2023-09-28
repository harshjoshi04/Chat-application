import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GETALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setallContacts] = useState([]);
  const [{ userinfo }, dispatch] = UseStateProvider();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(`${GETALL_CONTACTS}?query=${userinfo?.email}`);
        setallContacts(users);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-end px-3 py-4">
        <div className="flex items-center text-white gap-2">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() => {
              dispatch({ type: reducerCases.SET_ALL_CONTECTS });
            }}
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="h-full bg-search-input-container-background flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14">
          <div className="bg-panel-header-background my-4 mx-2 flex gap-5 px-3 py-1 rounded-lg flex-grow ">
            <div className="pt-1">
              <BiSearch className="text-panel-header-icon cursor-pointer text-lg" />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search Contact"
                className="bg-transparent  text-sm focus:outline-none text-white w-full "
              />
            </div>
          </div>
        </div>
        {Object.entries(allContacts).map(([Char, userList]) => {
          return (
            <div key={Date.now() + Char}>
              <div className="text-teal-light pl-10 py-5">{Char}</div>
              {userList.map((contact, index) => {
                return (
                  <ChatLIstItem
                    key={index}
                    data={contact}
                    isContactPage={true}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactsList;
