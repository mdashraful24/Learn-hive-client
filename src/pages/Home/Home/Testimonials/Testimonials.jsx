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
        <div className='my-20'>
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
                            <div className='flex flex-col items-center text-center space-y-4 mx-20'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <FontAwesomeIcon icon={faQuoteLeft} size="4x" color="" />
                                <div className='flex flex-col justify-center items-center space-y-2'>
                                    <img className='w-20' src={review.image} alt={review.name} />
                                    <p>{review.details}</p>
                                    <h3 className='text-2xl'>{review.name}</h3>
                                    <p>{review.description}</p>
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