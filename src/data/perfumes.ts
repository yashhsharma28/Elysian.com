import { PerfumeProduct } from '../types';
import { PERFUMES_MEN } from './perfumesMen';
import { PERFUMES_WOMEN } from './perfumesWomen';
import { PERFUMES_UNISEX } from './perfumesUnisex';

import ingredientsImg from '../assets/images/elysian_ingredients_1784787354595.jpg';

export { PERFUMES_MEN, PERFUMES_WOMEN, PERFUMES_UNISEX };

export const PERFUMES_CATALOG: PerfumeProduct[] = [
  ...PERFUMES_MEN,
  ...PERFUMES_WOMEN,
  ...PERFUMES_UNISEX
];

export const INGREDIENTS_SHOWCASE = [
  {
    name: 'Royal Assam Oud',
    region: 'Assam, India',
    profile: 'Deep, smoked resinous wood with sweet balsamic facets',
    image: ingredientsImg,
    description: 'Harvested from century-old Aquilaria trees, our wild Assam Oud provides an indelible, hypnotic base.'
  },
  {
    name: 'Mysore Sandalwood',
    region: 'Karnataka, India',
    profile: 'Creamy, velvety, buttery wood with subtle spice',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
    description: 'Ethically farmed pure Santalum album, offering unrivaled creaminess and comforting longevity.'
  },
  {
    name: 'French Damask Rose',
    region: 'Grasse, France',
    profile: 'Lush, honeyed, opulent dark floral bloom',
    image: 'https://images.unsplash.com/photo-1583445013765-46c20c4a6772?q=80&w=600&auto=format&fit=crop',
    description: 'Hand-picked at dawn in Grasse fields, giving our floral accords deep romantic brilliance.'
  },
  {
    name: 'Golden Saffron',
    region: 'Kashmir, India',
    profile: 'Warm metallic spice, bittersweet leather hue',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=600&auto=format&fit=crop',
    description: 'Pure red Kashmiri saffron threads that infuse our extrait blends with an intoxicating gold radiance.'
  }
];
