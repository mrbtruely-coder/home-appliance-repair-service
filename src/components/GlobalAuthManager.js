'use client';
import { useState, useEffect } from 'react';
import AuthModal from '@/components/AuthModal';

export default function GlobalAuthManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('login');

  useEffect(() => {
    const handleOpen = (e) => {
      setMode(e.detail?.mode || 'login');
      setIsOpen(true);
    };
    window.addEventListener('open-auth-modal', handleOpen);
    return () => window.removeEventListener('open-auth-modal', handleOpen);
  }, []);

  return (
    <AuthModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      initialMode={mode}
    />
  );
}
