import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BannerResults = ({ searchTerm }) => {

    console.log("term: ", searchTerm)

    const axiosSecure = useAxiosSecure();

    const { data: results = [], isLoading, refetch } = useQuery({
        queryKey: "results",
        queryFn: async () => {
            const response = await axiosSecure.get(`/search-contests/${searchTerm}`);
            return response.data;
        },
    })



    return (
        <div className="max-w-7xl mx-auto container w-11/12 my-8 space-y-7">
            {
                results.length > 0 &&
                <h1 className="text-xl md:text-3xl text-center font-extrabold font-nunito">
                    Search Results
                </h1>
            }
            {
                isLoading &&
                <div className="flex h-24 items-center justify-center">
                    <div className="loading"></div>
                </div>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result) => (
                    <div key={result.id} className="bg-base-300/60 shadow-md p-4 rounded-3xl card">
                        <figure><img src={result.image} alt="" onError={(e) => { e.target.onerror = null; e.target.src = "https://i.ibb.co/t2gtXKw/noImg.png" }} referrerPolicy="no-referrer" /></figure>
                        <div className="card-body">

                            <h2 className="text-lg font-semibold">{result.name}</h2>
                            <p className="text-sm text-gray-500">{result.description}</p>
                            <Link to={`/contest-details/${result._id}`} className="btn glass">Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerResults;