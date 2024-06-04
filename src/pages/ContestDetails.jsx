import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import useAxiosCommon from "../hooks/useAxiosCommon";

const ContestDetails = () => {

    const { id } = useParams()

    const axiosCommon = useAxiosCommon()

    const { data, isLoading } = useQuery({
        queryKey: ['contestDetails', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/contest-details/${id}`)
            return data
        }
    })

    // const {name, description, image, participants} = data

    // console.log(data)


    return (
        <div className="container mx-auto md:my-16 lg:my-24 my-12 max-w-7xl w-11/12 md:space-y-24 space-y-16 lg:space-y-24 glass rounded-3xl">
            {
                isLoading ?
                    <div className="card lg:card-side bg-base-100 shadow-xl lg:p-10 rounded-3xl p-4 md:p-7">
                        <div className="skeleton lg:w-96 h-72" alt="Album" />
                        <div className="card-body space-y-5">
                            <div className="h-12 w-full skeleton"></div>
                            <p className="h-20 w-full skeleton"></p>
                            <div className="card-actions justify-end">
                                <div className="h-12 w-20 skeleton"></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="card lg:card-side bg-base-100 shadow-xl lg:p-10 rounded-3xl p-4 md:p-7 glass">
                        <figure className="shadow-2xl"><img src={data.image} className="rounded-3xl" alt="Album" /></figure>
                        <div className="card-body p-4 md:p-7 space-y-5 mt-4">
                            <h2 className="card-title">{data.name}</h2>
                            <p>{data.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn glass rounded-full bg-base-300" onClick={() => window.history.back()}><IoMdArrowBack /> Go Back</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default ContestDetails;