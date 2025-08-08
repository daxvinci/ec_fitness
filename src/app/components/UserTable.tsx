"use client"

import { useState } from "react";
import { UserDetails } from "../lib/types";

type UserTableProps = {
    users: UserDetails[];
    handleOpenModal: (user: UserDetails) => void;
    // handleDelete: (userId: string) => void;
    handlePause: (userId: UserDetails) => void;
  };
  
      export function getDaysLeft(startDate: string | Date, endDate: string | Date): number | string {
          if (!startDate || !endDate) return "N/A";
          const now = new Date();
          const end = new Date(endDate);
        
          // If end date is in the past, return 0 or "Expired"
          if (end < now) return 0;
        
          // Calculate difference in milliseconds
          const diff = end.getTime() - now.getTime();
        
          // Convert ms to days
          return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }
  
        export function getUserStatus(user: UserDetails): string {
          // If user is paused, keep as paused
          if (user.status === "paused") return "paused";
          // If user is expiring, keep as paused
          if (user.status === "expiring") return "paused";
          // If user is manually set to inactive, keep as inactive
          if (user.status === "inactive") return "inactive";
          // If user is manually set to expired, keep as expired
          if (user.status === "expired") return "expired";
        
          // Otherwise, determine by date
          const daysLeft = getDaysLeft(user.startDate, user.endDate);
          if (typeof daysLeft === "number") {
            if (daysLeft <= 0) return "expired";
            if (daysLeft <= 3) return "expiring"; // e.g., 3 days or less left
            return "active";
          }
          return "active";
        }

