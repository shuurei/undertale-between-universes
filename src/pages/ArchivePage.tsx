import { useEffect, useMemo, useState } from 'react'
import { MdClose, MdImage, MdMovie, MdMusicNote, MdSearch } from 'react-icons/md'

import { cn } from '@/utils/cn'

type AssetType = 'image' | 'video' | 'audio'

interface Asset {
    id: string;
    name: string;
    category: string;
    src: string;
    type: AssetType;
}

const extensions = {
    image: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'],
    video: ['mp4', 'webm', 'mov'],
    audio: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac']
};

const files = Object.entries(import.meta.glob<string>('/public/assets/**/*.{png,jpg,jpeg,webp,gif,svg,mp4,webm,mov,mp3,wav,ogg,m4a,aac,flac}', {
    eager: true,
    query: '?url',
    import: 'default'
}));

const assets: Asset[] = files.map(([path, src]) => {
    const filename = path.split('/').pop() ?? 'Inconnu'
    const extension = filename.split('.').pop()?.toLowerCase() ?? ''

    const type: AssetType = extensions.video.includes(extension)
        ? 'video'
        : extensions.audio.includes(extension)
            ? 'audio'
            : 'image';

    return {
        id: path,
        name: filename.replace(/\.[^.]+$/, ''),
        category: path.split('/').at(-2) ?? 'Autres',
        src,
        type
    }
})

const filters = [
    { id: 'all', label: 'Tout', icon: MdSearch },
    { id: 'image', label: 'Images', icon: MdImage },
    { id: 'video', label: 'Vidéos', icon: MdMovie },
    { id: 'audio', label: 'Audios', icon: MdMusicNote }
] as const

const typeLabels: Record<AssetType, string> = {
    image: 'Image',
    video: 'Vidéo',
    audio: 'Audio'
}

