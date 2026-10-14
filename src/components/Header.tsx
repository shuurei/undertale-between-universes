import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'

import Logo from '@/assets/logo.png'
import FullHeart from '@/assets/heart-full.svg?react'

import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/utils/cn'

const links = [
    { label: "C'est quoi ?", path: '/' },
    { label: 'Histoire', path: '/story' },
    { label: 'Archive', path: '/archive' }
] as const;

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [flashKey, setFlashKey] = useState(0);
    const { randomAccent } = useTheme();

    const handleHeartClick = () => {
        setFlashKey((current) => current + 1);

        if (window.innerWidth < 768) {
            setIsOpen((previous) => !previous);

            if (!isOpen) {
                randomAccent();
            }
        } else {
            randomAccent();
        }
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen]);

    return (
        <header className='sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-900'>
            <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-6">
                <NavLink to='/' aria-label='Accueil'>
                    <img
                        src={Logo}
                        alt='Undertale Between Universes Logo'
                        className='max-h-8'
                    />
                </NavLink>

                <div className='hidden tems-center gap-6 md:flex'>
                    {links.map(({ label, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === '/'}
                            className={({ isActive }) => cn(
                                isActive ? 'text-accent' : 'text-neutral-400 hover:text-white'
                            )}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                <button
                    type='button'
                    onClick={handleHeartClick}
                    className={cn(
                        'relative z-60 flex h-12 w-12 cursor-pointer duration-75 items-center justify-center text-accent',
                        isOpen && 'rotate-90'
                    )}
                    aria-label="Changer la couleur du thème"
                >
                    <FullHeart
                        key={`desktop-${flashKey}`}
                        className='size-9 animate-heart-flash'
                    />
                </button>
            </nav>

            <div
                onClick={() => setIsOpen(false)}
                className={cn(
                    'fixed inset-0 top-20 z-40 bg-black/30 transition-opacity duration-300 md:hidden',
                    isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                )}
                aria-hidden='true'
            />

            <aside
                id='mobile-navigation'
                className={cn(
                    'fixed right-0 top-20 z-50 h-[calc(100dvh-5rem)] w-72 max-w-[85vw] border-l border-neutral-800 bg-neutral-900 transition-transform duration-300 ease-in-out md:hidden',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
                aria-hidden={!isOpen}
                inert={!isOpen}
            >
                <div className='flex flex-col px-6 py-5'>
                    <p className='mb-5 text-xs uppercase tracking-[0.3em] text-neutral-500'>
                        Navigation
                    </p>

                    {links.map(({ label, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === '/'}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => cn(
                                'flex items-center gap-4 border-b border-neutral-800 py-4 transition-colors',
                                isActive ? 'text-accent' : 'text-neutral-400 hover:text-white'
                            )}
                        >
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            </aside>
        </header>
    );
}