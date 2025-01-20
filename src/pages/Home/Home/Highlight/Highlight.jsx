import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Autoplay, Pagination } from "swiper/modules";

const Highlight = () => {
    const axiosPublic = useAxiosPublic();

    const { data: classesData, isLoading, isError } = useQuery({
        queryKey: ["sixClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get("http://localhost:5000/all-classes?limit=6");
            return res.data;
        },
    });

    if (isLoading) {
        return <div>Loading classes...</div>;
    }

    if (isError) {
        return <div>Error loading classes</div>;
    }

    return (
        <section className="px-3 lg:px-0">
            <div className="mb-8">
                <h2 className="text-3xl text-center font-bold mb-3">Currently Popular Classes</h2>
                <p className="text-center lg:w-1/2 mx-auto">Explore a range of skills to build and enhance your knowledge in modern technologies and creative fields. Master tools and techniques that help you develop expertise in various professional domains.</p>
            </div>
            <Swiper
                // slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper mb-16"
                breakpoints={{
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                }}
            >
                {Array.isArray(classesData?.classes) ? (
                    classesData.classes.map((classItem, index) => (
                        <SwiperSlide key={index} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-10">
                            {/* Card Container */}
                            <div className="relative">
                                {/* Class Image */}
                                <img
                                    src={classItem.image || '/path/to/default-image.jpg'}
                                    alt={classItem.title}
                                    className="w-full h-72"
                                />
                                {/* Class Title */}
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-center">
                                    <h3 className="text-lg text-white font-semibold uppercase">{classItem.title}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <div>No classes available</div> // Handle the case if the data is not an array
                )}
            </Swiper>
        </section>
    );
};

export default Highlight;
