import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ContestCard = ({ contest }) => {

    // eslint-disable-next-line react/prop-types
    const { _id, name, description, image, participants } = contest

    return (
        <div className="card lg:w-96 bg-base-200/40 hover:glass transition-all duration-500 hover:shadow-2xl ease-in-out shadow-lg group">
            <figure className="aspect-square"><img src={image} className="group-hover:scale-110 transition-all duration-700" alt="contest image object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://i.ibb.co/t2gtXKw/noImg.png" }} referrerPolicy="no-referrer"/></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                {/* eslint-disable-next-line react/prop-types */}
                <p>{participants.length} participants</p>
                {/* eslint-disable-next-line react/prop-types */}
                <p>{description.substring(0, 80)}...</p>
                <div className="card-actions justify-center">
                    <Link to={`/contest-details/${_id}`} className="btn glass rounded-full btn-block bg-base-300 font-extrabold">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;