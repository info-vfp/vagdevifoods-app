import React, { useRef } from 'react';
import { motion, useInView, Variant } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    width = 'fit-content',
    delay = 0,
    duration = 0.5,
    direction = 'up',
    className = ''
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const getVariants = (): { hidden: Variant; visible: Variant } => {
        const distance = 50;
        let initialX = 0;
        let initialY = 0;

        switch (direction) {
            case 'up': initialY = distance; break;
            case 'down': initialY = -distance; break;
            case 'left': initialX = distance; break;
            case 'right': initialX = -distance; break;
            default: break;
        }

        return {
            hidden: { opacity: 0, x: initialX, y: initialY },
            visible: { opacity: 1, x: 0, y: 0 }
        };
    };

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration, delay, ease: "easeOut" }}
                className="h-full"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
