import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { state, dispatch } = useShop();
  const isWishlisted = state.wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group relative h-full glass-card glass-card-hover rounded-3xl p-4 flex flex-col justify-between overflow-hidden block"
      >
        <div>
          {/* Скляний контейнер зображення */}
          <div className="relative w-full h-52 bg-zinc-950/40 backdrop-blur-xl rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-5 border border-white/[0.04]">
            <motion.img
              whileHover={{ scale: 1.08, rotate: -1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src={product.thumbnail}
              alt={product.title}
              className="max-h-full object-contain drop-shadow-2xl"
              loading="lazy"
            />

            {product.discountPercentage > 5 && (
              <span className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-xl">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}

            <motion.button
              whileTap={{ scale: 0.75 }}
              whileHover={{ scale: 1.1 }}
              onClick={handleToggleWishlist}
              className={`absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-xl border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-zinc-950/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          <div className="flex items-center justify-between text-xs mb-2">
            <span className="uppercase tracking-widest font-semibold text-zinc-400 text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-zinc-900/60 border border-white/5 px-2 py-0.5 rounded-lg text-amber-400 font-medium">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-semibold text-sm text-zinc-200 line-clamp-1 group-hover:text-white transition-colors flex items-center justify-between gap-2">
            <span>{product.title}</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 transition-colors shrink-0" />
          </h3>
        </div>

        <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-white/[0.06]">
          <div>
            <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Ціна</span>
            <span className="text-lg font-bold text-white tracking-tight">${product.price}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleAddToCart}
            className="bg-zinc-800/80 hover:bg-zinc-700 border border-white/15 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>В кошик</span>
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
}