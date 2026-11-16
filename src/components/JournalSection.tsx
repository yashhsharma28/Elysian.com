import React from 'react';
import { JOURNAL_ARTICLES } from '../data/content';
import { ArrowRight, Clock } from 'lucide-react';
import { AnimatedSection, AnimatedStaggerContainer, AnimatedStaggerItem, AnimatedImage } from './AnimatedSection';

export const JournalSection: React.FC = () => {
  return (
    <section id="section-journal" className="py-20 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-montserrat uppercase tracking-[0.3em] text-[#C8A24A]">
            Olfactory Gazette
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1F1F1F]">
            The Scent Journal
          </h2>
          <p className="font-inter text-sm text-[#666666] font-light">
            Insights on fragrance layering, botanical distillation, and finding your signature aura.
          </p>
        </AnimatedSection>

        {/* Articles Grid */}
        <AnimatedStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((art) => (
            <AnimatedStaggerItem key={art.id}>
              <article className="bg-white border border-[#E8E2D7] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#F8F6F2]">
                    <AnimatedImage
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      initialScale={0.82}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-montserrat uppercase font-bold text-[#C8A24A]">
                      <span>{art.category}</span>
                      <span className="text-gray-400 flex items-center gap-1 font-normal">
                        <Clock size={12} /> {art.readTime}
                      </span>
                    </div>

                    <h3 className="font-cormorant text-xl font-bold text-[#1F1F1F] group-hover:text-[#C8A24A] transition-colors">
                      {art.title}
                    </h3>

                    <p className="text-xs font-inter text-[#666666] leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-montserrat font-bold text-[#1F1F1F] border-t border-[#E8E2D7]/50 mt-4 pt-4">
                  <span className="text-[10px] uppercase text-gray-400 font-normal">{art.date}</span>
                  <span className="flex items-center gap-1 text-[#C8A24A] group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </span>
                </div>
              </article>
            </AnimatedStaggerItem>
          ))}
        </AnimatedStaggerContainer>

      </div>
    </section>
  );
};
