import { createContext } from 'react'

type ThemeContextValue = {
    accent: string;
    randomAccent: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);