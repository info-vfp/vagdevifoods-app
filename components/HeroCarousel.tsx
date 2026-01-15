import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CarouselImage {
    id: string | number;
    url: string;
    alt: string;
}

interface HeroCarouselProps {
    images: CarouselImage[];
    className?: string;
    imageClassName?: string;
}

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
    }),
};
const HeroCarousel: React.FC<HeroCarouselProps> = ({ images, className, imageClassName }) => {
    const [index, setIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const navigate = (direction: number) => {
        setIndex((prev) => {
            let next = prev + direction;
            // Handle wrapping
            if (next < 0) next = images.length - 1;
            if (next >= images.length) next = 0;
            return next;
        });
    };

    // Helper to calculate the "visual distance" from the center index
    // Returns roughly -1, 0, 1 for the visible items
    const getDistance = (itemIndex: number) => {
        // 1. Simple difference
        let diff = itemIndex - index;

        // 2. Adjust for wrapping to find shortest path
        const length = images.length;
        if (diff > length / 2) diff -= length;
        if (diff < -length / 2) diff += length;

        return diff;
    };

    return (
        <div className={`relative w-full flex items-center justify-center perspective-[1000px] ${className || "h-[280px] sm:h-[500px]"}`}>
            <div className="relative w-full h-full flex items-center justify-center">
                {images.map((image, idx) => {
                    const distance = getDistance(idx);

                    // Only render items close to the center to avoid clutter if list is huge
                    // (Though for <10 items, rendering all is fine and smoother)
                    // We define states for Center (0), Left (-1), Right (1), and Hidden (others)

                    let zIndex = 0;
                    let x = "0%";
                    let scale = 0.6;
                    let opacity = 0;
                    let rotateY = 0;
                    let blur = "4px";

                    if (distance === 0) {
                        // Center Item
                        zIndex = 20;
                        x = "0%";
                        scale = 1.1; // Make it pop
                        opacity = 1;
                        rotateY = 0;
                        blur = "0px";
                    } else if (distance === -1) {
                        // Left Item
                        zIndex = 10;
                        x = "-60%";
                        scale = 0.75;
                        opacity = 0.7;
                        rotateY = 15; // Slight turn inward
                        blur = "2px";
                    } else if (distance === 1) {
                        // Right Item
                        zIndex = 10;
                        x = "60%";
                        scale = 0.75;
                        opacity = 0.7;
                        rotateY = -15; // Slight turn inward
                        blur = "2px";
                    } else if (distance === -2) {
                        // Far Left (optional, for smoother transition)
                        zIndex = 5;
                        x = "-90%";
                        scale = 0.5;
                        opacity = 0.3;
                        blur = "5px";
                    } else if (distance === 2) {
                        // Far Right
                        zIndex = 5;
                        x = "90%";
                        scale = 0.5;
                        opacity = 0.3;
                        blur = "5px";
                    }
                    // Distance > 2 or < -2 are fundamentally hidden/behind

                    return (
                        <motion.div
                            key={image.id}
                            className="absolute top-0 bottom-0 flex items-center justify-center w-full max-w-[200px] sm:max-w-[300px]"
                            animate={{
                                x,
                                scale,
                                opacity,
                                zIndex,
                                rotateY,
                                filter: `blur(${blur})`
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                mass: 0.8
                            }}
                            onClick={() => {
                                // If clicking a side item, navigate to it
                                if (distance !== 0) {
                                    const dir = distance > 0 ? 1 : -1;
                                    // Just jump to that index (simplest logic)
                                    setIndex(idx);
                                }
                            }}
                            style={{ cursor: distance === 0 ? 'default' : 'pointer', transformStyle: 'preserve-3d' }}
                            drag={distance === 0 ? "x" : false} // Only drag center
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipeConfidenceThreshold = 100; // lower threshold for ease
                                if (offset.x < -swipeConfidenceThreshold) {
                                    navigate(1);
                                } else if (offset.x > swipeConfidenceThreshold) {
                                    navigate(-1);
                                }
                            }}
                        >
                            {/* Product Image Container */}
                            <div className="relative w-full flex justify-center items-center">
                                {/* Optional: Add a subtle 'card' background if desired, but sticking to clean product look primarily */}
                                <div className="absolute inset-0 bg-white/5 rounded-full blur-xl transform scale-75 opacity-0"></div>

                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className={`w-auto object-contain drop-shadow-2xl select-none pointer-events-none ${imageClassName || "max-h-[220px] sm:max-h-[380px]"}`}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Arrows */}
            <button
                className="absolute left-0 sm:left-4 z-30 p-2 sm:p-3 bg-white/90 hover:bg-white backdrop-blur-md rounded-full text-brand-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border border-white/50"
                onClick={() => navigate(-1)}
            >
                <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
                className="absolute right-0 sm:right-4 z-30 p-2 sm:p-3 bg-white/90 hover:bg-white backdrop-blur-md rounded-full text-brand-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border border-white/50"
                onClick={() => navigate(1)}
            >
                <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-2 flex space-x-2 z-30">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === index
                            ? 'bg-brand-secondary w-6'
                            : 'bg-brand-primary/20 hover:bg-brand-secondary/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
