import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ScrollWraper from "../wraper/ScrollWraper";

function Users({ users, setFilter }) {
  return (
    <>
      <div className="font-bold text-black text-xl p-2">Users</div>
      <div>
        <input
          className="rounded-lg border-gray-300 ps-2 p-2 border-2 w-full my-2"
          type="text"
          placeholder="Search users...."
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>
      <div>
        <ScrollWraper>
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </ScrollWraper>
      </div>
    </>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  const name = user.firstname + " " + user.lastname;
  return (
    <div className="flex justify-between border-b-2 shadow-sm">
      <div className="flex p-5">
        <div className="font-normal text-lg text-center p-2 rounded-full bg-slate-500 text-white w-10 h-10 ">
          {user.firstname[0].toUpperCase()}
        </div>
        <div className="font-bold text-xl p-2">
          {user.firstname} {user.lastname}
        </div>
      </div>
      <Button
        label={"Send money"}
        onClick={() => navigate("/send?id=" + user._id + "&name=" + name)}
      />
    </div>
  );
}

export default Users;
