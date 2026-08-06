import React, { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Horizontal travel (px) required before a touch counts as a swipe rather than a tap.
const SWIPE_THRESHOLD = 40;

export interface CarouselSlide {
  src: string;
  caption: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ slides, className = '' }) => {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  if (!slides.length) return null;

  const go = (dir: number) => {
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;

    // Ignore mostly-vertical gestures so the page can still be scrolled through the carousel.
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  };

  const slide = slides[index];

  return (
    <div className={`relative ${className}`}>
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative h-[320px] sm:h-[460px] lg:h-[560px] overflow-hidden bg-brand-cream border border-brand-line"
      >
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.caption}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between gap-4">
          <p className="text-sm sm:text-base font-medium text-white leading-snug max-w-xl">{slide.caption}</p>
          <span className="flex-shrink-0 text-xs font-bold tracking-wider text-white/70">{index + 1} / {slides.length}</span>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-brand-dark flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-brand-dark flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* The visible dot stays small, but each button carries a 44px touch area around it. */}
      <div className="flex justify-center mt-1">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            className="cursor-pointer group px-1.5 py-4 min-h-[44px] flex items-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-brand-secondary' : 'w-1.5 bg-brand-primary/20 group-hover:bg-brand-secondary/50'
                }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
