import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
}

const DISTANCE = 50;

const OFFSET: Record<NonNullable<ScrollRevealProps['direction']>, [number, number]> = {
    up: [0, DISTANCE],
    down: [0, -DISTANCE],
    left: [DISTANCE, 0],
    right: [-DISTANCE, 0],
    none: [0, 0],
};

// useLayoutEffect has no meaning on the server and React warns about it there.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Fades a section in as it scrolls into view.
 *
 * Built on IntersectionObserver and a CSS transition rather than framer-motion. The library
 * was the single largest thing in the main bundle — around 60KB gzipped — and it was carried
 * on every page for this and one collapsing menu. Two transitions do not justify that on a
 * 3G phone.
 *
 * Two behaviours matter and are easy to break:
 *
 * 1. **Server render must be visible.** Without this the pre-rendered HTML would ship at
 *    `opacity: 0` and crawlers that read the markup but skip JS would find the page's real
 *    content hidden, defeating the point of pre-rendering. It also keeps the site readable if
 *    the JS never arrives.
 * 2. **No flash for content already on screen.** The decision to hide is taken in a layout
 *    effect, before the browser paints, and only for elements that start out of view — so the
 *    top of the page never blinks off and back on during hydration.
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    width = 'fit-content',
    delay = 0,
    duration = 0.5,
    direction = 'up',
    className = ''
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hidden, setHidden] = useState(false);

    useIsomorphicLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Already on screen at load: leave it alone rather than animating it in.
        const { top, bottom } = el.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) return;

        setHidden(true);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setHidden(false);
                observer.disconnect();
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const [x, y] = OFFSET[direction];

    return (
        <div
            ref={ref}
            className={className}
            style={{
                width,
                opacity: hidden ? 0 : 1,
                transform: hidden ? `translate(${x}px, ${y}px)` : 'none',
                transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
