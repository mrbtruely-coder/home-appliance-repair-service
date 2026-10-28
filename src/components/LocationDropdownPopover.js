'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, CheckCircle2, ChevronRight, Navigation, Sparkles } from 'lucide-react';
import { AREAS, CITY } from '@/lib/site';

export default function LocationDropdownPopover({ isOpen, onClose }) {
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    try {
      setSelectedArea(localStorage.getItem('doorstep-area') || '');
    } catch {}
  }, []);

  const handleSelectArea = (areaName) => {
    try {
      localStorage.setItem('doorstep-area', areaName);
      setSelectedArea(areaName);
      window.dispatchEvent(new Event('doorstep-area-change'));
    } catch {}
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="location-popover-menu" role="menu">
      <div className="location-popover-header">
        <div>
          <span className="location-popover-eyebrow">
            <MapPin size={12} /> COVERED AREAS IN {CITY.toUpperCase()}
          </span>
          <h4>Select Service Area</h4>
        </div>
        {selectedArea && (
          <span className="current-area-badge">
            <CheckCircle2 size={12} /> Active: {selectedArea.split(' ')[0]}
          </span>
        )}
      </div>

      <div className="location-popover-list">
        {AREAS.map((area) => {
          const isCurrent = selectedArea === area.name;
          return (
            <div
              key={area.slug}
              className={`location-popover-item ${isCurrent ? 'selected' : ''}`}
              onClick={() => handleSelectArea(area.name)}
            >
              <div className="location-item-icon">
                <MapPin size={16} />
              </div>
              <div className="location-item-info">
                <div className="location-name-row">
                  <strong>{area.name}</strong>
                  {isCurrent && <span className="selected-pill">Selected</span>}
                </div>
                <small>{area.landmarks.join(', ')} & nearby</small>
              </div>
              <Link
                href={`/${area.slug}/`}
                className="location-view-link"
                title={`View ${area.name} details`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClose) onClose();
                }}
              >
                <ChevronRight size={15} />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="location-popover-footer">
        <span>
          <Sparkles size={13} color="#D97706" /> Doorstep repairs delivered in 90 mins
        </span>
        <Link
          href="/locations/"
          className="all-locations-link"
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          All locations →
        </Link>
      </div>
    </div>
  );
}
