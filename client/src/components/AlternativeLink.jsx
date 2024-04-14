import React from "react";
import { Link } from "react-router-dom";

function AlternativeLink({ label, to, toText }) {
  return (
    <div className=" flex font-medium text-lg text-gray-400 p-5 justify-center">
      <div>{label}</div>
      <Link className="underline pl-1" to={to}>
        {toText}
      </Link>
    </div>
  );
}

export default AlternativeLink;
