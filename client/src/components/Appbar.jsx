import React from "react";
import { useNavigate } from "react-router-dom";

function Appbar({ title, name }) {
  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.clear("auth-token");
    navigate("/signin");
  };

  return (
    <div className="flex justify-between border rounded-lg border-gray-600 shadow-sm">
      <div className="font-bold text-gray-900 text-lg p-3">{title}</div>
      <div className="flex justify-center cursor-pointer">
        <div
          onClick={() => navigate("/update")}
          className="p-2 m-2 font-bold text-lg"
        >
          {name}
        </div>
        <button
          onClick={logout}
          className="font-blod bg-red-400 text-white p-2 m-2 rounded-lg mr-3 hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Appbar;
