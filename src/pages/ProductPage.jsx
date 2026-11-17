import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, Star, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useShop();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="h-96 bg-zinc-900 rounded-3xl" />
        <div className="space-y-4">
          <div className="h-8 bg-zinc-900 rounded w-3/4" />
          <div className="h-6 bg-zinc-900 rounded w-1/4" />
          <div className="h-24 bg-zinc-900 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20">Товар не знайдено</div>;

  const isWishlisted = state.wishlist.some(item => item.id === product.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад до каталогу</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Галерея зображень */}
        <div className="space-y-4">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl h-96 flex items-center justify-center p-8">
            <img src={selectedImage} alt={product.title} className="max-h-full object-contain" />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl bg-zinc-900 border p-2 shrink-0 cursor-pointer transition-all ${
                    selectedImage === img ? 'border-indigo-500' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Інформація про товар */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
              {product.brand || product.category}
            </span>
            <h1 className="text-3xl font-bold mt-1">{product.title}</h1>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1 text-amber-400 font-medium">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
              </div>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400">В наявності ({product.stock} шт.)</span>
            </div>
          </div>

          <div className="text-4xl font-extrabold text-white">${product.price}</div>

          <p className="text-zinc-400 text-sm leading-relaxed">{product.description}</p>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Додати в кошик</span>
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: product })}
              className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <Truck className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Безкоштовна доставка за 1-2 дні</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Офіційна гарантія 12 місяців</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}