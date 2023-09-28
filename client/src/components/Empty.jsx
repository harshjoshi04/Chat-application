import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <>
      <div className="border-l-black border-l-1 w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-conversation-border  justify-center items-center">
        <Image src="/icon.png" alt="GearChat" width={300} height={300} />
      </div>
    </>
  );
}

export default Empty;
