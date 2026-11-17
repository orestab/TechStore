# 🛒 TechStore — Сучасний E-Commerce Маркетплейс

> Багатофункціональний інтернет-магазин техніки з високою продуктивністю, створений на React, Vite та Tailwind CSS v4. Проєкт має сучасний дизайн у стилі темного скла (dark glassmorphism) та просунутий менеджмент глобального стану.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## ✨ Основні особливості

- **Каталог товарів:** Інтеграція з реальним API (DummyJSON) за категоріями (смартфони, ноутбуки, планшети, аксесуари).
- **Миттєвий пошук та фільтрація:** Оптимізація пошукового запиту за допомогою кастомного хука `useDebounce`, фільтрація за категоріями та сортування за допомогою `useMemo`.
- **Глобальний стейт-менеджмент:** Реалізовано через `Context API` та `useReducer` із синхронізацією з `LocalStorage` для кошика та списку обраного (Wishlist).
- **Багатосторінкова архітектура:** Динамічна маршрутизація на базі `React Router v6` (Головна, Сторінка товару, Кошик, Обране, сторінка 404).
- **Glassmorphism UI та анімації:** Преміальний мінімалістичний дизайн із ефектом матового скла (`backdrop-blur`) та пружинними анімаціями на `Framer Motion`.
- **Оформлення замовлення:** Інтерактивна форма з перевіркою введених даних та миттєвим сповіщенням про успішне замовлення.

---

## 🛠 Стек технологій

- **Бібліотека:** React (Functional Components, Hooks)
- **Роутинг:** React Router DOM v6
- **Стилізація:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Анімації:** Framer Motion
- **Іконки:** Lucide React
- **Дані:** DummyJSON REST API
- **Збірка:** Vite

---

## 📂 Структура проєкту

```text
src/
├── components/          # Повторювані UI-компоненти (Navbar, ProductCard, SkeletonCard)
├── context/             # Глобальний стан (ShopContext + useReducer)
├── hooks/               # Кастомні хуки (useDebounce)
├── pages/               # Сторінки додатку (HomePage, ProductPage, CartPage, WishlistPage)
├── App.jsx              # Кореневий компонент та налаштування роутів
└── main.jsx             # Точка входу в додаток
