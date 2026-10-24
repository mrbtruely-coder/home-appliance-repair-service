'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function FavoritesHeaderLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => {
      try {
        setCount(JSON.parse(localStorage.getItem('doorstep-favorites') || '[]').length);
      } catch {
        setCount(0);
      }
    };
    update();
    window.addEventListener('doorstep-favorites-change', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('doorstep-favorites-change', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return (
    <Link
      className="header-icon-link favorites-header-link"
      href="/favorites/"
      aria-label={`Saved favorites, ${count} items`}
      title="Saved Favorites"
    >
      <Heart size={18} fill={count > 0 ? '#EF4444' : 'none'} color={count > 0 ? '#EF4444' : 'currentColor'} />
      {count > 0 && <span className="cart-count" style={{ background: '#EF4444' }}>{count > 9 ? '9+' : count}</span>}
    </Link>
  );
}
