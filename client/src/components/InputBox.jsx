import React from "react";

function InuptBox({ label, type, placeholder, value, onChange }) {
  return (
    <div className="p-4 m-2">
      <div className="font-bold text-xl mb-2">{label}: </div>
      <div>
        <input
          className="font-medium text-xl border border-gray-400 rounded-md p-2 ps-4"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default InuptBox;