export default function FilesPage() {
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    const filteredAssets = useMemo(() => {
        const query = search.trim().toLowerCase();

        return assets.filter((asset) => {
            const matchesType = selectedType === 'all' || asset.type === selectedType;
            const matchesCategory = selectedCategory === 'Tous' || asset.category === selectedCategory;
            const matchesSearch = asset.name.toLowerCase().includes(query) || asset.category.toLowerCase().includes(query);

            return matchesType && matchesCategory && matchesSearch;
        });
    }, [search, selectedType, selectedCategory]);

    const categories = useMemo(() => {
        return [...new Set(assets.filter((asset) => selectedType === 'all' || asset.type === selectedType).map((asset) => asset.category))];
    }, [selectedType]);

    const getTypeIcon = (type: AssetType) => {
        if (type === 'video') return <MdMovie size={28} />
        if (type === 'audio') return <MdMusicNote size={28} />
        return <MdImage size={28} />
    }

    useEffect(() => {
        document.body.style.overflow = selectedAsset ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [selectedAsset]);

    return (
        <main className='mx-auto min-h-screen w-full max-w-7xl px-4 py-10 text-white md:px-8'>
            <header className='mb-10 border-b border-white/10 pb-8'>
                <h1 className='text-4xl font-bold tracking-tight md:text-6xl'>
                    Archive<span className='text-accent'>.</span>
                </h1>

                <p className='mt-4 max-w-2xl text-sm leading-7 text-neutral-400 md:text-base'>
                    Les images, les effets sonores et musiques. Toutes les ressources se trouveront ici :D
                </p>

                <div className='mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-wider text-neutral-500 max-xs:justify-center'>
                    <span>
                        <strong className='mr-2 text-white'>
                            {assets.length.toString().padStart(2, '0')}
                        </strong>
                        Ressources
                    </span>
                    <span>
                        <strong className='mr-2 text-white'>
                            {assets.filter((asset) => asset.type === 'image').length}
                        </strong>
                        Images
                    </span>
                    <span>
                        <strong className='mr-2 text-white'>
                            {assets.filter((asset) => asset.type === 'video').length}
                        </strong>
                        Vidéos
                    </span>
                    <span>
                        <strong className='mr-2 text-white'>
                            {assets.filter((asset) => asset.type === 'audio').length}
                        </strong>
                        Audios
                    </span>
                </div>
            </header>

            <section className='mb-8 space-y-5 @container'>
                <div className='flex flex-col gap-4 md:flex-row'>
                    <label className='relative block flex-1'>
                        <MdSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500' size={20} />
                        <input
                            type='search'
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder='Rechercher une ressource..'
                            className='w-full border border-white/10 bg-white/03 py-3 pl-12 pr-4 text-sm outline-none transition-colors placeholder:text-neutral-600 focus:border-accent/60'
                        />
                    </label>

                    {categories.length > 1 && (
                        <select
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                            className='border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-neutral-300 outline-none focus:border-accent/60 cursor-pointer'
                        >
                            <option value='Tous'>Toutes les catégories</option>

                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className='flex flex-wrap gap-2'>
                    {filters.map((filter) => {
                        const active = selectedType === filter.id;
                        const Icon = filter.icon;

                        return (
                            <button
                                key={filter.id}
                                type='button'
                                onClick={() => {
                                    setSelectedType(filter.id);
                                    setSelectedCategory('Tous');
                                }}
                                aria-pressed={active}
                                className={cn(
                                    'flex items-center gap-2 border px-4 py-2.5 text-sm transition-colors cursor-pointer max-sm:w-full',
                                    active ? 'border-accent/50 bg-accent/10 text-accent' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'
                                )}
                            >
                                <Icon size={17} />
                                <span>{filter.label}</span>
                            </button>
                        )
                    })}
                </div>
            </section>

            <div className='mb-5 flex items-center justify-between border-b border-white/10 pb-3'>
                <h2 className='text-xs uppercase tracking-[0.2em] text-neutral-400'>
                    Bibliothèque
                </h2>
                <span className='text-xs text-neutral-500'>
                    {filteredAssets.length} résultat(s)
                </span>
            </div>

            {filteredAssets.length > 0 ? (
                <div className='grid gap-3 grid-cols-2 max-xs:grid-cols-1 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4'>
                    {filteredAssets.map((asset) => (
                        <button
                            key={asset.id}
                            type='button'
                            onClick={() => setSelectedAsset(asset)}
                            className='group min-w-0 overflow-hidden border border-white/10 bg-white/02 text-left transition-colors hover:border-accent/50 hover:bg-white/04 focus-visible:outline-2 focus-visible:outline-accent cursor-pointer'
                        >
                            <div className='relative flex aspect-square items-center justify-center overflow-hidden bg-neutral-900/80 p-3 sm:p-5'>
                                {asset.type === 'image' ? (
                                    <img
                                        src={asset.src}
                                        alt={asset.name}
                                        loading='lazy'
                                        className='relative z-10 max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105'
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                ) : (
                                    <div className='flex flex-col items-center gap-4 text-accent'>
                                        <div className='flex size-16 items-center justify-center border border-accent/20 bg-accent/5 sm:size-20'>
                                            {asset.type === 'video' ? <MdMovie size={36} /> : <MdMusicNote size={36} />}
                                        </div>
                                        <span className='text-xs uppercase tracking-widest text-neutral-500'>
                                            {asset.type === 'video' ? 'Fichier vidéo' : 'Fichier audio'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className='border-t border-white/10 p-3 sm:p-4'>
                                <h3 className='truncate text-xs font-semibold text-neutral-100 sm:text-sm'>
                                    {asset.name}
                                </h3>
                                <p className='mt-2 truncate text-xs uppercase tracking-wider text-neutral-500'>
                                    {asset.category}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className='border border-dashed border-white/10 px-6 py-20 text-center'>
                    <MdSearch size={32} className='mx-auto mb-4 text-neutral-600' />
                    <p className='text-sm text-neutral-400'>
                        Aucune ressource trouvée.
                    </p>
                    <button
                        type='button'
                        onClick={() => {
                            setSearch('')
                            setSelectedType('all')
                            setSelectedCategory('Tous')
                        }}
                        className='mt-4 text-xs text-accent hover:text-accent cursor-pointer'
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}

            {selectedAsset && (
                <div
                    className='fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-sm sm:p-6'
                    onClick={() => setSelectedAsset(null)}
                >
                    <section
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby='asset-preview-title'
                        className='flex max-sm:h-full sm:max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl'
                        onClick={(event) => event.stopPropagation()}
                    >
                        <header className='flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6'>
                            <div className='flex min-w-0 items-center gap-3'>
                                <span className='shrink-0 text-accent'>
                                    {getTypeIcon(selectedAsset.type)}
                                </span>
                                <div className='min-w-0'>
                                    <h2 className='truncate text-sm font-bold sm:text-base'>
                                        {selectedAsset.name}
                                    </h2>
                                    <p className='mt-1 text-xs uppercase tracking-wider text-neutral-500'>
                                        {typeLabels[selectedAsset.type]} / {selectedAsset.category}
                                    </p>
                                </div>
                            </div>

                            <button
                                type='button'
                                onClick={() => setSelectedAsset(null)}
                                aria-label="Fermer l'aperçu"
                                className='shrink-0 border border-white/10 p-2 text-neutral-400 hover:border-accent/50 cursor-pointer hover:bg-accent/30 hover:text-accent'
                            >
                                <MdClose size={20} />
                            </button>
                        </header>

                        <div className={cn(
                            'flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/30',
                            selectedAsset.type !== 'video' && 'p-4 sm:p-8'
                        )}>
                            {selectedAsset.type === 'image' && (
                                <img
                                    src={selectedAsset.src}
                                    alt={selectedAsset.name}
                                    className="max-h-[65vh] max-w-full object-contain"
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            )}

                            {selectedAsset.type === 'video' && (
                                <video
                                    key={selectedAsset.id}
                                    src={selectedAsset.src}
                                    controls
                                    autoPlay
                                    playsInline
                                    className='h-full w-full object-contain'
                                >
                                    Ton navigateur ne prend pas en charge cette vidéo :/
                                </video>
                            )}

                            {selectedAsset.type === 'audio' && (
                                <div className="w-full max-w-xl py-10 text-center">
                                    <div className="mx-auto mb-8 flex size-28 items-center justify-center border border-accent/20 bg-accent/5 text-accent">
                                        <MdMusicNote size={64} />
                                    </div>

                                    <p className='mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500'>
                                        Lecture audio
                                    </p>
                                    <h3 className='mb-8 text-xl font-semibold'>
                                        {selectedAsset.name}
                                    </h3>

                                    <audio
                                        key={selectedAsset.id}
                                        src={selectedAsset.src}
                                        controls
                                        autoPlay
                                        className='w-full' 
                                    >
                                        Ton navigateur ne prend pas en charge ce fichier audio :/
                                    </audio>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}
