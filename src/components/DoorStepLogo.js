'use client';
import Image from 'next/image';

export default function DoorStepLogo({ size = 50, dark = false, className = '' }) {
  if (dark) {
    return (
      <div
        className={`doorstep-brand-lockup dark-badge ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          padding: '6px 14px',
          borderRadius: '12px',
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.22)',
          transition: 'all 0.2s ease',
        }}
      >
        <Image
          src="/logo.png"
          alt="Home Appliance Repair Services"
          width={180}
          height={180}
          className="brand-logo-img"
          style={{
            height: `${size}px`,
            width: 'auto',
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
      }}
    >
      <Image
        src="/logo.png"
        alt="Home Appliance Repair Services"
        width={180}
        height={180}
        className="brand-logo-img"
        style={{
          height: `${size}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
        priority
      />
    </div>
  );
}
