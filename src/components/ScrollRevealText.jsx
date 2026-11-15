import React, { useState, useEffect, useRef } from 'react';

export default function ScrollRevealText({ text, className = '' }) {
  const words = text.split(' ');
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Start highlighting when top of element hits 85% from top of viewport
      // Complete when bottom of element hits 20% from top of viewport
      const start = windowH * 0.85;
      const end = windowH * 0.20;
      const total = rect.height + (start - end);
      const scrolled = start - rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const highlightedCount = Math.round(progress * words.length);

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        const highlighted = i < highlightedCount;
        return (
          <span
            key={i}
            className="inline transition-all duration-200"
            style={{
              color: highlighted ? '#1e293b' : '#94a3b8',
              opacity: highlighted ? 1 : 0.4,
              fontWeight: highlighted ? 500 : 400,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </p>
  );
}
