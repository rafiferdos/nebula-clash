import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdDone } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import toast from "react-hot-toast";

const ManageContests = () => {

    const axiosSecure = useAxiosSecure()

    const { data: contests = [], isLoading, refetch } = useQuery({
        queryKey: ['allContestsUnfiltered'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-contests-unfiltered')
            return data
        }
    })

    const handleComment = () => {
        document.getElementById('my_modal_2').close()
        toast.success('Comment sent successfully!')
    }



    const { mutateAsync } = useMutation({
        mutationFn: async id => {
            const { data } = await axiosSecure.delete(`/delete-contest/${id}`)
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

    const handleUpdateStatus = async (contestId) => {
        // send the new status to the server along with other properties, just update the status
        try {
            const { data } = await axiosSecure.put(`/update-contest-status/${contestId}`, { status: 'open' });
            toast.success('Status updated successfully!')
        } catch (err) {
            console.log(err)
        }
        refetch()
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loading loading-infinity loading-lg text-accent"></div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 items-center justify-center my-20">
            <h1 className="text-4xl font-bold">Manage Contests</h1>
            <div className="overflow-x-auto">
                <table className="mt-10 table">
                    <thead>
                        <tr>
                            <th className="px-8 py-4">Contest Image</th>
                            <th className="px-8 py-4">Contest Name</th>
                            <th className="px-8 py-4">Created By</th>
                            <th className="px-8 py-4">Contest Status</th>
                            <th className="px-8 py-4">Confirm</th>
                            <th className="px-8 py-4">Delete</th>
                            <th className="px-8 py-4">Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map(contest => (
                            <tr key={contest._id}>
                                <td className="px-8 py-4">
                                    <img src={contest?.image} alt={contest.name} className="mask mask-squircle w-32 h-32" onError={(e) => { e.target.onerror = null; e.target.src = "https://i.ibb.co/t2gtXKw/noImg.png" }} referrerPolicy="no-referrer" />
                                </td>
                                <td className="px-8 py-4">{contest?.name || 'No Name'}</td>
                                <td className="px-8 py-4 ">
                                    <div className="flex flex-col items-start gap-2">
                                        {contest.creator?.name || "No creator name"}
                                        <div className="badge badge-accent badge-outline">{contest.creator?.email || "No creator email"}</div>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    {/* <select className="select select-ghost w-full max-w-xs" onChange={e => handleStatusChange(user._id, e.target.value)}>
                                        <option disabled selected>Current: {user.status}</option>
                                        <option value='verified'>Verified</option>
                                        <option value='blocked'>Blocked</option>
                                    </select> */}
                                    <div className={contest.status === 'open' ? "badge badge-success badge-outline" : "badge badge-warning badge-outline"}>

                                        {contest.status}
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    {/* <select className="select select-ghost w-full max-w-xs" onChange={e => handleRoleChange(user._id, e.target.value)}>
                                        <option disabled selected>Current: {user.role}</option>
                                        <option value='admin'>Admin</option>
                                        <option value='creator'>Creator</option>
                                        <option value='user'>Normal User</option>
                                    </select> */}
                                    {
                                        contest.status === 'open' ?
                                            <button className="btn bg-green-500/50 rounded-full text-white" disabled><MdDone /></button>
                                            :
                                            <button onClick={() => handleUpdateStatus(contest._id)} className="btn bg-green-500/50 rounded-full text-white"><MdDone /></button>
                                    }
                                </td>
                                <td className="px-8 py-4">
                                    <button onClick={() => handleDelete(contest._id)} className="btn bg-red-500/50 rounded-full text-white"><IoTrashBin /></button>
                                </td>
                                <td className="px-8 py-4">
                                    <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn bg-yellow-500/50 rounded-full text-white"><FaRegCommentDots /></button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Comment: </h3>
                    <textarea name="textarea" className="textarea textarea-accent w-full" id=""></textarea>
                    <button
                        onClick={handleComment}
                        className="btn btn-block glass"
                    >
                        Send
                    </button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ManageContests;