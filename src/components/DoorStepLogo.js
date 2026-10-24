'use client';
import Image from 'next/image';

export default function DoorStepLogo({ size = 84, dark = false, className = '' }) {
  if (dark) {
    return (
      <div
        className={`doorstep-brand-lockup dark-badge ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '16px',
          boxShadow: '0 6px 22px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
      >
        <Image
          src="/logo.png"
          alt="Home Appliance Repair Services"
          width={280}
          height={280}
          className="brand-logo-img"
          style={{
            height: `${size}px`,
            width: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={`doorstep-brand-lockup ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Image
        src="/logo.png"
        alt="Home Appliance Repair Services"
        width={280}
        height={280}
        className="brand-logo-img"
        style={{
          height: `${size}px`,
          width: 'auto',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
        priority
      />
    </div>
  );
}
