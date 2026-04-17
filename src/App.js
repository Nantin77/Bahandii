import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import CartPage from './components/CartPage';

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <BrowserRouter>
            <Header cartCount={totalItems} />
            <Routes>
                {/* Главная страница (все товары) */}
                <Route path="/" element={<PostList AddToCart={addToCart} />} />
                
                {/* Страница конкретной категории */}
                <Route path="/category/:categoryName" element={<PostList AddToCart={addToCart} />} />
                
                <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;