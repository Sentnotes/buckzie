import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function MorphingPillButton({
  label = 'Read More',
  onClick,
  className = '',
  color = 'black' // 'black' | 'red' | 'brand'
}) {
  const bgClass =
    color === 'red'
      ? 'bg-red-600 text-white'
      : color === 'brand'
      ? 'bg-brand-600 text-white'
      : 'bg-black text-white';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center cursor-pointer select-none active:scale-95 transition-transform duration-200 ${className}`}
    >
      {/* Left Pill with Label (keeps its rounded pill curve and stretches rightward to smoothly enter the circle on hover) */}
      <span
        className={`flex items-center justify-start h-12 sm:h-13 pl-6 sm:pl-7 pr-6 sm:pr-7 group-hover:pr-[76px] sm:group-hover:pr-[86px] rounded-full font-medium text-sm sm:text-base tracking-normal shadow-sm group-hover:shadow-md transition-all duration-300 ease-out ${bgClass}`}
      >
        <span className="whitespace-nowrap text-white shrink-0 font-medium">
          {label}
        </span>
      </span>

      {/* Separate Right Circle with Arrow (STATIONARY - stays in its exact visual position while the rounded pill enters it) */}
      <span
        className={`relative z-10 flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 ml-2 sm:ml-2.5 group-hover:-translate-x-[56px] sm:group-hover:-translate-x-[62px] rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 ease-out shrink-0 ${bgClass}`}
      >
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-out text-white" />
      </span>
    </button>
  );
}
