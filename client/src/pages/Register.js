import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const register = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/register", user);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <img
          className="h-[500px]"
          src="https://img.freepik.com/free-vector/musical-pentagram-sound-waves-notes-background_1017-33911.jpg?w=1380&t=st=1700662031~exp=1700662631~hmac=c57d18550e3ab61ada179fb580ea8bf23bfe6f2db44c6cf7610dfe9c0efb14dd"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5 w-98 p-6  ">
        <h1 className="text-3xl font-bold text-secondary">Welcome To HulferMusic </h1>
        <hr />
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="primary bg-yellow-400" onClick={register}>
          Register
        </button>
        <Link to="/login" className="text-secondary underline">
          If Already Registered , Click Here To Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
