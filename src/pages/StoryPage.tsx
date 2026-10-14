import { cn } from '@/utils/cn'
import { useState } from 'react'

import { FiFileText } from 'react-icons/fi'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'

interface SectionStory {
    title: string;
    content: string | string[];
}

interface Story {
    title?: string;
    description?: string;
    content?: string;
    sections: SectionStory[];
}

const storyModules = import.meta.glob<Story>('@/data/stories/*.json', {
    eager: true,
    import: 'default'
});

const stories = Object.entries(storyModules)
    .map(([path, story]) => ({
        ...story,
        id: Number(path.split('/')?.pop()?.slice(0, 2))
    }))
    .sort((a, b) => a.id - b.id);

export default function StoryPage() {
    const [activeStoryId, setActiveStoryId] = useState(stories[0]?.id ?? '');
    const [activeSectionId, setActiveSectionId] = useState<number | null>(null);

    const activeStory = stories.find((story) => story.id === activeStoryId);
    const activeSection = activeSectionId != null && activeStory?.sections[activeSectionId];
    const previousSection = activeSection && activeStory!.sections[activeSectionId - 1];
    const nextSection = activeSection && activeStory!.sections[activeSectionId + 1];

    const selectStory = (id: number) => {
        setActiveStoryId(id);
        setActiveSectionId(null);
    }

    return (
        <main className='mx-auto w-full max-w-7xl px-4 py-10 md:px-8'>
            <header className='mb-10'>
                <h1 className='text-4xl font-bold tracking-tight md:text-6xl'>
                    Histoire<span className='text-accent'>.</span>
                </h1>

                <p className='mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base'>
                    Ici ce trouve tout le lore des univers alternatifs et les lieux qui composent notre jeu !
                </p>
            </header>

            <div className='flex flex-col items-start gap-8 min-w-65 md:flex-row'>
                <aside className='w-full min-w-65 flex-1'>
                    <h2 className='mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500'>
                        <FiFileText size={15} />
                        Sommaire
                    </h2>

                    <div className='space-y-2'>
                        {stories.map((story, index) => (
                            <button
                                key={story.id}
                                onClick={() => selectStory(story.id)}
                                className={cn(
                                    'w-full border p-4 text-left cursor-pointer',
                                    activeStoryId === story.id ? 'border-accent/60 bg-accent/10' : 'border-white/10 hover:bg-white/5'
                                )}
                            >
                                <span className='mb-1 block font-mono text-xs text-zinc-500'>
                                    CHAPITRE {index + 1}
                                </span>

                                <span className='text-sm font-medium'>
                                    {story.title ?? story.id}
                                </span>
                            </button>
                        ))}
                    </div>
                </aside>

                <section className='min-w-0'>
                    <article className='flex flex-col border border-white/10 bg-white/2 p-6 md:p-10'>
                        {activeStory ? (
                            <>
                                <header className='mb-8 border-b border-white/10 pb-6'>
                                    <h2 className='text-3xl font-bold'>
                                        {activeStory.title}
                                    </h2>

                                    {activeStory.description && (
                                        <p className='mt-3 text-sm leading-7 text-zinc-400'>
                                            {activeStory.description}
                                        </p>
                                    )}
                                </header>

                                {!activeSection ? (
                                    <div className='flex items-center flex-col gap-2'>
                                        {activeStory.sections.length > 0 ? activeStory.sections.map((section, idx) => (
                                            <button
                                                key={idx}
                                                className='border w-full px-2 py-3 max-w-2xl hover:text-yellow-300 cursor-pointer'
                                                onClick={() => setActiveSectionId(idx)}
                                            >
                                                {section.title}
                                            </button>
                                        )) : (
                                            <p className='text-neutral-400 text-center'>Aucune sections disponible.. :/</p>
                                        )}
                                    </div>
                                ) : (
                                    <div className='flex flex-col @container'>
                                        <div className='flex flex-col gap-2'>
                                            <h2 className='text-2xl text-yellow-400'>{activeSection.title}</h2>
                                            <p className='text-sm leading-5.5 text-neutral-200 whitespace-pre-line'>{Array.isArray(activeSection.content) ? activeSection.content.join(' ') : activeSection.content}</p>
                                        </div>
                                        <div className={cn(
                                            'flex flex-col @md:flex-row gap-3 mt-6 *:border *:px-4 *:py-2 *:cursor-pointer *:hover:text-yellow-300',
                                            !previousSection && nextSection ? 'justify-end' : nextSection && !previousSection ? 'justify-start' : 'justify-between'
                                        )}>
                                            {previousSection && (
                                                <button className='relative flex items-center justify-center px-10 py-2' onClick={() => setActiveSectionId(activeSectionId - 1)}>
                                                    <MdOutlineKeyboardArrowLeft size={28} className='relative @max-md:absolute @max-md:left-3'/>
                                                    <span>{previousSection.title}</span>
                                                </button>
                                            )}
                                            {nextSection && (
                                                <button className='relative flex items-center justify-center px-10 py-2' onClick={() => setActiveSectionId(activeSectionId + 1)}>
                                                    <span>{nextSection.title}</span>
                                                    <MdOutlineKeyboardArrowRight size={28} className='relative @max-md:absolute @max-md:right-3'/>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className='text-zinc-500'>
                                Aucun chapitre disponible.. :/
                            </p>
                        )}
                    </article>
                </section>
            </div>
        </main>
    );
}
