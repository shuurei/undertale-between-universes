import { NavLink } from 'react-router'
import { cn } from '@/utils/cn'

const timeline = [
    {
        date: '2020',
        title: 'La naissance du projet',
        description: 'Undertale Between Universes prend forme autour d’une idée, imaginer une aventure réunissant différents univers alternatifs d’Undertale, les premières idées, histoires et créations commencent à donner vie au projet'
    },
    {
        date: '2020 - 2022',
        title: 'Des univers prennent vie',
        description: "Pendant cette période, nous travaillons sur l'histoire, les personnages, les sprites, les sons et les différents éléments qui composent notre jeu, beaucoup d'idées sont développées pour construire notre propre aventure unique !"
    },
    {
        date: '2022',
        title: 'Une aventure mise en pause',
        description: "Pour des raisons personnelles, Sercate, le créateur du projet, ne souhaite plus poursuivre son développement, nous décidons alors d'arrêter le projet, malgré cette fin, les travaux réalisés au fil des années restent"
    },
    {
        date: '2026',
        title: 'Préserver notre travail',
        description: "Je décide de créer ce site pour rendre hommage à notre travail de 2020 à 2022, l'objectif n'est pas de relancer le jeu, mais de conserver une trace de cette aventure et de permettre à chacun de redécouvrir son histoire, ses ressources et ses créations !"
    }
] as const;

export default function HomePage() {
    return (
        <main className='mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16'>
            <header className='flex flex-col items-center gap-5 text-center'>
                <h1 className='text-4xl font-bold uppercase leading-tight md:text-6xl'>
                    <span>Undertale</span>
                    <span className='block text-accent'>
                        Between Universes
                    </span>
                </h1>

                <p className='max-w-2xl text-sm leading-7 text-neutral-400 md:text-base'>
                    Aujourd'hui le projet est une archive pour préserver son histoire, ses créations et les souvenirs qui l’accompagnent :D
                </p>

                <NavLink
                    to='/story'
                    className='mt-2 border border-accent/40 bg-accent/10 px-5 py-3 text-sm text-accent hover:bg-accent/20'
                >
                    Découvrir l'histoire
                </NavLink>
            </header>
            
            <section>
                <div className='mb-12 text-center'>
                    <span className='text-xs uppercase tracking-tight text-accent'>
                        Notre histoire
                    </span>

                    <h2 className='mt-2 text-2xl font-bold md:text-3xl'>
                        Une grosse aventure !
                    </h2>
                </div>

                <div className='relative'>
                    <div className='absolute bottom-0 left-3 top-0 w-px bg-white/30 md:left-1/2 md:-translate-x-1/2' />
                    <div className='flex flex-col gap-10 md:gap-14'>
                        {timeline.map((item, idx) => (
                            <article key={`${item.date}-${item.title}`} className='relative pl-10 md:grid md:grid-cols-2 md:gap-12 md:pl-0'>
                                <span className='absolute left-1.75 top-0 z-10 size-3 rounded-full border-2 border-accent bg-neutral-950 md:left-1/2 md:-translate-x-1/2' />
                                <div className={cn(
                                    'border border-white/10 bg-neutral-950/80 p-5 md:p-7',
                                    idx % 2
                                        ? 'md:col-start-2 md:row-start-1'
                                        : 'md:col-start-1 md:row-start-1 md:text-right'
                                )}>
                                    <h3 className='mt-3 text-xl font-bold'>
                                        {item.title}
                                    </h3>
                                    <p className='mt-4 text-sm leading-7 text-neutral-400'>
                                        {item.description}
                                    </p>
                                </div>

                                <div
                                    className={[
                                        'hidden items-center md:flex',
                                        idx % 2
                                            ? 'md:col-start-1 md:row-start-1 md:justify-end md:pr-4'
                                            : 'md:col-start-2 md:row-start-1 md:justify-start md:pl-4'
                                    ].join(' ')}
                                >
                                    <span className='text-4xl font-bold text-accent lg:text-6xl'>
                                        {item.date}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className='flex flex-col items-center gap-5 border border-white/10 bg-neutral-950 p-8 text-center md:p-12'>
                <h2 className='max-w-2xl text-2xl font-bold md:text-3xl'>
                    Une histoire terminée, mais jamais oubliée
                </h2>

                <p className='max-w-2xl text-sm leading-7 text-neutral-400'>
                    Undertale Between Universes appartient à une période de ma vie que j'ai beaucoup aimé. Cette archive est là pour en garder une trace et partager ce que nous avons construit ensemble :)
                </p>

                <div className='mt-4 flex flex-wrap justify-center gap-3'>
                    <NavLink to='/archive' className='border border-accent/40 bg-accent/10 px-5 py-3 text-sm text-accent hover:bg-accent/20'>
                        Explorer les archives
                    </NavLink>
                </div>
            </section>
        </main>
    );
}
