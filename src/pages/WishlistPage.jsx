import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { state } = useShop();

  if (state.wishlist.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <Heart className="w-16 h-16 text-zinc-700 mx-auto" />
        <h2 className="text-2xl font-bold">Список обраного порожній</h2>
        <p className="text-sm text-zinc-400">Зберігайте товари, які сподобалися, натиснувши на сердечко.</p>
        <Link
          to="/"
          className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
        >
          До каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-8">Обрані товари ({state.wishlist.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {state.wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}