"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Check if both email and password fields are filled
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res || res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/list");
      toast.success("Loggedin successfully");
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="grid place-items-center bg-black h-screen ">
      <div className="shadow-lg p-5 rounded-lg border-t-4  border-r-4 border-l-4 border-b-8 border-green-400 ">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
            className="text-black rounded-md"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="text-black rounded-md"
          />
          <button
            type="submit"
            className="bg-green-600 text-white rounded-md font-bold cursor-pointer px-6 py-2"
          >
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don’t have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
