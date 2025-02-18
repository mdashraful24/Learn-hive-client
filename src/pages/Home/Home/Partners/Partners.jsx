import Marquee from "react-fast-marquee";
import img1 from '../../../../assets/partners/coursera.png';
import img2 from '../../../../assets/partners/duolingo.png';
import img3 from '../../../../assets/partners/khan-academy.png';
import img4 from '../../../../assets/partners/ph.jpeg';
import img5 from '../../../../assets/partners/w3school.png';
import img6 from '../../../../assets/partners/apna=collage.png';
import img7 from '../../../../assets/partners/physic-wallah.png';
import img8 from '../../../../assets/partners/learny-hive.jpeg';
import img9 from '../../../../assets/partners/merida-skill.jpg';
import img10 from '../../../../assets/partners/skill-vista.png';
import img11 from '../../../../assets/partners/learn-academy.png';
import img12 from '../../../../assets/partners/green-learn.jpg';

const Partners = () => {
    const partnerLogos = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

    return (
        <div className='container mx-auto mb-20 md:mb-28 px-2.5'>
            <h2 className="text-2xl md:text-4xl text-center font-extrabold mb-5">Our Partners</h2>
            <p className="md:text-lg text-center lg:w-2/3 mx-auto mb-10 px-3">
                We’re proud to collaborate with these exceptional organizations to make learning accessible, efficient, and impactful. Together, we’re creating a brighter future for all learners.
            </p>

            {/* Marquee for Partner Logos */}
            <Marquee pauseOnHover speed={50} gradient={true} gradientWidth={50}>
                {partnerLogos.map((logo, index) => (
                    <div key={index} className="mx-6 flex justify-center">
                        <img src={logo} alt={`Partner ${index + 1}`} className="h-16 md:h-20 lg:h-24 object-contain" />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Partners;
















// import img1 from '../../../../assets/partners/coursera.png'
// import img2 from '../../../../assets/partners/duolingo.png'
// import img3 from '../../../../assets/partners/khan-academy.png'
// import img4 from '../../../../assets/partners/ph.jpeg'
// import img5 from '../../../../assets/partners/w3school.png'
// import img6 from '../../../../assets/partners/apna=collage.png'
// import img7 from '../../../../assets/partners/physic-wallah.png'
// import img8 from '../../../../assets/partners/learny-hive.jpeg'

// const Partners = () => {
//     return (
//         <div className='container mx-auto mb-20 px-2.5'>
//             <h2 className="text-2xl md:text-4xl text-center font-extrabold mb-5">Our Partners</h2>
//             <p className="md:text-lg text-center lg:w-2/3 mx-auto mb-10 px-3">
//                 We’re proud to collaborate with these exceptional organizations to make learning accessible, efficient, and impactful. Together, we’re creating a brighter future for all learners.
//             </p>
//             <div>
//                 <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 border-2 p-5 lg:p-10 rounded-xl'>
//                     <img src={img1} alt="" />
//                     <img src={img2} alt="" />
//                     <img src={img3} alt="" />
//                     <img src={img4} alt="" />
//                     <img src={img5} alt="" />
//                     <img src={img6} alt="" />
//                     <img src={img7} alt="" />
//                     <img src={img8} alt="" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Partners;




// reserve (unique Style)
// import img1 from '../../../../assets/partners/coursera.png';
// import img2 from '../../../../assets/partners/duolingo.png';
// import img3 from '../../../../assets/partners/khan-academy.png';
// import img4 from '../../../../assets/partners/ph.jpeg';
// import img5 from '../../../../assets/partners/w3school.png';
// import img6 from '../../../../assets/partners/apna=collage.png';
// import img7 from '../../../../assets/partners/physic-wallah.png';
// import img8 from '../../../../assets/partners/learny-hive.jpeg';

// const partnersData = [
//     { id: 1, logo: img1, name: "Coursera", description: "Empowering learners with diverse online courses." },
//     { id: 2, logo: img2, name: "Duolingo", description: "Making language learning fun and accessible." },
//     { id: 3, logo: img3, name: "Khan Academy", description: "Providing free world-class education to everyone." },
//     { id: 4, logo: img4, name: "Programming Hero", description: "Provide an online programming course, for beginner-level Web Development." },
//     { id: 5, logo: img5, name: "W3Schools", description: "Delivering web development resources to all learners." },
//     { id: 6, logo: img6, name: "Apna College", description: "Training students for practical career skills." },
//     { id: 7, logo: img7, name: "Physics Wallah", description: "Simplifying complex concepts for students." },
//     { id: 8, logo: img8, name: "Learny Hive", description: "Help students with the essential last-minute exam preparation." },
// ];

// const Partners = () => {
//     return (
//         <div className="my-20 bg-gray-50 py-12">
//             <h2 className="text-center text-4xl font-extrabold mb-8 text-gray-800">Our Partners</h2>
//             <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
//                 We’re proud to collaborate with these exceptional organizations to make learning accessible, efficient, and impactful.
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-5 max-w-4xl mx-auto px-5 lg:px-0">
//                 {partnersData.map((partner) => (
//                     <div
//                         key={partner.id}
//                         className="relative group flex items-center justify-center h-24"
//                     >
//                         {/* Partner Logo */}
//                         <img
//                             src={partner.logo}
//                             alt={partner.name}
//                             className="w-20 h-20 object-contain group-hover:opacity-0 transition-opacity duration-300"
//                         />

//                         {/* Hover Card */}
//                         <div className="absolute top-0 left-0 w-full h-full bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
//                             <h3 className="text-lg font-semibold text-gray-800">{partner.name}</h3>
//                             <p className="text-sm text-gray-600">{partner.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Partners;
