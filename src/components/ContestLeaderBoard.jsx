import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { Zoom } from "react-awesome-reveal";

const ContestLeaderBoard = () => {

    const axiosCommon = useAxiosCommon()

    const { data: winners, isLoading } = useQuery({
        queryKey: ['winners'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/winners');
            return data;
        },
    });

    return (
        <>
            <div className="flex flex-col gap-8 space-y-16">
                <div className="md:w-5/6 lg:w-4/6 mx-auto text-center space-y-4 font-extrabold font-nunito">
                    <h1 className="lg:text-5xl md:text-3xl text-2xl">Winner&apos;s Circle</h1>
                    <p className="opacity-60">Meet the talented individuals who have risen to the top and claimed victory in our contests. Their success stories will inspire you to join the competition and showcase your own skills</p>
                </div>
                <div className="flex items-center justify-center">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16">
                        <Zoom>
                            <div className="card lg:w-80 bg-base-100 shadow-xl glass">
                                <div className="avatar md:-m-10 mx-auto -mt-10">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjJr-wQifHPsfss13UWS-yljaFpLDHi7M1A&s" />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title">Rafi Ferdos</h2>
                                    <p>rafiferdos@gmail.com</p>
                                    <p>Won Contest: 3 times</p>
                                </div>
                            </div>

                        </Zoom>
                        <Zoom>
                            <div className="card w-96 bg-base-100 shadow-xl glass">
                                <div className="avatar -m-10">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src="https://media.licdn.com/dms/image/D4D03AQEDIK84SdwJZQ/profile-displayphoto-shrink_200_200/0/1676530624240?e=2147483647&v=beta&t=IPK6wIHneg2FrXRGoOQZX9wJkDa8HKL06rXzeKF8lAk" />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title">Sarah Tasnim</h2>
                                    <p>sarahtasnim99@gmail.com</p>
                                    <p>Won Contest: 5 times</p>
                                </div>
                            </div>
                        </Zoom>
                        <Zoom>


                            <div className="card w-96 bg-base-100 shadow-xl glass">
                                <div className="avatar -m-10">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src="https://i.natgeofe.com/k/5e4ea67e-2219-4de4-9240-2992faef0cb6/trump-portrait_2x3.jpg" />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title">Donald Trump</h2>
                                    <p>nuclearbomb@gmail.com</p>
                                    <p>Won Contest: 2 times</p>
                                </div>
                            </div>
                        </Zoom>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContestLeaderBoard;