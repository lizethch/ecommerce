// pages/Home.tsx
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <ProductGrid />
            <Footer />
        </div>
    );
};

export default Home;
