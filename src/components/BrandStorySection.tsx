import React from 'react';
import { BRAND_TIMELINE, BRAND_VALUES } from '../data/content';
import { Sparkles, ShieldCheck, Award, Feather, Truck } from 'lucide-react';
import ingredientsImg from '../assets/images/elysian_ingredients_1784787354595.jpg';
import { AnimatedSection, AnimatedStaggerContainer, AnimatedStaggerItem, AnimatedImage } from './AnimatedSection';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="section-story" className="py-20 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Story Header & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <AnimatedSection direction="left" className="lg:col-span-6 space-y-6">
            <span className="text-xs font-montserrat uppercase tracking-[0.3em] text-[#C8A24A]">
              Our Heritage & Craftsmanship
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1F1F1F] leading-tight">
              Democratizing <br />
              <span className="italic font-normal text-[#C8A24A]">Indian High Parfumerie.</span>
            </h2>
            <p className="font-inter text-sm text-[#666666] leading-relaxed font-light">
              Founded on the principle that haute fragrances should not be locked behind multi-thousand rupee price tags, ELYSIAN blends century-old Indian raw botanicals with modern French compounding techniques.
            </p>
            <p className="font-inter text-sm text-[#666666] leading-relaxed font-light">
              By removing expensive middleman distribution layers and excessive celebrity markups, every rupee spent goes directly into high concentration Extrait de Parfum oils.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#E8E2D7] p-4 rounded-xl shadow-sm">
                <span className="block font-cormorant text-3xl font-bold text-[#1F1F1F]">100%</span>
                <span className="text-[10px] font-montserrat uppercase text-[#666666] tracking-wider">Cruelty-Free & IFRA Safe</span>
              </div>
              <div className="bg-white border border-[#E8E2D7] p-4 rounded-xl shadow-sm">
                <span className="block font-cormorant text-3xl font-bold text-[#1F1F1F]">₹999</span>
                <span className="text-[10px] font-montserrat uppercase text-[#666666] tracking-wider">Strict Maximum Price</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8E2D7] shadow-xl">
              <AnimatedImage
                src={ingredientsImg}
                alt="ELYSIAN Heritage"
                referrerPolicy="no-referrer"
                initialScale={0.82}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>

        </div>

        {/* Timeline */}
        <AnimatedSection className="bg-white border border-[#E8E2D7] rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-montserrat uppercase tracking-[0.3em] text-[#C8A24A]">
              Chronicles
            </span>
            <h3 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
              The ELYSIAN Journey
            </h3>
          </div>

          <AnimatedStaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {BRAND_TIMELINE.map((item, idx) => (
              <AnimatedStaggerItem key={idx}>
                <div className="bg-[#F4F1EA] border border-[#E8E2D7] p-6 rounded-2xl space-y-2 relative h-full">
                  <span className="font-cormorant text-3xl font-bold text-[#C8A24A] block">
                    {item.year}
                  </span>
                  <h4 className="font-cormorant font-bold text-lg text-[#1F1F1F]">
                    {item.title}
                  </h4>
                  <p className="text-xs font-inter text-[#666666] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStaggerContainer>
        </AnimatedSection>

      </div>
    </section>
  );
};
