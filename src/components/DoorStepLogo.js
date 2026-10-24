'use client';

export default function DoorStepLogo({ size = 32, dark = false }) {
  const navyColor = dark ? '#FFFFFF' : '#0A2558';
  const orangeColor = '#FF6B00';

  return (
    <div className="doorstep-brand-lockup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {/* SVG Icon matching the user's image: Navy D with Orange Location Pin and Navy o */}
      <svg
        height={size}
        viewBox="0 0 110 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', height: `${size}px`, width: 'auto' }}
        aria-label="Doorstep Service Logo"
      >
        {/* Navy Letter D */}
        <path
          d="M4 4H18C26 4 32 9 32 19C32 29 26 34 18 34H4V4Z"
          fill={navyColor}
        />
        <path
          d="M12 11H17C21 11 24 14 24 19C24 24 21 27 17 27H12V11Z"
          fill={dark ? '#0A2558' : '#FFFFFF'}
        />

        {/* Small connector dot between D and Pin */}
        <circle cx="34" cy="20" r="2.5" fill={navyColor} />

        {/* Orange Map Pin / Location Marker acting as letter 'o' */}
        <path
          d="M52 4C44.268 4 38 10.268 38 18C38 27.5 52 38 52 38C52 38 66 27.5 66 18C66 10.268 59.732 4 52 4Z"
          fill={orangeColor}
        />
        {/* White circle inside Orange pin */}
        <circle cx="52" cy="18" r="5.5" fill={dark ? '#06183B' : '#FFFFFF'} />

        {/* Second 'o' in Navy */}
        <circle cx="82" cy="19" r="14" fill={navyColor} />
        <circle cx="82" cy="19" r="6.5" fill={dark ? '#06183B' : '#FFFFFF'} />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span
          style={{
            fontSize: '15px',
            fontWeight: 900,
            color: navyColor,
            letterSpacing: '-0.02em',
          }}
        >
          DOORSTEP
        </span>
        <span
          style={{
            fontSize: '9.5px',
            fontWeight: 800,
            color: orangeColor,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          SERVICE
        </span>
      </div>
    </div>
  );
}
