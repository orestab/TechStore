import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Cpu } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const { totalItems, state } = useShop();

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/60 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-white group">
          <div className="p-2.5 bg-zinc-900/80 border border-white/10 rounded-2xl group-hover:border-indigo-500/40 transition-colors">
            <Cpu className="w-5 h-5 text-indigo-400" />
          </div>
          <span>Tech<span className="text-indigo-400">Store</span></span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            to="/wishlist"
            className="relative p-3 text-zinc-400 hover:text-white bg-zinc-900/40 hover:bg-zinc-900/80 border border-white/5 hover:border-white/15 rounded-2xl transition-all"
            title="Обране"
          >
            <Heart className="w-4 h-4" />
            {state.wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500/90 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg shadow-rose-500/30">
                {state.wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2.5 bg-zinc-900/50 hover:bg-zinc-900/90 border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all shadow-lg"
          >
            <ShoppingCart className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Кошик</span>
            {totalItems > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md shadow-indigo-600/30">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}