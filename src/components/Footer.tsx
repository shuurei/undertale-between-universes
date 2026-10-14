
import Dog from '@/assets/dog.png'
import DogBark from '@/assets/dog-bark.png'

export default function Footer() {
    return (
        <footer className='w-full border-t border-neutral-800 bg-neutral-900 mt-12'>
            <div className='relative mx-auto flex min-h-20 max-w-7xl items-center justify-center px-6'>
                <div className='group absolute -top-16.5 left-6 size-16'>
                    <img
                        className='absolute inset-0 size-full group-hover:opacity-0'
                        src={Dog}
                        alt='Dog'
                    />

                    <img
                        className='absolute inset-0 size-full opacity-0 group-hover:opacity-100'
                        src={DogBark}
                        alt='Dog barking'
                    />
                </div>

                <p className='text-accent/50 text-xs text-center'>U!BETWEEN UNIVERSES © 2026. All rights reserved.</p>
            </div>
        </footer>
    );
}
