import React from "react";

function Button({ label, onClick }) {
  return (
    <div className="p-5">
      <button
        className="font-medium text-xl p-2 bg-gray-700 text-gray-100 rounded-lg w-full"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
