import { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const ParticipatedContest = () => {

    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const userEmail = user?.email;
    const {data: contests = [], isLoading, refetch} = useQuery({
        queryKey: ['participatedContest', userEmail],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/participated-contests/${userEmail}`)
            return data
        }
    })

    return (
        <div className="mx-auto max-w-7xl container w-11/12">
            <div className="flex items-center flex-col gap-6 justify-center h-screen">
                <h1
                    className="text-3xl font-bold text-center md:text-4xl lg:text-5xl flex items-center justify-center gap-3"
                >
                    Participated Contests
                    <div className="badge badge-outline badge-accent">{contests.length}</div>
                </h1>
                {
                    contests.length === 0 && <>
                        <div className="flex items-center justify-center">
                            Participate in a contest to see your progress here
                        </div>
                    </>
                }
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Contest Name</th>
                                <th>Description</th>
                                <th>Deadline</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map(contest => (
                                <tr key={contest._id}>
                                    <td>{contest.name}</td>
                                    <td>{contest.description}</td>
                                    <td>
                                        {new Date(contest.deadline).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="badge badge-success badge-outline">done</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ParticipatedContest;