import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ContestCard = ({ contest }) => {

    // eslint-disable-next-line react/prop-types
    const { _id, name, description, image, participants } = contest

    return (
        <div className="card lg:w-96 glass shadow-lg">
            <figure><img src={image} alt="contest image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                {/* eslint-disable-next-line react/prop-types */}
                <p>{participants.length} participants</p>
                {/* eslint-disable-next-line react/prop-types */}
                <p>{description.substring(0, 80)}...</p>
                <div className="card-actions justify-start">
                    <Link to={`/contest-details/${_id}`} className="btn glass rounded-full">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;