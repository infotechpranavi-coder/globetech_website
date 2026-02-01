import Link from 'next/link';

interface MediaStory {
    quote: string;
    publication: string;
    logo: string;
    link: string;
}

const STORIES: MediaStory[] = [
    {
        quote: "The incisive vision of Globe-Tech leadership has ensured Globe-Tech Automation to become one of the Most Valuable Brands of Automation Industry in India.",
        publication: "Forbes India",
        logo: "Forbes",
        link: "#"
    },
    {
        quote: "High Speed Doors from Globe-Tech Automation help industries increase profitability as they deliver sustained performance and require lower maintenance.",
        publication: "Fortune India",
        logo: "FORTUNE",
        link: "#"
    }
];

export default function MediaStories() {
    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="space-y-0">
                    {STORIES.map((story, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-start justify-between gap-8 py-6 sm:py-10 ${index !== STORIES.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                        >
                            {/* Quote Area */}
                            <div className="w-full md:w-3/5">
                                <blockquote className="text-sm sm:text-lg italic text-gray-500 font-medium leading-relaxed max-w-2xl">
                                    " {story.quote} "
                                </blockquote>
                            </div>

                            {/* Logo & Link Area */}
                            <div className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right">
                                <div className={`text-3xl sm:text-5xl font-black mb-2 tracking-tighter text-toshi-black ${story.logo === 'Forbes' ? 'font-serif italic' : 'font-sans'
                                    }`}>
                                    {story.logo}
                                    {story.logo === 'Forbes' && <span className="text-[10px] sm:text-xs font-sans uppercase align-top ml-1">India</span>}
                                    {story.logo === 'FORTUNE' && <span className="text-[10px] sm:text-xs font-sans uppercase align-top ml-1">India</span>}
                                </div>

                                <p className="text-xs sm:text-sm text-gray-400 mb-1">Read full story at</p>
                                <Link
                                    href={story.link}
                                    className="inline-flex items-center gap-2 text-globe-red font-bold hover:text-black transition-colors"
                                >
                                    Read Full Story
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
