"use client"

import Modal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import Spinner from "@/app/components/Spinner";
import { AdminDetails, UserDetails, Users } from "@/app/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import UserTable from "@/app/components/UserTable";
import TotalStats from "@/app/components/TotalStats";

const AdminDashboard = () => {



  const [users,setUsers] = useState<Users>([])
  const [admin,setAdmin] = useState<AdminDetails>()
  const [loading,setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);

const handleOpenModal = (user: UserDetails) => {
  setSelectedUser(user);
  setModalOpen(true);
};

const handleSetDates = async (startDateISO: string, endDateISO: string) => {
  if (!selectedUser) return;
  await axios.patch(`/api/users/${selectedUser.id}`, { startDate: startDateISO, endDate: endDateISO });
  setUsers(users =>
    users.map(u =>
      u.id === selectedUser.id
        ? { ...u, startDate: new Date(startDateISO), endDate: new Date(endDateISO) }
        : u
    )
  );
  setModalOpen(false);
  setSelectedUser(null);
};

  useEffect(() => {
    const fetchAdminAndUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found.");
          setLoading(false);
          return;
        }
  
        // Fetch admin first
        const adminResponse = await axios.get("/api/admins", {
          headers: { Authorization: `Bearer ${token}` },
          timeout:20000
        });
        const adminResult = adminResponse.data.admin;
        setAdmin(adminResult);
  
        // If admin fetch is successful, fetch users
        const usersResponse = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
          timeout:20000
        });
        const usersResult = usersResponse.data.users;
        setUsers(usersResult);
  
      }catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Unauthorized: Admin access required.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchAdminAndUsers();
  }, []);

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
      <div className="min-h-full bg-gray-200">
        <Navbar />

        <Header admin={admin}/>

        <main className="container mx-auto py-8 flex flex-col items-center space-y-8">

          <div className="sub-main">

            <TotalStats />

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <UserTable users={users} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
            </div>

          </div>

        </main>
        
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        startDate={selectedUser?.startDate
          ? typeof selectedUser.startDate === "string"
            ? selectedUser.startDate.slice(0, 10)
            : selectedUser.startDate.toISOString().slice(0, 10)
          : ""}
        endDate={selectedUser?.endDate
          ? typeof selectedUser.endDate === "string"
            ? selectedUser.endDate.slice(0, 10)
            : selectedUser.endDate.toISOString().slice(0, 10)
          : ""}
        onSet={handleSetDates}
      />

    </>
  );
}
 
export default AdminDashboard;