"use client"

import Navbar from "@/app/components/Navbar";
import { Users } from "@/app/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  // const users = [
  //   {
  //     id: "1",
  //     name: "John",
  //     surname: "Doe",
  //     phone: "+1 (555) 123-4567",
  //     startDate: "2023-01-15",
  //     expirationDate: "2024-01-14",
  //   },
  //   {
  //     id: "2",
  //     name: "Jane",
  //     surname: "Smith",
  //     phone: "+1 (555) 987-6543",
  //     startDate: "2023-03-22",
  //     expirationDate: "2024-03-21",
  //   },
  //   {
  //     id: "3",
  //     name: "Robert",
  //     surname: "Johnson",
  //     phone: "+1 (555) 456-7890",
  //     startDate: "2023-05-10",
  //     expirationDate: "2024-05-09",
  //   },
  //   {
  //     id: "4",
  //     name: "Emily",
  //     surname: "Williams",
  //     phone: "+1 (555) 789-0123",
  //     startDate: "2023-07-18",
  //     expirationDate: "2024-07-17",
  //   },
  //   {
  //     id: "5",
  //     name: "Michael",
  //     surname: "Brown",
  //     phone: "+1 (555) 234-5678",
  //     startDate: "2023-09-05",
  //     expirationDate: "2024-09-04",
  //   },
  // ];

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

  // Handler functions for buttons
  const handleUpdate = (userId:string) => {
    console.log(`Update user with ID: ${userId}`);
    // Add your update logic here
  };

  const handleDelete = (userId:string) => {
    console.log(`Delete user with ID: ${userId}`);
    // Add your delete logic here
  };

  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
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
                          {user.startDate?.toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.endDate?.toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleUpdate(user.id)}
                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md"
                          >
                            Update
                          </button>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
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