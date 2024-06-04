import { useQuery } from "@tanstack/react-query";
import ContestCard from "./ContestCard";
import CardLoadingSkeleton from "./CardLoadingSkeleton";
import useAxiosCommon from "../hooks/useAxiosCommon";

const PopularContests = () => {

    const axiosCommon = useAxiosCommon()

    const { data, isLoading } = useQuery({
        queryKey: ['popularContests'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/popular-contests')
            return data
        }

    })

    return (
        <>
            <div className="flex flex-col gap-8 space-y-4">
                <div className="flex items-center flex-wrap justify-center flex-col space-y-4">
                    <h1 className="text-2xl text-center font-nunito md:text-4xl lg:text-6xl font-extrabold">Popular Contests</h1>
                    <p className="md:text-xl text-center">Here are the popular contests by total participation count</p>
                </div>
                {
                    isLoading ?
                        <div className="flex items-center justify-center">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:gap-8 lg:gap-10">
                                {
                                    Array(6).fill().map((_, index) => {
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
        </>
    );
};

export default PopularContests;