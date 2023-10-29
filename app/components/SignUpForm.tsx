"use client";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginContent from "./LoginContent";
import Link from "next/link";
import { signUp } from "../actions/users/signUp";

function Registerpage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const handelEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handelPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordToggle = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async () => {
    setMessage("Signing Up...");
    const message = await signUp(email, password);
    setMessage(message);
  };

  return (
    <div className="bg-cyan-300 shadow-lg flex m-16 mt-20 h-auto rounded-lg">
      <div className="w-1/3 bg-white p-8">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
          <form>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={handelEmailChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                required
                value={password}
                onChange={handelPasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <span
                onClick={handlePasswordToggle}
                style={{
                  position: "relative",
                  top: "-45px",
                  color: "black",
                  right: "-230px",
                  zIndex: "3",
                }}
              >
                {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
            <div className="flex">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-7"
              >
                Sign Up
              </button>
              <div>
                <p>Already a user?</p>
                <Link href="/auth/login" className="text-cyan-500">
                  Click to login
                </Link>
              </div>
            </div>
            <p className="mt-4 text-sm">{message}</p>
          </form>
        </div>
      </div>
      <div className="w-2/3 p-8">
        <LoginContent />
      </div>
    </div>
  );
}

export default Registerpage;
