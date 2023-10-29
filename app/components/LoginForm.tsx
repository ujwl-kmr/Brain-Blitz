"use client";
import React, { useState, useEffect } from "react";
import LoginContent from "./LoginContent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordToggle = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setMessage("Signing in...");

    try {
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        setMessage("Invalid credentials");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }

    setMessage(message);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status]);

  return (
    <>
      <div className="shadow-lg flex m-16 mt-20 h-auto bg-cyan-300 rounded-lg">
        <div className="w-1/3 bg-white p-8">
          <div className="container">
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <form>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={email}
                  onChange={handleEmailChange}
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
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <span
                  onClick={handlePasswordToggle}
                  style={{
                    position: "relative",
                    top: "-40px",
                    color: "black",
                    right: "-230px",
                    zIndex: "3",
                  }}
                >
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
                <div className="form-group">
                  <button
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </div>
              <p>{message}</p>
            </form>
          </div>
        </div>
        <div className="w-2/3 bg-F2CC8F p-8">
          <LoginContent />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
