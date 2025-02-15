import React from "react";
import haha from "../assets/haha.jpg";

const Message = () => {
  return (
    <div className="text-light bg-dark flex min-h-screen flex-col items-center justify-center gap-5 p-6">
      <img src={haha} alt="Hahahaha" className="size-56" />
      <h1 className="text-center text-3xl font-bold">
        AHHH NA PRANK!!! HAHAHAHAHAH
      </h1>
    </div>
  );
};

export default Message;
