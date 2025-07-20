"use client"

import { useState } from "react";
import { UserDetails } from "../lib/types";

type UserTableProps = {
    users: UserDetails[];
    handleOpenModal: (user: UserDetails) => void;
    handleDelete: (userId: string) => void;
  };

const UserTable = ({ users, handleOpenModal, handleDelete }: UserTableProps) => {
    const filters = [
        {name:"All Members",value:0},
        {name:"Active",value:0},
        {name:"Expiring Soon",value:0},
        {name:"Expired",value:0}
    ]

    const tableHeaders = [
        { name: "Name" },
        { name: "Surname" },
        { name: "Phone Number" },
        { name: "Email" },
        // { name: "Amount" },
        // { name: "Trainer" },
        { name: "Start Date" },
        { name: "Expiration Date" },
        { name: "" }, // For Update button
        { name: "" }, // For Delete button
      ];

    const [currentFilter,setCurrentFilter] = useState("All Members")
    const handleFilter = (name:string) =>{
        console.log("clicked")
        setCurrentFilter(name)
    }

    return ( 
        <>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Members</h2>

            {/* Filters */}
            <div className="filter-container inline-block">
                <div className="flex flex-wrap gap-2 rounded-lg bg-gray-200 py-1 px-2 mb-4">
                {filters.map((label, i) => (
                    <button 
                    key={i} 
                    onClick={()=>handleFilter(label.name)}
                    className={`px-3 py-1 hover:cursor-pointer text-gray-400  rounded ${currentFilter === label.name ? "bg-white text-gray-900 font-medium" : "hover:bg-gray-100"}`}>
                    {label.name}({label.value})
                    </button>
                ))}
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                
                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                    {tableHeaders.map((header, idx) => (
                        <th
                            key={idx}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {header.name}
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(users) && users.length !== 0 ? (
                        users.map((user) => (
                        <tr key={user.id}>
                            <td className="whitespace-nowrap py-4 px-6 pr-3 text-sm font-medium text-gray-900 ">
                            {user.firstName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            {user.lastName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            {user.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {user.number}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {user?.startDate
                                ? new Date(user.startDate).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {user?.endDate
                                ? new Date(user.endDate).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                                onClick={() => handleOpenModal(user)}
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
        </>
     );
}
 
export default UserTable;