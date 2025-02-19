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
            const res = await axiosPublic.get("/all-classes?limit=6");
            return res.data;
        },
    });

    if (isError) {
        return <div className="text-lg text-center mb-16">Error loading classes</div>;
    }

    return (
        <div className="container mx-auto px-2 md:px-3 lg:px-2.5">
            <div className="mb-10">
                <h2 className="text-2xl md:text-4xl text-center font-extrabold mb-5">Currently Popular Classes</h2>
                <p className="md:text-lg text-center lg:w-1/2 mx-auto">
                    Explore a range of skills to build and enhance your knowledge in modern technologies and creative fields. Master tools and techniques that help you develop expertise in various professional domains.
                </p>
            </div>

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
                className="mySwiper mb-16"
                breakpoints={{
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    640: { slidesPerView: 1, spaceBetween: 10 },
                }}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-72">
                        <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin"></div>
                    </div>
                ) : Array.isArray(classesData?.classes) && classesData.classes.length > 0 ? (
                    classesData.classes.map(classItem => (
                        <SwiperSlide key={classItem._id} className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-10">
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
                    <div className="text-center py-12">No classes available</div>
                )}
            </Swiper>
        </div>
    );
};

export default Highlight;
