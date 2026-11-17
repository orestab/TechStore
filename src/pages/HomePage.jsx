import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  AlertCircle, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowDown,
  Cpu
} from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';

const CATEGORIES = [
  { id: 'all', label: 'Усі девайси' },
  { id: 'smartphones', label: 'Смартфони' },
  { id: 'laptops', label: 'Ноутбуки' },
  { id: 'tablets', label: 'Планшети' },
  { id: 'mobile-accessories', label: 'Аксесуари' },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const catalogRef = useRef(null);
  const debouncedSearch = useDebounce(searchQuery, 350);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const endpoints = [
          'https://dummyjson.com/products/category/smartphones',
          'https://dummyjson.com/products/category/laptops',
          'https://dummyjson.com/products/category/tablets',
          'https://dummyjson.com/products/category/mobile-accessories',
        ];
        const responses = await Promise.all(endpoints.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        const combined = data.flatMap(d => d.products);
        setProducts(combined);
      } catch (err) {
        setError('Не вдалося завантажити каталог товарів.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, debouncedSearch, sortBy]);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-16 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        {/* Нейтральні сірі свічення замість кольорових */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-zinc-300 border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>Флагманська колекція девайсів</span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              Технології в гармонії зі сріблястим склом.
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Добірка преміальних гаджетів з прозорою архітектурою та швидкою доставкою.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToCatalog}
                className="bg-zinc-100 hover:bg-white text-zinc-950 px-7 py-3.5 rounded-2xl font-semibold text-sm flex items-center gap-2.5 shadow-2xl transition-all cursor-pointer"
              >
                <span>Дивитись каталог</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </motion.button>

              <div className="flex items-center gap-6 px-5 py-3 rounded-2xl glass-card text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-zinc-300" />
                  <span>Швидка доставка</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-zinc-300" />
                  <span>Гарантія 12 міс.</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 hidden sm:flex justify-center"
          >
            <div className="relative w-full max-w-md animate-float">
              <div className="glass-card rounded-[32px] p-6 border border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">TechStore Pro</div>
                      <div className="text-[11px] text-zinc-400">Glass Edition</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-300 px-2.5 py-1 rounded-full">
                    ● В наявності
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-950/60 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                    <div className="text-2xl font-extrabold text-white">{products.length || '30+'}</div>
                    <div className="text-xs text-zinc-400 mt-1">Пристроїв</div>
                  </div>
                  <div className="bg-zinc-950/60 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                    <div className="text-2xl font-extrabold text-zinc-200">4.9 ★</div>
                    <div className="text-xs text-zinc-400 mt-1">Рейтинг</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CATALOG SECTION ================= */}
      <section ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        
        <div className="glass-card p-4 sm:p-5 rounded-3xl mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center backdrop-blur-2xl">
          
          <div className="flex gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive ? 'text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-zinc-100 rounded-xl shadow-lg"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Пошук моделі..."
                className="w-full bg-zinc-950/60 border border-white/10 focus:border-white/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="relative w-full sm:w-auto flex items-center">
              <SlidersHorizontal className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-zinc-950/60 border border-white/10 rounded-xl pl-10 pr-8 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-white/30 cursor-pointer appearance-none"
              >
                <option value="default" className="bg-zinc-950">Рекомендовані</option>
                <option value="price-asc" className="bg-zinc-950">Ціна: за зростанням</option>
                <option value="price-desc" className="bg-zinc-950">Ціна: за спаданням</option>
                <option value="rating" className="bg-zinc-950">Найвищий рейтинг</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl flex items-center gap-3 mb-8">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </AnimatePresence>
        </motion.div>

        {!isLoading && !error && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 glass-card rounded-3xl mt-6"
          >
            <p className="text-lg font-bold text-zinc-200">Нічого не знайдено</p>
            <p className="text-sm text-zinc-500 mt-1">Спробуйте змінити запит</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Скинути фільтри
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}