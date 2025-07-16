"use client"

import Navbar from "@/app/components/Navbar";
import Spinner from "@/app/components/Spinner";
import { AdminDetails, UserDetails, Users } from "@/app/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [users,setUsers] = useState<Users>([])
  const [admin,setAdmin] = useState<AdminDetails>()
  const [loading,setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
          if (!token) {
            setUsers([]);
            setLoading(false)
            setError("Unauthorized: No token found.");
            return;
          }

        const response = await axios.get("/api/users",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false)
        const result = response.data.users;
        setUsers(result)
      } catch (err) {
        setLoading(false)
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
    
  },[])

  useEffect(()=>{
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
          if (!token) {
            setUsers([]);
            setLoading(false);
            setError("Unauthorized: No token found.");
            return;
          }

        const response = await axios.get("/api/admins",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = response.data.admin;
        setAdmin(result)
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchAdmin();
  },[])

  // Handler functions for buttons
  const handleUpdate = async (userId:string) => {
    const newUser = users.map((user:UserDetails) => {
      if(user.id === userId){
        return {
          ...user,
          startDate: new Date(),
          endDate: new Date()
        }
      }
      return user;
    } )
    setUsers(newUser)
    const result = await axios.patch(`/api/users/${userId}`,{
      startDate: new Date().toISOString(), 
      endDate: new Date().toISOString()
    })

    console.log(result.data.users) //add toast notification
  };

  const handleDelete = async (userId:string) => {

    const newUser = users.filter(user => user.id !== userId )
    setUsers(newUser)
    const result = await axios.delete(`/api/users/${userId}`)

    console.log(result.data.users) //add toast notification

  };

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
    <>
      <div className="min-h-full">
        <Navbar />
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome {admin?.firstName}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Your content */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Surname
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Expiration Date
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(users) && users.length !== 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {user.firstName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.lastName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.number}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user?.startDate
                            ? new Date(user.startDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user?.endDate
                            ? new Date(user.endDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleUpdate(user.id)}
                            className="text-indigo-600 hover:cursor-pointer hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md"
                          >
                            Update
                          </button>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:cursor-pointer hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-4 text-gray-500"
                      >
                        No Members Registered
                      </td>
                    </tr>
                  )}
                  {/* More rows here */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
 
export default AdminDashboard;