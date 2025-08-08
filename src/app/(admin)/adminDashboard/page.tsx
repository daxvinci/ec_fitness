"use client"

import Modal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import { AdminDetails, UserDetails, Users } from "@/app/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import UserTable from "@/app/components/UserTable";
import TotalStats from "@/app/components/TotalStats";
import { getUserStatus } from "@/app/components/UserTable";
import { ToastContainer, toast } from 'react-toastify';
import Loading from "@/app/components/Loading";
import Counter from "@/app/components/Counter";

const AdminDashboard = () => {




  const [users,setUsers] = useState<Users>([])
  const [admin,setAdmin] = useState<AdminDetails>()
  const [loading,setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);

// const deleteToast = (deleteMessage:string) => toast(deleteMessage);
const updateToast = (updateMessage:string) => toast(updateMessage);

const handlePause = async (user:UserDetails) => {
  const status = getUserStatus(user)
  if (status !== "active" && status !== "paused" && status !== "expiring") return;
  const nextState = (status === "active" || status === "expiring") ? "paused" : "active";
    // Optimistically update UI
    setUsers(users =>
      users.map(u =>
        u.id === user.id ? { ...u, status: nextState } : u
      )
    );
  
    try {
      await axios.patch(`/api/users/${user.id}`, { status: nextState });
      // Success: nothing else to do
    } catch {
      // Revert change if API fails
      setUsers(users =>
        users.map(u =>
          u.id === user.id ? { ...u, status: user.status } : u
        )
      );
      // Optionally show a toast or error message
      alert("Failed to update user status. Please try again.");
    }
}

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
        ? { ...u, startDate: startDateISO, endDate: endDateISO }
        : u
    )
  );
  setModalOpen(false);
  updateToast(`Updated ${selectedUser.name}'s dates successfully!`);
  setSelectedUser(null);
};

// const handleDelete = async (userId:string) => {
//   const deletedUser = users.find(u => u.id === userId);
//   const newUser = users.filter(user => user.id !== userId )
//   setUsers(newUser)
//   try{
//     const result = await axios.delete(`/api/users/${userId}`)
//     if(result.status !== 200) {
//       deleteToast("Failed to delete user");
//       throw new Error("Failed to delete user");
//     }else{
//       deleteToast(`Deleted ${deletedUser?.name || "user"} successfully!`);
//     }
//   }catch {
//     setUsers(users => [...users, deletedUser!]);
//     deleteToast("Failed to delete user");
//   }


// };

const handleSignOut = () => {
  localStorage.removeItem("token");
  window.location.href = "/adminLogin";
}

// const handleSendMail = async () => {
//   try {
//     const response = await axios.post('/api/email')
//     console.log(response.data);
//     if(response.status === 200) {
//       alert("Email sent successfully!");
//     }
//   }catch (error) {
//     console.error("Error sending email:", error);
//     alert("Failed to send email. Please try again.");
//   }
// }


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
      <div className="min-h-screen bg-gray-200">
        <Navbar handleSignOut={handleSignOut} />
        {/* <button onClick={handleSendMail} className="bg-blue-500 hover:cursor-pointer text-white px-4 py-2 rounded-md m-4">
          send mail
        </button> */}

        <div className="body-wrapper container sm:px-6 lg:px-8 mx-auto py-8">
          
          <Header admin={admin} />
          < Counter/>

          <main className="flex w-full sm:px-0 px-4 flex-col items-center space-y-8">
            <div className="sub-main w-full">
              <TotalStats users={users} />

              <div className="bg-white w-full p-4 sm:p-8 rounded-lg shadow-sm border">
                <UserTable
                  users={users}
                  handlePause={handlePause}
                  handleOpenModal={handleOpenModal}
                  // handleDelete={handleDelete}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        startDate={
          selectedUser?.startDate
            ? typeof selectedUser.startDate === "string"
              ? selectedUser.startDate.slice(0, 10)
              : selectedUser.startDate.toISOString().slice(0, 10)
            : ""
        }
        endDate={
          selectedUser?.endDate
            ? typeof selectedUser.endDate === "string"
              ? selectedUser.endDate.slice(0, 10)
              : selectedUser.endDate.toISOString().slice(0, 10)
            : ""
        }
        onSet={handleSetDates}
      />
      <ToastContainer />
    </>
  );
}
 
export default AdminDashboard;