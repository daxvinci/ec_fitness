"use client"

import Loading from "@/app/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type MyJwtPayload = {
  userId: string;
  email: string;
  firstName: string;
  role: string;
};


const UserRegister = () => {

  const [loading,setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchAdminAndUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No token found.");
        setLoading(false);
        return;
      }

      try {
        // Fetch admin first
        const decoded = jwtDecode<MyJwtPayload>(token);
        // check for admin role
        if (!decoded || decoded.role !== "admin") {
          router.replace("/adminLogin"); // Not admin, redirect
        }
      } catch (err) {
        router.replace("/adminLogin"); // Invalid token, redirect
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
  
    fetchAdminAndUsers();
  }, [router]);


  const [form, setForm] = useState({
    name: "",
    email: "",
    number:"",
    subscription:"",
    trainer:"",
    password: "",
    confirmPassword: "",
    startDate: "",
    endDate: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // If subscription changes, set startDate and endDate
  if (name === "subscription") {
    const today = new Date();
    const endDate = new Date(today);

    if (value === "daily") {
      endDate.setDate(today.getDate() + 1);
    } else if (value === "weekly") {
      endDate.setDate(today.getDate() + 7);
    } else if (value === "monthly") {
      endDate.setMonth(today.getMonth() + 1);
    } else if (value === "yearly") {
      endDate.setFullYear(today.getFullYear() + 1);
    }

    setForm({
      ...form,
      subscription: value,
      startDate: today.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
    });
  } else {
    setForm({ ...form, [name]: value });
  }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setTimeout(async ()=>{

    // },20000)
    setIsLoading(true);

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/register", form,{ timeout: 20000 });
      if (response.data.success) {

        try {
          const mail = await axios.post("/api/email", {
            email: form.email,
            name: form.name,
          });
          if (mail.status !== 200) {
            alert("Checking email");
          }
        } catch {
          alert("Something wrong.....Failed to send email, but registration succeeded.");
        }
        // localStorage.setItem("token", response.data.token); not storing since no user dashboard
        // setTimeout(()=>{
        // },3000)
        router.push("/adminDashboard");
      } else {
        alert(response.data.message || "Registration failed!");
      }
      setIsLoading(false);
      console.log("Server response:", response.data);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED" || error.code === "ECONNRESET") {
          alert("Request timed out. Please try again.");
        } else if (error.response) {
          alert(
            "Server error: " + (error.response.data?.message || error.message)
          );
        } else if (error.request) {
          alert("No response from server. Please check your network.");
        } else {
          alert("Axios error: " + error.message);
        }
      } else if (error && typeof error === "object" && "message" in error) {
        // Non-Axios error with message
        alert("Unexpected error: " + (error as { message: string }).message);
      } else {
        // Completely unknown error
        alert("Unexpected error occurred.");
      }

    }
  };

  if(loading){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <Loading />
        {/* <h1 className="text-2xl text-gray-700 font-bold mt-4">Loading...</h1> */}
      </div>
  );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <h1 className="text-3xl text-red-600 font-bold mb-4">Unauthorized</h1>
        <p className="text-lg text-gray-700">{error}</p>
      </div>
    );
  }

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
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                method="POST"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      value={form.name}
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
                {/* Subscription Dropdown */}
                <div>
                  <label
                    htmlFor="subscription"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Subscription
                  </label>
                  <div className="mt-2">
                    <select
                      name="subscription"
                      id="subscription"
                      value={form.subscription}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option value="" disabled>Select Subscription</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>
                {/* Trainer Text Input */}
                <div>
                  <label
                    htmlFor="trainer"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Trainer
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="trainer"
                      id="trainer"
                      autoComplete="off"
                      value={form.trainer}
                      onChange={handleChange}
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
              </form>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default UserRegister;