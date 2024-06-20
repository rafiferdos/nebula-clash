import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const ContestSubmitted = () => {

    const {user} = useContext(AuthContext)

    const axiosSecure = useAxiosSecure()


    const { data: contests = [], isLoading, refetch } = useQuery({
        queryKey: ['myContests', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-contests/${user.email}`)
            return data
        }
    })

    return (
        <div className="mx-auto max-w-7xl container w-11/12">
            <div className="flex items-center justify-center h-screen">
                {
                    isLoading && 
                    <>
                        <div className="">
                            <div className="loading loading-lg"></div>
                        </div>
                    </>
                }
            <div className="overflow-x-auto">
                        <Fade delay={1000}>
                            <h1 className="text-3xl md:text-5xl my-5 font-bold text-center">My Submitted Contests</h1>
                            <table className="table table-sm md:table-lg bg-base-300/30">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Contest title</th>
                                        <th>Contest Prize</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contests && contests.map(({ name, prize, _id, status }, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="opacity-80">
                                                        {name}
                                                        <br />
                                                    </td>
                                                    <td>
                                                        {prize}
                                                    </td>
                                                    <td className="opacity-70">
                                                        <div className={status === 'pending' ? "badge badge-warning badge-outline" : "badge badge-accent badge-outline"}>{status || 'null'}</div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {
                                contests && contests.length === 0 &&
                                <div className="h-64 flex flex-col items-center justify-center gap-7">
                                    <h2 className="text-center text-2xl font-bold md:text-4xl">No contests found</h2>
                                    <p className="opacity-70 text-lg">Try adding <Link to='/dashboard/add_contest' className="text-accent hover:underline-offset-4 underline lg:no-underline hover:underline cursor-pointer">contest</Link></p>
                                </div>
                            }
                        </Fade>
                    </div>
            </div>
            
        </div>
    );
};

export default ContestSubmitted;