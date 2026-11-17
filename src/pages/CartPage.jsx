import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartPage() {
  const { state, dispatch, totalPrice } = useShop();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    setIsOrdered(true);
    dispatch({ type: 'CLEAR_CART' });
  };

  if (isOrdered) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4 bg-zinc-900/30 backdrop-blur-2xl border border-white/10 rounded-3xl mt-16 shadow-2xl">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Замовлення оформлено!</h2>
        <p className="text-sm text-zinc-400">
          Дякуємо, {customerName}! Менеджер звʼяжеться з вами за номером {customerPhone}.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all shadow-lg"
        >
          Повернутися до покупок
        </Link>
      </div>
    );
  }

  if (state.cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4 bg-zinc-900/30 backdrop-blur-2xl border border-white/10 rounded-3xl mt-16 shadow-2xl">
        <ShoppingBag className="w-16 h-16 text-zinc-600 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Кошик порожній</h2>
        <p className="text-sm text-zinc-400">Додайте товари з каталогу, щоб зробити замовлення.</p>
        <Link
          to="/"
          className="inline-block mt-4 bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all shadow-lg"
        >
          Перейти до каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold mb-8 text-white">Оформлення замовлення</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список товарів */}
        <div className="lg:col-span-2 space-y-4">
          {state.cart.map(item => (
            <div
              key={item.id}
              className="bg-zinc-900/30 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-4 flex items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-zinc-950/60 border border-white/5 rounded-2xl p-2 flex items-center justify-center shrink-0">
                  <img src={item.thumbnail} alt={item.title} className="max-h-full object-contain" />
                </div>
                <div>
                  <Link to={`/product/${item.id}`} className="font-semibold text-sm text-zinc-200 hover:text-white transition-colors">
                    {item.title}
                  </Link>
                  <div className="text-xs text-zinc-400 mt-1">${item.price} / шт.</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-zinc-950/60 border border-white/10 rounded-2xl p-1">
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                    className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-semibold w-6 text-center text-white">{item.quantity}</span>
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                    className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                  className="p-2.5 text-zinc-500 hover:text-rose-400 bg-zinc-950/40 border border-white/5 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Форма замовлення */}
        <form onSubmit={handleCheckout} className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 h-fit space-y-5 shadow-2xl">
          <h2 className="font-bold text-base text-white">Дані отримувача</h2>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Ваше імʼя</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Орест"
                className="w-full bg-zinc-950/60 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Номер телефону</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+380 (99) 000-00-00"
                className="w-full bg-zinc-950/60 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <span className="text-zinc-400 text-sm">До сплати:</span>
            <span className="text-2xl font-extrabold text-white">${totalPrice.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-800 hover:bg-zinc-700 border border-white/15 text-white py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-xl cursor-pointer"
          >
            Підтвердити замовлення
          </button>
        </form>
      </div>
    </div>
  );
}