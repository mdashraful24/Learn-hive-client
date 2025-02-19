import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
        <div className="flex space-x-1 text-blue-500">
            {Array.from({ length: totalStars }, (_, index) => {
                const starValue = index + 1;
                return (
                    <span key={index} className="text-xl">
                        {rating >= starValue ? (
                            <FaStar />
                        ) : rating >= starValue - 0.5 ? (
                            <FaStarHalfAlt />
                        ) : (
                            <FaRegStar />
                        )}
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;