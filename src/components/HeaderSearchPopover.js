'use client';
import { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, X, Sparkles } from 'lucide-react';
import { SERVICES } from '@/lib/site';

export default function HeaderSearchPopover({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const serviceNames = useMemo(
    () => [
      'AC Service & Repair',
      'Refrigerator Repair',
      'Washing Machine Repair',
      'Oven & Microwave Repair',
      'Geyser Repair',
      'TV Repair',
    ],
    []
  );

  // Typewriter effect rotating through all service names
  useEffect(() => {
    if (!isOpen) return;

    const currentService = serviceNames[placeholderIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentService.length) {
        timer = setTimeout(() => {
          setDisplayText(currentService.substring(0, displayText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1600);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentService.substring(0, displayText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % serviceNames.length);
      }
    }

    return () => clearTimeout(timer);
  }, [isOpen, displayText, isDeleting, placeholderIndex, serviceNames]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
      setDisplayText('');
      setIsDeleting(false);
    }
  }, [isOpen]);

  // Click outside & Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        !e.target.closest('.header-search-toggle')
      ) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleDown);
    document.addEventListener('mousedown', handleDown);
    return () => {
      document.removeEventListener('keydown', handleDown);
      document.removeEventListener('mousedown', handleDown);
    };
  }, [isOpen, onClose]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICES.slice(0, 5);
    return SERVICES.filter((s) =>
      `${s.name} ${s.short} ${s.concerns.join(' ')} ${s.category}`
        .toLowerCase()
        .includes(q)
    ).slice(0, 6);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="header-search-popover-anchor">
      <div className="header-search-popover-card" ref={containerRef}>
        {/* Search Input Bar */}
        <div className="header-search-input-box">
          <Search size={18} className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-inner-input"
            placeholder={`Search ${displayText || 'services'}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="search-pill-shortcut">ESC</span>
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setQuery('')}
              aria-label="Clear text"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="header-search-results-list">
          <div className="search-section-header">
            <span>{query ? 'MATCHING SERVICES' : 'POPULAR REPAIRS'}</span>
            <small>₹299 inspection</small>
          </div>

          {matches.length > 0 ? (
            matches.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="header-search-item"
                onClick={onClose}
              >
                <div className="search-item-icon">
                  <Search size={15} />
                </div>
                <div className="search-item-text">
                  <strong>{service.name}</strong>
                  <small>{service.short}</small>
                </div>
                <div className="search-item-action">
                  <span>View</span>
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))
          ) : (
            <div className="search-no-results">
              <p>No services matched “{query}”</p>
              <small>Try searching for AC, Refrigerator, Geyser, TV or Washing Machine</small>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="header-search-footer">
          <span>
            <Sparkles size={13} color="#D97706" /> Instant Doorstep booking available
          </span>
          <Link href="/services/" onClick={onClose}>
            All services →
          </Link>
        </div>
      </div>
    </div>
  );
}
