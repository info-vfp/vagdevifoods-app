import React, { useRef, useState } from 'react';
import Img from './Img';
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
    // In a right-to-left layout "next" sits on the left, so the swipe direction flips too.
    const rtl = document.documentElement.dir === 'rtl';
    go((dx < 0) !== rtl ? 1 : -1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const rtl = document.documentElement.dir === 'rtl';
    go((e.key === 'ArrowRight') !== rtl ? 1 : -1);
  };

  const slide = slides[index];
  // The photos either side of the current one, fetched ahead so a tap or swipe shows the next
  // frame at once instead of an empty box on a slow connection. They are rendered as hidden
  // <Img>s with the same `sizes` rather than preloaded by URL, so the browser picks the same
  // srcset candidate it will actually display — a phone warms the 400px file, not the 1600px.
  // They stay lazy like the visible slide, so nothing loads until the carousel nears view.
  const neighbours = slides.length > 1
    ? [...new Set([(index + 1) % slides.length, (index - 1 + slides.length) % slides.length])]
    : [];

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos from the mill floor"
      onKeyDown={onKeyDown}
    >
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative h-[320px] sm:h-[460px] lg:h-[560px] overflow-hidden bg-brand-cream border border-brand-line"
      >
        <Img
          key={slide.src}
          src={slide.src}
          alt={slide.caption}
          sizes="(min-width: 1024px) 1000px, 100vw"
          className="w-full h-full object-cover"
        />
        {neighbours.map((i) => (
          <Img
            key={slides[i].src}
            src={slides[i].src}
            alt=""
            aria-hidden="true"
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between gap-4">
          <p className="text-sm sm:text-base font-medium text-white leading-snug max-w-xl" aria-live="polite">{slide.caption}</p>
          <span className="flex-shrink-0 text-xs font-bold tracking-wider text-white/70">{index + 1} / {slides.length}</span>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="cursor-pointer absolute start-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-brand-dark flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronLeftIcon className="w-5 h-5 rtl:-scale-x-100" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="cursor-pointer absolute end-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-brand-dark flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronRightIcon className="w-5 h-5 rtl:-scale-x-100" aria-hidden="true" />
        </button>
      </div>

      {/* The visible dot stays small, but each button carries a 44px touch area around it.
          That is wider than the row can hold on a narrow phone, so it wraps rather than
          pushing the page sideways. */}
      <div className="flex flex-wrap justify-center mt-1">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            // The dot itself is 6px, but the hit area is a full 44px square — thumbs are
            // imprecise and these sit right next to each other.
            className="cursor-pointer group py-4 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
