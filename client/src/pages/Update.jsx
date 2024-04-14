import React, { useEffect, useState } from "react";
import AuthWraper from "../wraper/AuthWraper";
import Heading from "../components/Heading";
import Description from "../components/Description";
import InuptBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Update() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });

  const update = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: "http://localhost:3000/api/v1/user/update",
        method: "put",
        headers: {
          Authorization: localStorage.getItem("auth-token"),
        },
        data: user,
      });

      if (data.success) {
        toast.success(data.success, { duration: 4000, position: "top-right" });
        setUser({
          firstname: "",
          lastname: "",
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

  const getProfile = async () => {
    const { data } = await axios({
      url: "http://localhost:3000/api/v1/user/search/me",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("auth-token"),
      },
    });
    setUser(data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthWraper>
      <Heading label={"Update Data"} />
      <Description label={"Enter the updated details to commit changes"} />
      <InuptBox
        label={"First Name"}
        type={"text"}
        value={user.firstname}
        placeholder={"first name"}
        onChange={(e) => setUser({ ...user, firstname: e.target.value })}
      />
      <InuptBox
        label={"Last Name"}
        type={"text"}
        value={user.lastname}
        placeholder={"last name"}
        onChange={(e) => setUser({ ...user, lastname: e.target.value })}
      />
      <InuptBox
        label={"password"}
        type={"password"}
        placeholder={"******"}
        onChange={(e) => setUser(e.target.value)}
      />
      <Button label={"Update"} onClick={update} />
      <Description label={"All the fields are optionla!!!"} />
    </AuthWraper>
  );
}

export default Update;
