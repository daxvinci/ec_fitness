"use client";

import { Users } from "@/app/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {

    const [users,setUsers] = useState<Users>([])

    useEffect(()=>{
      const fetchUsers = async () => {
        try {
          const response = await axios.get("/api/getUsers");
          const result = response.data.users;
          setUsers(result)
          console.log("result: " + result)
        } catch (err) {
          console.error("Error fetching users:", err);
        }
      };
  
      fetchUsers();
      
    },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      <p className="text-lg text-gray-700">
        You signed in successfully on {today}.
      </p>
    </div>
  );
};

export default Dashboard;
