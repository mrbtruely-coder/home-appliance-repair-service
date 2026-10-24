'use client';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function FavoriteButton({ service, iconOnly = false }) {
  const [isFav, setIsFav] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const updateFavState = () => {
      try {
        const favs = JSON.parse(localStorage.getItem('doorstep-favorites') || '[]');
        setIsFav(favs.some((item) => item.slug === service.slug));
      } catch {
        setIsFav(false);
      }
    };

    updateFavState();
    window.addEventListener('doorstep-favorites-change', updateFavState);
    window.addEventListener('storage', updateFavState);
    return () => {
      window.removeEventListener('doorstep-favorites-change', updateFavState);
      window.removeEventListener('storage', updateFavState);
    };
  }, [service.slug]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Require login
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (!user) {
      showToast('Please sign in or register to add services to your favorites.', 'info');
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
      return;
    }

    try {
      const favs = JSON.parse(localStorage.getItem('doorstep-favorites') || '[]');
      const exists = favs.some((item) => item.slug === service.slug);
      let updated;
      if (exists) {
        updated = favs.filter((item) => item.slug !== service.slug);
        setIsFav(false);
        showToast(`${service.name} removed from favorites`, 'info');
      } else {
        updated = [...favs, { slug: service.slug, name: service.name, addedAt: new Date().toISOString() }];
        setIsFav(true);
        showToast(`${service.name} added to favorites!`, 'success');
      }
      localStorage.setItem('doorstep-favorites', JSON.stringify(updated));
      window.dispatchEvent(new Event('doorstep-favorites-change'));
    } catch {}
  };

  return (
    <button
      type="button"
      className={`favorite-action-btn ${isFav ? 'is-favorited' : ''} ${iconOnly ? 'favorite-btn-icon-only' : ''}`}
      onClick={toggleFavorite}
      aria-label={isFav ? `Remove ${service.name} from favorites` : `Add ${service.name} to favorites`}
      title={isFav ? 'Favorited' : 'Add to favorites'}
    >
      <Heart size={16} fill={isFav ? '#EF4444' : 'none'} color={isFav ? '#EF4444' : '#64748B'} />
      {!iconOnly && <span>{isFav ? 'Saved' : 'Favorite'}</span>}
    </button>
  );
}
