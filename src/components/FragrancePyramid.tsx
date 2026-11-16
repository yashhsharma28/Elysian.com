import React from 'react';
import { PerfumeProduct } from '../types';
import { Clock, ShieldAlert, Sparkles, Feather } from 'lucide-react';

interface FragrancePyramidProps {
  product: PerfumeProduct;
}

export const FragrancePyramid: React.FC<FragrancePyramidProps> = ({ product }) => {
  return (
    <div className="bg-[#F4F1EA] border border-[#E8E2D7] rounded-2xl p-6 md:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8E2D7] pb-4">
        <div>
          <span className="text-[10px] font-montserrat uppercase tracking-[0.25em] text-[#C8A24A] font-bold">
            Olfactory Pyramid & Architecture
          </span>
          <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
            The Fragrance Journey
          </h3>
        </div>
        <div className="flex items-center gap-2 bg-white border border-[#E8E2D7] px-3 py-1.5 rounded-full text-xs font-montserrat font-semibold text-[#1F1F1F]">
          <Clock size={14} className="text-[#C8A24A]" />
          <span>{product.longevity}</span>
        </div>
      </div>

      {/* Visual Pyramid Levels */}
      <div className="space-y-4">
        
        {/* Top Notes Level */}
        <div className="bg-white border border-[#E8E2D7] rounded-xl p-4 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#D8B36A]"></div>
          <div className="pl-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-montserrat uppercase tracking-wider font-bold text-[#C8A24A]">
                  Top Notes
                </span>
                <span className="text-[10px] font-inter text-gray-400">• First 15 - 30 Minutes</span>
              </div>
              <p className="text-sm font-cormorant font-bold text-[#1F1F1F] mt-1">
                {product.topNotes.join(' • ')}
              </p>
            </div>
            <span className="text-[11px] font-inter text-gray-500 bg-[#F4F1EA] px-3 py-1 rounded-full w-fit">
              Sparkling Opening Accord
            </span>
          </div>
        </div>

        {/* Heart Notes Level */}
        <div className="bg-white border border-[#E8E2D7] rounded-xl p-4 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#C8A24A]"></div>
          <div className="pl-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-montserrat uppercase tracking-wider font-bold text-[#C8A24A]">
                  Heart (Middle) Notes
                </span>
                <span className="text-[10px] font-inter text-gray-400">• 2 - 6 Hours</span>
              </div>
              <p className="text-sm font-cormorant font-bold text-[#1F1F1F] mt-1">
                {product.heartNotes.join(' • ')}
              </p>
            </div>
            <span className="text-[11px] font-inter text-gray-500 bg-[#F4F1EA] px-3 py-1 rounded-full w-fit">
              The True Signature Essence
            </span>
          </div>
        </div>

        {/* Base Notes Level */}
        <div className="bg-white border border-[#E8E2D7] rounded-xl p-4 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#1F1F1F]"></div>
          <div className="pl-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-montserrat uppercase tracking-wider font-bold text-[#1F1F1F]">
                  Base Notes
                </span>
                <span className="text-[10px] font-inter text-gray-400">• 6 - 18+ Hours Drydown</span>
              </div>
              <p className="text-sm font-cormorant font-bold text-[#1F1F1F] mt-1">
                {product.baseNotes.join(' • ')}
              </p>
            </div>
            <span className="text-[11px] font-inter text-gray-500 bg-[#F4F1EA] px-3 py-1 rounded-full w-fit">
              Resinous Warmth & Projection
            </span>
          </div>
        </div>

      </div>

      {/* Accord Percentage Bars */}
      <div className="pt-2">
        <h4 className="text-xs font-montserrat uppercase tracking-wider font-bold text-[#1F1F1F] mb-3">
          Main Accord Breakdown
        </h4>
        <div className="space-y-2.5">
          {product.accords.map((accord, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-inter font-medium text-[#1F1F1F]">
                <span>{accord.name}</span>
                <span>{accord.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-[#E8E2D7] rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-1000 rounded-full"
                  style={{
                    width: `${accord.percentage}%`,
                    backgroundColor: accord.color || '#C8A24A'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
