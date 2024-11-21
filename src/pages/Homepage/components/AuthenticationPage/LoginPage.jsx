import { NavLink } from "react-router-dom";
import { useState } from "react";

const LoginCard = (props) => {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="border-[1px] border-gray-300 bg-white rounded-md w-[35rem] h-[35rem] p-[2rem] grid grid-rows-[auto_1fr_0.1fr] shadow-lg">
      <div className="flex flex-col items-start justify-start mb-[2rem]">
        <h1 className="font-bold text-[2rem] mb-[0.3rem]">
          Log into your account.
        </h1>
        <p className="text-black text-[0.9rem]">
          Enter your username / email and password to log into your account.
        </p>
      </div>
      <div className="grid grid-rows-[1fr_1fr_1fr]">
        <div className="w-full h-fit flex flex-col">
          <p className="text-[0.85rem] mb-[0.3rem]">Username / Email</p>
          <input value={accountName} onChange={e=>setAccountName(e.target.value)} className="border-[1px] border-gray-200 rounded-md w-full px-[1rem] py-[0.5rem]"></input>
        </div>
        <div className="w-full h-fit flex flex-col">
          <p className="text-[0.85rem] mb-[0.3rem]">Password</p>
          <input value={password} onChange={e=>setPassword(e.target.value)} className="border-[1px] border-gray-200 rounded-md w-full px-[1rem] py-[0.5rem]"></input>
        </div>
        <div className="w-full h-fit">
          <button className="rounded-md w-full bg-blue-500 text-white p-[1rem]">
            Sign in
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <p className="text-[0.8rem]">
          Don't have an account? Click here to{" "}
          <NavLink
            className="underline text-blue-500"
            to="/authentication/signup"
          >
            sign
          </NavLink>{" "}
          up.
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
