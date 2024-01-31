import React from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedBackground = () => {
    const styles = useSpring({
        from: { opacity: 0, transform: 'scale(0.8)' },
        to: { opacity: 1, transform: 'scale(1)' },
        config: { tension: 100, friction: 10 },
    });

    return (
        <animated.div
            style={{
            ...styles,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #4a148c, #880e4f)',
            // Add other background styles as needed
        }}
        >
        </animated.div>
    );
};

export default AnimatedBackground;