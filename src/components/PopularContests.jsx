import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ScaleLoader from "react-spinners/ScaleLoader"

const PopularContests = () => {

    const axiosSecure = useAxiosSecure()

    const { data, error, isLoading } = useQuery({
        queryKey: ['popularContests'],
        queryFn: async () => {
            const {data} = await axiosSecure.get('/popular-contests')
            return data
        }
    
    })

    if (isLoading) {
        return <ScaleLoader color="#36d7b7" />
    }

    return (
        <>
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-2xl font-bold">Popular Contests</h1>
                    <p>Here are the popular contests by total participation count</p>
                </div>
                <div className="flex items-center justify-center">
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5">
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopularContests;