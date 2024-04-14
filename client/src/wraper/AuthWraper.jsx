import React from "react";

function AuthWraper({ children }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-400 rounded-lg shadow-lg ">
        {children}
      </div>
    </div>
  );
}

export default AuthWraper;
