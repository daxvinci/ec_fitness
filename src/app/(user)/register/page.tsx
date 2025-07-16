"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const UserRegister = () => {

  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName:"",
    email: "",
    number:"",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/register", form);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      } else {
        alert("Registration failed!");
      }
      setIsLoading(false);
      console.log("Server response:", response.data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error registering admin:", error);
    }
  };

    return (
      <>
        <div className="flex min-h-screen items-center gym-bg flex-col justify-center px-6 py-12 lg:px-8">
          <div className="backdrop-blur-lg bg-white/10 border border-white/30 shadow-xl rounded-2xl p-8 w-full max-w-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-black text-2xl/9 font-bold tracking-tight ">
                Register your membership
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    FirstName
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="name"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="name"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="number"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      name="number"
                      id="number"
                      autoComplete="tel"
                      value={form.number}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      isLoading
                        ? "bg-indigo-400 cursor-not-allowed opacity-50"
                        : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                    }`}
                  >
                    {isLoading ? "Registering...." : "Register"}
                  </button>
                </div>
                Already Registered?
                <Link
                  href="/login"
                  className="underline ml-4 decoration-indigo-600 text-white/80"
                >
                  Log in
                </Link>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default UserRegister;