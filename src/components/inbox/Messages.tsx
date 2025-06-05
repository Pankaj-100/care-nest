import React from "react";
import NoItems from "../common/NoItems";

function Messages() {
  const noMessages = true;
  return (
    <div>
      {noMessages && <NoItems className="mt-[10rem]" />}
      {!noMessages && <div className="card"></div>}
    </div>
  );
}

export default Messages;
