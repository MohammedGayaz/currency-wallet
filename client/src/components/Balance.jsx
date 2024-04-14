import React from "react";

function Balance({ balance }) {
  return (
    <div className="m-5 p-5 flex justify-start">
      <div className="font-bold text-black text-2xl mr-2">Your balance: </div>
      <div className="font-medium text-gray-900 text-2xl">Rs {balance}</div>
    </div>
  );
}

export default Balance;
