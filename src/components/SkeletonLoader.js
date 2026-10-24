export default function SkeletonLoader({ lines = 3 }) {
  return <div className="skeleton-card" aria-label="Loading content" aria-busy="true">
    <span className="skeleton-block skeleton-icon" />
    <span className="skeleton-block skeleton-title" />
    {Array.from({ length: lines }).map((_, i) => <span className={`skeleton-block skeleton-line ${i === lines - 1 ? 'skeleton-short' : ''}`} key={i} />)}
  </div>;
}
