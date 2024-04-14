import React from "react";

function ScrollWraper({ children }) {
  return (
    <div id="parent" className=" py-10 px-2">
      <div id="child" className="no-scrollbar overflow-y-scroll pb-32">
        {children}
      </div>
    </div>
  );
}

export default ScrollWraper;
