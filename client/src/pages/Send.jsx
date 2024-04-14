import React, { useState } from "react";
import AuthWraper from "../wraper/AuthWraper";
import Heading from "../components/Heading";
import InuptBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Send() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const sendMoney = async (e) => {
    e.preventDefault();
    console.log("button pressed");
    try {
      const { data } = await axios({
        url: "http://localhost:3000/api/v1/user/account/transfer",
        method: "post",
        headers: {
          Authorization: localStorage.getItem("auth-token"),
        },
        data: {
          to: id,
          amount: amount,
        },
      });
      if (data.success) {
        toast.success(data.success, { duration: 4000, position: "top-right" });
        setAmount(0);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.responce, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <AuthWraper>
      <Heading label={"Send Money"} />
      <div className="flex px-10 py-10 pt-5 mt-10">
        <div className="font-normal text-2xl text-center p-4 rounded-full bg-slate-500 text-white w-16 h-16 ">
          {name[0].toUpperCase()}
        </div>
        <div className="font-bold text-4xl p-2 mx-5">{name}</div>
      </div>
      <InuptBox
        label={"Amount (in Rs)"}
        type={"number"}
        value={amount}
        placeholder={"Enter amount"}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button label={"Initiate Transfer"} onClick={sendMoney} />
    </AuthWraper>
  );
}

export default Send;
