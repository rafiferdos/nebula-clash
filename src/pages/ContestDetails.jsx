import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useEffect, useState } from "react";

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

    const calculateTimeLeft = (deadline) => {
        if (!deadline) {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        }
      
        const difference = +new Date(deadline) - +new Date();
        let timeLeft = {};
      
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
      
        return timeLeft;
      };

      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(data?.deadline));

      useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(data?.deadline));
          }, 1000);
    
        return () => clearTimeout(timer);
      }, [data?.deadline]);

    // const {name, description, image, participants} = data

    // console.log(data)


    return (
        <div className="container mx-auto md:my-16 lg:my-24 my-12 max-w-7xl w-11/12 md:space-y-24 space-y-16 lg:space-y-24 glass rounded-3xl">
            {
                isLoading ?
                    <div className="card lg:card-side bg-base-100 shadow-xl lg:p-10 rounded-3xl p-4 md:p-7">
                        <div className="skeleton lg:w-96 h-72" alt="Album" />
                        <div className="card-body space-y-3 p-4 md:p-7 mt-4">
                            <div className="h-12 w-full skeleton"></div>
                            <div className="h-6 w-full skeleton"></div>
                            <div className="h-20 w-full skeleton"></div>
                            <div className="card-actions justify-start">
                                <div className="h-12 w-20 skeleton"></div>
                            </div>
                            <div className="card-actions justify-end">
                                <div className="h-12 w-20 skeleton"></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="card lg:card-side bg-base-100 shadow-xl lg:p-10 rounded-3xl p-4 md:p-7 glass">
                        <figure className="lg:max-w-xl"><img src={data.image} className="rounded-3xl" alt="Album" /></figure>
                        <div className="card-body p-4 md:p-7 space-y-5 mt-4">
                            <h2 className="card-title font-nunito text-2xl md:text-4xl lg:text-5xl">{data.name}</h2>
                            <p className="font-nunito font-bold">Participants: {data.participants.length}</p>
                            <p>{data.description}</p>
                            <p>Contest Prize: {data.prize} taka</p>
                                <h2 className="text-xl md:text-3xl lg:text-3xl">Time Remaining:</h2>
                            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                                <div className="flex flex-col">
                                    <span className="countdown font-mono text-xl md:text-5xl">
                                        <span style={{ "--value": timeLeft.days }}></span>
                                    </span>
                                    days
                                </div>
                                <div className="flex flex-col">
                                    <span className="countdown font-mono text-xl md:text-5xl">
                                        <span style={{ "--value": timeLeft.hours }}></span>
                                    </span>
                                    hours
                                </div>
                                <div className="flex flex-col">
                                    <span className="countdown font-mono text-xl md:text-5xl">
                                        <span style={{ "--value": timeLeft.minutes }}></span>
                                    </span>
                                    min
                                </div>
                                <div className="flex flex-col">
                                    <span className="countdown font-mono text-xl md:text-5xl">
                                        <span style={{ "--value": timeLeft.seconds }}></span>
                                    </span>
                                    sec
                                </div>
                            </div>
                            <div className="card-actions justify-start">
                                <Link to={`/contest-details/${id}/payment`} className="btn glass rounded-full bg-base-300">Register</Link>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn glass rounded-full bg-base-300" onClick={() => window.history.back()}><IoMdArrowBack /></button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default ContestDetails;