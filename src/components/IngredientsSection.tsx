import React from 'react';
import { INGREDIENTS_SHOWCASE } from '../data/perfumes';
import { AnimatedSection, AnimatedStaggerContainer, AnimatedStaggerItem, AnimatedImage } from './AnimatedSection';

export const IngredientsSection: React.FC = () => {
  return (
    <section id="section-ingredients" className="py-20 bg-[#F4F1EA] border-y border-[#E8E2D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-montserrat uppercase tracking-[0.3em] text-[#C8A24A]">
            Artisanal Sourcing
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1F1F1F]">
            Rare & Precious Botanical Extraits
          </h2>
          <p className="font-inter text-sm text-[#666666] font-light">
            Sustainably harvested raw materials blended in small copper stills to ensure unrivaled sillage and skin affinity.
          </p>
        </AnimatedSection>

        {/* Grid of Ingredients */}
        <AnimatedStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENTS_SHOWCASE.map((ing, idx) => (
            <AnimatedStaggerItem key={idx}>
              <div className="bg-white border border-[#E8E2D7] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full">
                <div className="aspect-[4/3] overflow-hidden bg-[#F8F6F2]">
                  <AnimatedImage
                    src={ing.image}
                    alt={ing.name}
                    referrerPolicy="no-referrer"
                    initialScale={0.82}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-montserrat uppercase tracking-widest text-[#C8A24A] font-bold block">
                    {ing.region}
                  </span>
                  <h3 className="font-cormorant text-xl font-bold text-[#1F1F1F]">
                    {ing.name}
                  </h3>
                  <p className="text-xs font-inter text-[#666666] leading-relaxed">
                    {ing.description}
                  </p>
                </div>
              </div>
            </AnimatedStaggerItem>
          ))}
        </AnimatedStaggerContainer>

      </div>
    </section>
  );
};

