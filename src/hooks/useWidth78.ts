'use client';
import { useState, useEffect } from 'react';

export function useWidth78() {
    const [width78, setWidth78] = useState<number>(0);

    const handleResize = () => {
        const currentWidth = window.innerWidth;
        setWidth78(currentWidth * 0.78);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width78;
}