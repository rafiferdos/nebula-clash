import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { user } = useContext(AuthContext)

    const blankUser = 'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg'

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-users-except/${user.email}`)
            return data
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async id => {
          const { data } = await axiosSecure.delete(`/delete-user/${id}`)
          return data
        },
        onSuccess: data => {
          console.log(data)
          refetch()
          toast.success('Successfully deleted')
        },
    })

    const handleDelete = async id => {
        console.log(id)
        try {
          await mutateAsync(id)
        } catch (err) {
          console.log(err)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center h-screen justify-center">
                <div className="loading loading-infinity loading-lg text-accent"></div>
            </div>
        )
    }

    const handleStatusChange = async (userId, newStatus) => {
        // send the new status to the server along with other properties, just update the status
        try {
            const { data } = await axiosSecure.put(`/update-user/${userId}`, { status: newStatus });
            toast.success('Status updated successfully! Please refresh')
        } catch (err) {
            console.log(err)
        }
    }

    const handleRoleChange = async (userId, newRole) => {
        // send the new role to the server along with other properties, just update the role
        try {
            const { data } = await axiosSecure.put(`/update-user/${userId}`, { role: newRole });
            toast.success('Role updated successfully!')
        } catch (err) {
            console.log(err)
        }
        refetch()
    }

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
                            <th className="px-8 py-4">Current Status</th>
                            <th className="px-8 py-4">Current Role</th>
                            <th className="px-8 py-4">Remove User</th>
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
                                <td className="px-8 py-4">
                                    <select className="select select-ghost w-full max-w-xs" onChange={e => handleStatusChange(user._id, e.target.value)}>
                                        <option disabled selected>Current: {user.status}</option>
                                        <option value='verified'>Verified</option>
                                        <option value='blocked'>Blocked</option>
                                    </select>
                                </td>
                                <td className="px-8 py-4">
                                    <select className="select select-ghost w-full max-w-xs" onChange={e => handleRoleChange(user._id, e.target.value)}>
                                        <option disabled selected>Current: {user.role}</option>
                                        <option value='admin'>Admin</option>
                                        <option value='creator'>Creator</option>
                                        <option value='user'>Normal User</option>
                                    </select>
                                </td>
                                <td className="px-8 py-4">
                                    <button onClick={() => handleDelete(user._id)} className="btn bg-red-500/30 glass rounded-full">Remove</button>
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