import React, { useEffect, useState } from "react";
import { UseStateProvider } from "@/context/StateContext";
import MainList from "./MainList";

function List() {
  const [{ chatMember, userinfo }] = UseStateProvider();
  return (
    <div className="bg-search-input-container-background flex-auto overflow-auto mx-full custom-scrollbar">
      {chatMember.map((val, index) => {
        if (val?._id !== userinfo?.id) {
          return <MainList key={index} data={val} />;
        }
      })}
    </div>
  );
}

export default List;
