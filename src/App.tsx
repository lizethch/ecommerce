// App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import CategoryPage from './pages/CategoryPage';
import { ProductsProvider } from './components/ProductsProvider';
import { CartProvider } from './contexts/CartContext';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />

            {/* Category Routes */}
            <Route path="/category/men" element={<CategoryPage />} />
            <Route path="/category/men/:subCategory" element={<CategoryPage />} />

            <Route path="/category/women" element={<CategoryPage />} />
            <Route path="/category/women/:subCategory" element={<CategoryPage />} />

            <Route path="/category/electronics" element={<CategoryPage />} />
            <Route path="/category/electronics/:subCategory" element={<CategoryPage />} />

            <Route path="/category/jewelery" element={<CategoryPage />} />
            <Route path="/category/jewelery/:subCategory" element={<CategoryPage />} />

            {/* Additional Routes */}
            <Route path="/shop" element={<CategoryPage />} />
            <Route path="/sale" element={<CategoryPage />} />
            <Route path="/new-arrivals" element={<CategoryPage />} />
          </Routes>
        </div>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
