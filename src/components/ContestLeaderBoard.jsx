import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../hooks/useAxiosCommon";

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
            <div className="flex flex-col gap-8">
                <div className="md:w-5/6 lg:w-4/6 mx-auto text-center space-y-4 font-extrabold font-nunito">
                    <h1 className="lg:text-5xl md:text-3xl text-2xl">Winner&apos;s Circle</h1>
                    <p className="opacity-60">Meet the talented individuals who have risen to the top and claimed victory in our contests. Their success stories will inspire you to join the competition and showcase your own skills</p>
                </div>

            </div>
        </>
    );
};

export default ContestLeaderBoard;