import Banner from "../../components/Banner";
import BestContestCreator from "../../components/BestContestCreator";
import ContestLeaderBoard from "../../components/ContestLeaderBoard";
import PopularContests from "../../components/PopularContests";


const Home = () => {

    return (
        <div className="container mx-auto md:my-16 lg:my-32 my-12 max-w-7xl w-11/12 md:space-y-24 space-y-16 lg:space-y-36">
            <Banner />
            <PopularContests />
            <ContestLeaderBoard />
            <BestContestCreator />
        </div>
    );
};

export default Home;