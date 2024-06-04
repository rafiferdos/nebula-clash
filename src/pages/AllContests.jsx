import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import ContestCard from "../components/ContestCard";

const AllContests = () => {

    const axiosSecure = useAxiosSecure()

    const { data, isLoading } = useQuery({
        queryKey: ['allContests'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-contests')
            return data
        }
    })

    return (
        <div className="container mx-auto md:my-16 lg:my-24 my-12 max-w-7xl w-11/12 md:space-y-24 space-y-16 lg:space-y-24">
            <div className="flex items-center justify-center lg:w-4/6 md:w-8/12 flex-col space-y-4 md:space-y-7 md:text-xl text-center mx-auto">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-nunito font-extrabold text-center">All Contests</h1>
                <p>All the contests are ready to go for you now, lets dive</p>
            </div>
            {
                    isLoading ?
                        <div className="flex items-center justify-center">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:gap-8 lg:gap-10">
                                {
                                    Array(9).fill().map((_, index) => {
                                        return <CardLoadingSkeleton key={index} />
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div className="flex items-center justify-center">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:gap-8 lg:gap-10">
                                {
                                    data.map((contest) => {
                                        return <ContestCard key={contest._id} contest={contest} />
                                    })
                                }
                            </div>
                        </div>
                }
        </div>
    );
};

export default AllContests;