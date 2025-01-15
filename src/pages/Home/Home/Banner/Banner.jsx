import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../../assets/home/img1.jpg';
import img2 from '../../../../assets/home/02.jpg';
import img3 from '../../../../assets/home/03.png';
import img4 from '../../../../assets/home/04.jpg';
import img5 from '../../../../assets/home/05.png';
import img6 from '../../../../assets/home/06.png';
// import './Banner.css';

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
            // Button Hidden
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
            <div>
                <img src={img1} alt="Slide 1" />
            </div>
            <div>
                <img src={img2} alt="Slide 2" />
            </div>
            <div>
                <img src={img3} alt="Slide 3" />
            </div>
            <div>
                <img src={img4} alt="Slide 4" />
            </div>
            <div>
                <img src={img5} alt="Slide 5" />
            </div>
            <div>
                <img src={img6} alt="Slide 6" />
            </div>
        </Carousel>
    );
};

export default Banner;