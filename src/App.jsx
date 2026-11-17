import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route
                path="*"
                element={
                  <div className="text-center py-24 text-zinc-400">
                    <h1 className="text-4xl font-bold text-white mb-2">404</h1>
                    <p>Сторінку не знайдено</p>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}