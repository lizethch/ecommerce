//components/Banner.tsx
import { Link } from 'react-router-dom';
import bannerImage from '../assets/bannerImage.jpg';

const Banner = () => {
    return (
        <div className=" relative bg-blue-900 text-white py-20">
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: '0.6'
                }}
            />
            <div className="relative container mx-auto flex flex-col items-center justify-center">

                <h1 className="text-4xl font-bold mb-4">
                    Find Clothes That Matches Your Style
                </h1>
                <p className="text-lg mb-8">
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
                <Link
                    to="/shop"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg"
                >
                    Shop Now
                </Link>

            </div>
        </div>
    );
};

export default Banner;

