"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UserData = {
  name: string;
  email: string;
} | null;

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      status === "authenticated" &&
      session &&
      session.user
    ) {
      localStorage.setItem("userName", session.user.name || "");
      localStorage.setItem("userEmail", session.user.email || "");

      setUserData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [status, session]);

  const handleSignInRequired = (pageName: string) => {
    toast.error(`Please sign in to access ${pageName}`);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <nav className="bg-cyan-300 p-4 flex justify-between">
        <div className="text-black text-3xl font-bold ml-8">Brain Blitz</div>
        <div className="space-x-8">
          <Link
            href="/"
            className="text-black text-xl font-semibold hover:text-white"
          >
            Take Quiz
          </Link>

          {(status === "authenticated" && (
            <>
              <Link
                href="/createquiz"
                className="text-black text-xl font-semibold hover:text-white"
              >
                Create Quiz
              </Link>
              <Link
                href="/createdquiz"
                className="text-black text-xl font-semibold hover:text-white"
              >
                Created Quiz
              </Link>
            </>
          )) || (
            <>
              <a
                onClick={() => handleSignInRequired("Create Quiz")}
                className="text-black text-xl font-semibold hover:text-white cursor-pointer"
              >
                Create Quiz
              </a>
              <a
                onClick={() => handleSignInRequired("Created Quiz")}
                className="text-black text-xl font-semibold hover:text-white cursor-pointer"
              >
                Created Quiz
              </a>
            </>
          )}

          {status === "authenticated" ? (
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                  redirect: true,
                })
              }
              className="text-black text-xl font-semibold hover:text-white"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="text-black text-xl font-semibold hover:text-white"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
