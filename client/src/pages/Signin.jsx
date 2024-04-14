import React, { useState } from "react";
import Heading from "../components/Heading";
import Description from "../components/Description";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import AuthWraper from "../wraper/AuthWraper";
import AlternativeLink from "../components/AlternativeLink";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: "http://localhost:3000/api/v1/auth/login",
        method: "post",
        data: user,
      });

      if (data.success) {
        const token = data.token;
        localStorage.setItem("auth-token", token);
        toast.success(data.success, { duration: 4000, position: "top-right" });
        setUser({
          username: "",
          password: "",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data.error, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <AuthWraper>
      <Heading label={"Sign in"} />
      <Description label={"Enter your credentials to access your account"} />
      <InputBox
        label={"Email"}
        type={"email"}
        value={user.username}
        placeholder={"example@mail.com"}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <InputBox
        label={"Password"}
        type={"password"}
        value={user.password}
        placeholder={"******"}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button label={"Sign in"} onClick={loginUser} />
      <AlternativeLink
        label={"Don't have an accoutn? "}
        toText={"Sign up"}
        to={"/signup"}
      />
    </AuthWraper>
  );
}

export default Signin;
