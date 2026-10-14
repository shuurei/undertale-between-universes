import { useCallback, useEffect, useState } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'

const accentColors = [
    '#ef4444',
    '#3b82f6',
    '#22c55e',
    '#eab308',
    '#a855f7'
] as const;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [accentIndex, setAccentIndex] = useState(0);

    const randomAccent = useCallback(() => {
        setAccentIndex((current) => (current + 1) % accentColors.length);
    }, []);

    const accent = accentColors[accentIndex];

    useEffect(() => {
        document.documentElement.style.setProperty('--color-accent', accent);
    }, [accent]);

    return (
        <ThemeContext.Provider value={{ accent, randomAccent }}>
            {children}
        </ThemeContext.Provider>
    );
}