import React, { useState } from "react";
import axios from "axios";
import Heading from "../components/Heading";
import Description from "../components/Description";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import AuthWraper from "../wraper/AuthWraper";
import AlternativeLink from "../components/AlternativeLink";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: "http://localhost:3000/api/v1/auth/register",
        method: "post",
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          password: user.password,
        },
      });
      if (data.success) {
        toast.success(data.success, { duration: 4000, position: "top-right" });
        setUser({
          firstname: "",
          lastname: "",
          username: "",
          password: "",
        });
      }
      navigate("/signin");
    } catch (err) {
      toast.error(err.response.data.error, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <AuthWraper>
      <Heading label={"Sign up"} />
      <Description label={"Enter your information to create an account"} />
      <InputBox
        label={"First Name"}
        type={"text"}
        value={user.firstname}
        placeholder={"first name"}
        onChange={(e) => setUser({ ...user, firstname: e.target.value })}
      />
      <InputBox
        label={"Last Name"}
        type={"text"}
        value={user.lastname}
        placeholder={"last name"}
        onChange={(e) => setUser({ ...user, lastname: e.target.value })}
      />
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
      <Button label={"Sign up"} onClick={createUser} />
      <AlternativeLink
        label={"Alredy have an accoutn? "}
        toText={"Sign in"}
        to={"/signin"}
      />
    </AuthWraper>
  );
}

export default Signup;
