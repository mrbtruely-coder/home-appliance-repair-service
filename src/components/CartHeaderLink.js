'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
export default function CartHeaderLink() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('doorstep-cart') || '[]');
        const favItems = JSON.parse(localStorage.getItem('doorstep-favorites') || '[]');
        // Combine unique slugs from cart and favorites
        const allSlugs = new Set([...cartItems.map(i => i.slug), ...favItems.map(i => i.slug)]);
        setCount(allSlugs.size);
      } catch {
        setCount(0);
      }
    };
    update();
    window.addEventListener('doorstep-cart-change', update);
    window.addEventListener('doorstep-favorites-change', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('doorstep-cart-change', update);
      window.removeEventListener('doorstep-favorites-change', update);
      window.removeEventListener('storage', update);
    };
  }, []);
  return (
    <Link
      className="header-icon-link cart-header-link"
      href="/cart/"
      aria-label={`Service cart & favorites, ${count} selected`}
      title="My Service Cart & Favorites"
    >
      <ShoppingCart size={18} />
      {count > 0 && <span className="cart-count">{count > 9 ? '9+' : count}</span>}
    </Link>
  );
}
