import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "../../../../assets/banner/banner1.jpg";
import img2 from "../../../../assets/banner/banner3.jpg";
// import img3 from "../../../../assets/banner/banner2.jpg";
import img4 from "../../../../assets/banner/banner4.jpg";
import img5 from "../../../../assets/banner/banner6.jpg";
import img6 from "../../../../assets/banner/banner7.png";
import img7 from "../../../../assets/banner/banner5.jpg";

const Banner = () => {
    return (
        <Carousel
            infiniteLoop
            useKeyboardArrows
            autoPlay
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            dynamicHeight={false}
            swipeable
            emulateTouch
            interval={3000}
            transitionTime={500}
            stopOnHover
            renderArrowPrev={(clickHandler) => (
                <button
                    className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10 hidden"
                    onClick={clickHandler}
                >
                    &lt;
                </button>
            )}
            renderArrowNext={(clickHandler) => (
                <button
                    className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10 hidden"
                    onClick={clickHandler}
                >
                    &gt;
                </button>
            )}
        >
            {[img1, img2, img4, img5, img6, img7].map((image, index) => (
                <div key={index} className="relative">
                    {/* Image */}
                    <img
                        className="w-full h-[250px] md:h-[500px] lg:h-[660px]"
                        src={image}
                        alt={`Slide ${index + 1}`}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
