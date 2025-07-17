"use client";

import Spinner from "@/app/components/Spinner";
import { UserDetails} from "@/app/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {

    const [user,setUser] = useState<UserDetails>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(()=>{
      const fetchUsers = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setUser(undefined);
            setLoading(false);
            setError("Unauthorized: No token found.");
            return;
          }
          
          const response = await axios.get(`/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout:20000
          });
          const result = response.data.user;
          setUser(result);
          setLoading(false)
        } catch (error) {
          if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
            alert("Request timed out. Please try again.");
          }
          console.error("Error fetching users:", error);
        }
      };
  
      fetchUsers();
      
    },[])

    if(loading){
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
          <Spinner />
          <h1 className="text-2xl text-gray-700 font-bold mt-4">Loading...</h1>
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {user ? (
        <>
          <h1 className="text-3xl text-gray-700 font-bold mb-4">
            Welcome! {user?.firstName}
          </h1>
          <p className="text-lg text-gray-700">
            Your Membership expires on{" "}
            {user?.endDate
              ? new Date(user.endDate).toLocaleDateString()
              : "N/A"}
            .
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-gray-700 font-bold mb-4">
            Network Error
          </h1>
          <p className="text-lg text-gray-700">
            Please re-connect to the internet.
          </p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
