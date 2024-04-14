import React from "react";

function Description({ label }) {
  return (
    <div className="font-medium text-lg text-gray-400 p-3 text-center">
      {label}
    </div>
  );
}

export default Description;
