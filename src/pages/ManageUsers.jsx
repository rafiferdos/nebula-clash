import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { user } = useContext(AuthContext)

    const blankUser = 'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg'


    const { data: users = [], isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-users-except/${user.email}`)
            return data
        }
    })

    if (isLoading) {
        return (
            <div className="flex items-center h-screen justify-center">
                <div className="loading loading-infinity loading-lg text-accent"></div>
            </div>
        )
    }

    const handleStatusChange = async (userId, newStatus) => {
        // send the new status to the server along with other properties, just update the role
        try {
            const { data } = await axiosSecure.put(`/update-user/${userId}`, { role: newStatus });
            toast.success('Role updated successfully! Please refresh')
        } catch (err) {
            console.log(err)
        }
        
    };

    return (
        <div className="flex flex-col gap-8 items-center justify-center my-20">
            <h1 className="text-4xl font-bold">Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="mt-10 table">
                    <thead>
                        <tr>
                            <th className="px-8 py-4">Photo</th>
                            <th className="px-8 py-4">Name</th>
                            <th className="px-8 py-4">Email</th>
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4">Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="px-8 py-4">
                                    <img src={user?.image || blankUser} alt={user.name} className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="px-8 py-4">{user?.name || 'No username'}</td>
                                <td className="px-8 py-4">{user.email}</td>
                                <td className="px-8 py-4">{user.role}</td>
                                <td className="px-8 py-4">
                                    <select className="select select-ghost w-full max-w-xs" onChange={e => handleStatusChange(user._id, e.target.value)}>
                                        <option disabled selected>Current: {user.role}</option>
                                        <option value='admin'>Admin</option>
                                        <option value='creator'>Creator</option>
                                        <option value='user'>Normal User</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;