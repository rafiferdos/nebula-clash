import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Bounce, Fade } from "react-awesome-reveal";

const BestContestCreator = () => {

    const blankUser = 'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg'


    const axiosSecure = useAxiosSecure();
    const { data: bestContestCreators = [], isLoading, refetch } = useQuery({
        queryKey: "bestContestCreator",
        queryFn: async () => {
            const response = await axiosSecure.get("/best-creators");
            return response.data;
        },
    })


    return (
        <Fade>

            <div className="mx-auto max-w-7xl my-16 w-11/12">
                {/* show user in card */}
                <div className="flex items-center justify-center flex-col gap-8">
                    <h1
                        className="md:text-5xl text-2xl font-semibold text-center"
                    >
                        Best Contest Creator
                    </h1>
                    <p>
                        Here are the best contest creators of the platform. They have created the best contests and have the highest ratings
                    </p>
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Bounce>

                            {bestContestCreators.map((creator) => (
                                <div key={creator._id} className="hover:glass bg-base-100/50 p-8 shadow-2xl rounded-2xl flex flex-col gap-5 md:h-96 flex-grow">
                                    <img src={creator?.photo || blankUser} className="w-20 h-20 rounded-full mx-auto" />
                                    <h2 className="text-center text-lg md:text-3xl lg:text-4xl font-nunito font-extrabold mt-4">{creator?.name || 'no username'}</h2>
                                    <p className="my3 text-center">For contest on: <span className="font-extrabold">{creator.bestContest.name}</span></p>
                                    <p className="my3 text-center">Description: {creator.bestContest.description.substring(0,30)}...</p>
                                </div>
                            ))}
                            </Bounce>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default BestContestCreator;