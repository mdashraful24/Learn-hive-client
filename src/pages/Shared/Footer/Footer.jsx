import logo from '../../../../src/assets/logo.png'

const Footer = () => {
    return (
        <div className="p-10 shadow-inner border-t -mt-14">
            <footer className="footer grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 max-w-5xl mx-auto">
                <footer className="container mx-auto text-base-content flex flex-col justify-center items-center">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="siteLogo" className="w-12" />
                        <h2 className="text-3xl font-extrabold">LearnHive</h2>
                    </div>
                    <p className="text-center">At LearnHive we help students with the essential study preparation they need to clear their exam and provide tutors with the performance they deserve.</p>
                </footer>

                {/* 1 nav */}
                <nav className='flex flex-col items-center'>
                    <h6 className="text-lg uppercase font-bold">Quick Links</h6>
                    <a className=" link link-hover text-base">Home</a>
                    <a className="link link-hover text-base">Blog</a>
                    <a className="link link-hover text-base">FAQs</a>
                    <a className="link link-hover text-base">Contact Us</a>
                </nav>
                {/* 2 nav */}
                <nav className='flex flex-col items-center'>
                    <h6 className="text-lg uppercase font-bold">Media</h6>
                    <a className="link link-hover text-base" href='https://www.facebook.com/ashraful.islam.ratul.455820?mibextid=ZbWKwL'
                        target="_blank">Facebook</a>
                    <a className="link link-hover text-base" href="https://x.com/?lang=en" target="_blank">Twitter</a>
                    <a className="link link-hover text-base" href="https://www.instagram.com/" target="_blank">Instagram</a>
                </nav>
            </footer>
            <p className="text-center pt-14">&copy; {new Date().getFullYear()} LearnHive. All rights reserved.</p>
            <p className="text-center">Designed, Developed and Maintained by PH Student</p>
        </div>
    );
};

export default Footer;