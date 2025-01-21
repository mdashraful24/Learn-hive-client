import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import 'swiper/css/navigation';
import '@smastrom/react-rating/style.css';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            });
    }, []);

    return (
        <div className="mt-16 mb-32">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">What Our Users Say</h2>

            <Swiper
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map(review => (
                        <SwiperSlide key={review._id} review={review}>
                            <div className="flex flex-col items-center text-center space-y-6">
                                {/* User Info */}
                                <div className="flex flex-col justify-center items-center space-y-3">
                                    {/* User Image */}
                                    <img
                                        className="w-24 h-24 object-cover rounded-full border-2 shadow-lg"
                                        src={review.image}
                                        alt={review.userName}
                                    />

                                    {/* User Name */}
                                    <h3 className="text-xl font-semibold text-gray-800">{review.userName}</h3>

                                    {/* Title */}
                                    <p className="font-medium text-gray-700">
                                        <strong>Title: </strong>{review.title}
                                    </p>

                                    {/* Quote and Description */}
                                    <div className="flex justify-center gap-1 text-center px-16">
                                        {/* Quote Icon */}
                                        <FontAwesomeIcon icon={faQuoteLeft} />
                                        {/* Description with responsive font size and overflow handling */}
                                        <p className="text-sm sm:text-base md:text-lg text-gray-600">
                                            {review.description}
                                        </p>
                                    </div>

                                    {/* Rating */}
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;
