import React from "react";
import { useNavigate } from "react-router-dom";

function Appbar({ title, name }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between border rounded-lg border-gray-600 shadow-sm">
      <div className="font-bold text-gray-900 text-lg p-3">{title}</div>
      <div
        className="flex justify-center cursor-pointer"
        onClick={() => navigate("/update")}
      >
        <div className="p-3 font-bold text-lg">{name}</div>
        <div className="font-normal text-sm text-center p-2 mt-1 mr-4 rounded-full bg-slate-500 text-white w-10 h-10 ">
          ME
        </div>
      </div>
    </div>
  );
}

export default Appbar;