const UserTable = ({ users, handleOpenModal,handlePause }: UserTableProps) => {
    

        const filters = [
            {name:"All Members",value:0,db_name:"all"},
            {name:"Active",value:0,db_name:"active"},
            {name:"Paused",value:0,db_name:"paused"},
            {name:"Expiring Soon",value:0,db_name:"expiring"},
            {name:"Expired",value:0,db_name:"expired"}
        ]
    
        const tableHeaders = [
            { name: "S/N" },
            { name: "Name" },
            { name: "Phone Number" },
            { name: "Email" },
            { name: "Sub" },
            // { name: "Amount" }, 
            { name: "Trainer" },
            { name: "Start Date" },
            { name: "Expiration Date" },
            { name: "Days Left" },
            { name: "Status" },
            { name: "" }, // For Update button
            // { name: "" },  For Delete button
          ];
    
    const [currentFilter,setCurrentFilter] = useState("all");
    const [activeFilter,setActiveFilter] = useState("All Members");
    const [searchFilter,setSearchFilter] = useState("");
    // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // const [userToDelete, setUserToDelete] = useState<UserDetails | null>(null);
    const filteredUsers = users.filter((user) =>currentFilter === "all" || getUserStatus(user) === currentFilter)
            .filter((user) =>
                user.name.toLowerCase().includes(searchFilter) ||
                user.email.toLowerCase().includes(searchFilter) ||
                user.number.toLowerCase().includes(searchFilter) ||
                user.subscription.toLowerCase().includes(searchFilter) ||
                (user.trainer
                  ? user.trainer.toLowerCase().includes(searchFilter)
                : false))
                  .sort((a, b) => {
                  // If a is expired and b is not, a goes after b (returns 1)
                  // If b is expired and a is not, a goes before b (returns -1)
                  // If both are expired or both are not, keep their order (returns 0)
                  const aExpired = getUserStatus(a) === "expired" ? 1 : 0;
                  const bExpired = getUserStatus(b) === "expired" ? 1 : 0;
                  return aExpired - bExpired;
                });
            

    const handleFilter = (db_name:string,name:string) =>{
        setCurrentFilter(db_name)
        setActiveFilter(name)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchFilter(searchTerm);
    }

    // const handleOpenDeleteModal = (user: UserDetails) => {
    //     setUserToDelete(user);
    //     setDeleteModalOpen(true);
    //   };

    return (
      <>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Members</h2>

        {/* Filters */}
        <div className="filter-container w-full flex mb-4 justify-between items-center">
          <div className="flex gap-2 rounded-lg bg-gray-200 py-1 px-2">
            {filters.map((label, i) => (
              <button
                key={i}
                onClick={() => handleFilter(label.db_name, label.name)}
                className={`px-3 py-1 hover:cursor-pointer text-gray-400  rounded ${
                  activeFilter === label.name
                    ? "bg-white text-gray-900 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {label.name}(
                {
                  users.filter((user) => getUserStatus(user) === label.db_name)
                    .length
                }
                )
              </button>
            ))}
          </div>
          <div className="search w-[40%] bg-gray-500 rounded-2xl">
            <input
              onChange={handleSearch}
              className="w-full px-3 py-1 outline-0 rounded-2xl"
              placeholder="Search for member..."
              type="search"
              name="search"
              id="search"
            />
          </div>
        </div>

        {filteredUsers.length === 0 && searchFilter !== "" && (
          <div className="w-full text-center py-8 text-gray-500 text-lg font-semibold">
            No members found matching your search
          </div>
        )}

        <div className="max-w-7xl">
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
                  filteredUsers.map((user, idx) => (
                    <tr key={user.id}>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-sm 
                            ${
                              getUserStatus(user) === "paused"
                                ? "text-gray-400"
                                : "text-gray-900"
                            } `}
                      >
                        {idx + 1}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-sm 
                            ${
                              getUserStatus(user) === "paused"
                                ? "text-gray-400"
                                : "text-gray-900"
                            } `}
                      >
                        {user.name}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-sm 
                           ${
                             getUserStatus(user) === "paused"
                               ? "text-gray-400"
                               : "text-gray-900"
                           } `}
                      >
                        {user.number}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-sm 
                            ${
                              getUserStatus(user) === "paused"
                                ? "text-gray-400"
                                : "text-gray-900"
                            }`}
                      >
                        {user.email}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-sm 
                           ${
                             getUserStatus(user) === "paused"
                               ? "text-gray-400"
                               : "text-gray-900"
                           } `}
                      >
                        {user.subscription}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-sm 
                            ${
                              getUserStatus(user) === "paused"
                                ? "text-gray-400"
                                : "text-gray-900"
                            } `}
                      >
                        {user.trainer}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-sm 
                            ${
                              getUserStatus(user) === "paused"
                                ? "text-gray-400"
                                : "text-gray-900"
                            }`}
                      >
                        {user?.startDate
                          ? new Date(user.startDate).toLocaleDateString("en-GB")
                          : "N/A"}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-sm 
                            ${
                              getUserStatus(user) === "paused"
                                ? "text-gray-400"
                                : "text-gray-900"
                            }`}
                      >
                        {user?.endDate
                          ? new Date(user.endDate).toLocaleDateString("en-GB")
                          : "N/A"}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-sm 
                           ${
                             getUserStatus(user) === "paused"
                               ? "text-gray-400"
                               : "text-gray-900"
                           }`}
                      >
                        {getDaysLeft(user.startDate, user.endDate)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handlePause(user)}
                          className={`hover:cursor-pointer
                                ${
                                  getUserStatus(user) === "expired"
                                    ? "text-red-500 bg-red-50"
                                    : getUserStatus(user) === "paused"
                                    ? "text-gray-400 bg-gray-50"
                                    : getUserStatus(user) === "expiring"
                                    ? "text-yellow-500 bg-yellow-50"
                                    : "text-green-500 bg-green-50"
                                }
                                 px-3 py-1 rounded-md`}
                        >
                          {getUserStatus(user)}
                        </button>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="bg-indigo-400 hover:cursor-pointer hover:bg-indigo-900 text-indigo-50 px-3 py-1 rounded-md"
                        >
                          Update
                        </button>
                      </td>
                      {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                                onClick={() =>  handleOpenDeleteModal(user)}
                                className="bg-red-400 hover:cursor-pointer hover:bg-red-600 text-red-50 px-3 py-1 rounded-md"
                            >
                                Delete
                            </button>
                            </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No Members Registered
                    </td>
                  </tr>
                )}
                {/* More rows here */}
              </tbody>
            </table>
          </div>
        </div>

        {/* DELETE MODAL */}
        {/* { deleteModalOpen && 
          <div className="modal-backdrop fixed flex justify-center items-center min-h-screen inset-0 bg-black/50 z-50">
            
            <div className="p-6 absolute left-1/3 top-1/3 bg-gray-100 text-gray-800 shadow-2xl rounded-xl">
                <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
                <p>Are you sure you want to delete {userToDelete?.name}? Deleted Users cannot be recovered.</p>
                <div className="flex gap-2 mt-4">
                <button
                    onClick={ () => {
                    if (userToDelete) {
                        handleDelete(userToDelete.id);
                        setDeleteModalOpen(false);
                        setUserToDelete(null);
                    }
                    }}
                    className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded"
                >
                    Yes, Delete
                </button>
                <button
                    onClick={() => setDeleteModalOpen(false)}
                    className="bg-gray-300 cursor-pointer px-4 py-2 rounded"
                >
                    Cancel
                </button>
                </div>
            </div>
          </div>
            
            } */}
      </>
    );
}
 
export default UserTable;