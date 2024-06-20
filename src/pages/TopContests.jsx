import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ContestCard from "../components/ContestCard";

const TopContests = () => {


    const axiosSecure = useAxiosSecure();
    const { data, isLoading } = useQuery({
        queryKey: "topContests",
        queryFn: async () => {
            const response = await axiosSecure.get("/popular-contests-no-limit");
            return response.data;
        },
    })

    console.log(data)

    return (
        <div className="my-16 w-11/12 max-w-7xl container mx-auto">

            <h1
                className="text-3xl md:text-5xl font-extrabold font-nunito text-center"
            >
                Top Contests
            </h1>
            <p className="text-center mt-5 mb-16">
                Top Contests by number of participants
            </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {
                        isLoading &&
                        <div className="flex h-24 items-center justify-center">
                            <div className="loading"></div>
                        </div>
                    }
                    {
                        data && data.map((contest) => (
                            <ContestCard key={contest._id} contest={contest} />
                        ))
                    }
                </div>

        </div>
    );
};

export default TopContests;