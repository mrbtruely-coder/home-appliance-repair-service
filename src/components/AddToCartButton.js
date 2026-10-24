'use client';
import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function AddToCartButton({ service, compact = false }) {
  const [added, setAdded] = useState(false);
  const { showToast } = useToast();

  const add = () => {
    // Require login
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (!user) {
      showToast('Please sign in or register to add services to cart.', 'info');
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
      return;
    }

    try {
      const current = JSON.parse(localStorage.getItem('doorstep-cart') || '[]');
      const exists = current.some((item) => item.slug === service.slug);
      const next = exists ? current : [...current, { slug: service.slug, addedAt: new Date().toISOString() }];
      localStorage.setItem('doorstep-cart', JSON.stringify(next));
      window.dispatchEvent(new Event('doorstep-cart-change'));
      
      setAdded(true);
      showToast(`${service.name} added to cart!`, 'success');
      
      window.setTimeout(() => setAdded(false), 1800);
    } catch {
      setAdded(false);
    }
  };

  return (
    <button
      type="button"
      className={`add-cart-button ${compact ? 'add-cart-button-compact' : ''}`}
      onClick={add}
      aria-label={`Add ${service.name} to cart`}
    >
      {added ? <Check size={15} /> : <ShoppingCart size={15} />}
      {added ? 'Added' : 'Add to cart'}
    </button>
  );
}
