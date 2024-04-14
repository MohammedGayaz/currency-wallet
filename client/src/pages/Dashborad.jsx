import React, { useEffect, useMemo, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

function Dashborad() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const [self, setSelf] = useState({
    firsname: "",
    lastname: "",
    username: "",
    id: "",
    balance: "",
  });

  const getUsers = async () => {
    const { data } = await axios({
      url: `http://localhost:3000/api/v1/user/search?filter=${filter}`,
      method: "get",
      headers: {
        Authorization: localStorage.getItem("auth-token"),
      },
    });
    setUsers(data.users);
  };

  const getProfile = async () => {
    const { data } = await axios({
      url: "http://localhost:3000/api/v1/user/search/me",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("auth-token"),
      },
    });
    setSelf(data);
  };

  useEffect(() => {
    getUsers();
    getProfile();
  }, [filter, self.balance]);

  return (
    <div className="p-10">
      <Appbar title={"PayTM APP"} name={self.firstname + " " + self.lastname} />
      <Balance balance={self.balance} />
      <Users users={users} setFilter={setFilter} />
    </div>
  );
}

export default Dashborad;
