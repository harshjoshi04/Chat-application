import React from "react";

export default function LoadingPage() {
  return (
    <div className="relative">
      <img src="/icon.png" height={400} width={300} />
      <div className="text-center">
        <h2 className="text-secondary animate-pulse absolute bottom-7 left-[30%] text-ellipsis text-3xl">
          Loading....
        </h2>
      </div>
      <div className="loader-line"></div>
    </div>
  );
}
