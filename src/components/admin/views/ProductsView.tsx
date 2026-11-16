import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Eye,
  Check,
  X,
  Sparkles,
  PackageCheck,
  AlertCircle,
  Image as ImageIcon,
  Tag
} from 'lucide-react';
import { PERFUMES_CATALOG } from '../../../data/perfumes';
import { PerfumeProduct } from '../../../types';

export const ProductsView: React.FC = () => {
  const [products, setProducts] = useState<PerfumeProduct[]>(PERFUMES_CATALOG);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<PerfumeProduct> | null>(null);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStock =
      selectedStockStatus === 'all' ||
      (selectedStockStatus === 'low' && (p.stockQuantity ?? 10) <= 5) ||
      (selectedStockStatus === 'in_stock' && (p.stockQuantity ?? 10) > 5);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleOpenAddModal = () => {
    setEditingProduct({
      id: `perf-${Date.now()}`,
      name: '',
      subtitle: '',
      category: 'signature',
      price: 899,
      originalPrice: 1299,
      description: '',
      concentration: '30% Extrait De Parfum',
      volume: '50ml / 1.7 fl. oz.',
      topNotes: ['Bergamot', 'Grapefruit'],
      heartNotes: ['Rose', 'Jasmine'],
      baseNotes: ['Amber', 'Musk', 'Oud'],
      rating: 4.9,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
      inStock: true,
      stockQuantity: 25,
      isBestSeller: false,
      isNewRelease: true
    });
    setIsModalOpen(true);
  };

  const handleEdit = (prod: PerfumeProduct) => {
    setEditingProduct({ ...prod });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this fragrance from the catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleDuplicate = (prod: PerfumeProduct) => {
    const newProd = {
      ...prod,
      id: `perf-${Date.now()}`,
      name: `${prod.name} (Copy)`
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name) return;

    setProducts((prev) => {
      const exists = prev.some((p) => p.id === editingProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === editingProduct.id ? (editingProduct as PerfumeProduct) : p));
      } else {
        return [editingProduct as PerfumeProduct, ...prev];
      }
    });

    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E8E2D7] p-6 rounded-[24px] shadow-sm">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
            Fragrance Catalog <span className="italic text-[#C8A24A]">Management</span>
          </h1>
          <p className="font-inter text-xs text-gray-500 font-light pt-1">
            Manage small-batch Extrait De Parfum SKUs, formulations, prices, and stock inventory.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", "elysian_catalog_export.json");
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="bg-[#F8F6F2] hover:bg-[#E8E2D7] text-[#1F1F1F] border border-[#E8E2D7] px-4 py-2.5 rounded-full text-xs font-montserrat uppercase font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download size={15} />
            <span>Export Catalog</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] border border-[#C8A24A] px-5 py-2.5 rounded-full text-xs font-montserrat uppercase font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Perfume</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-[#E8E2D7] p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, notes, or SKU..."
            className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-full pl-10 pr-4 py-2.5 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-montserrat uppercase font-bold text-gray-500">
            <Filter size={14} />
            <span>Filters:</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#F8F6F2] border border-[#E8E2D7] rounded-full px-3 py-2 text-xs font-montserrat font-bold text-[#1F1F1F] cursor-pointer focus:outline-none"
          >
            <option value="all">All Families</option>
            <option value="signature">Signature Oud</option>
            <option value="fresh">Fresh Citrus</option>
            <option value="floral">Floral Rose</option>
            <option value="gourmand">Gourmand Vanilla</option>
          </select>

          <select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value)}
            className="bg-[#F8F6F2] border border-[#E8E2D7] rounded-full px-3 py-2 text-xs font-montserrat font-bold text-[#1F1F1F] cursor-pointer focus:outline-none"
          >
            <option value="all">All Stock Levels</option>
            <option value="in_stock">In Stock (&gt;5)</option>
            <option value="low">Low Stock (≤5)</option>
          </select>
        </div>

      </div>

      {/* Product Data Table */}
      <div className="bg-white border border-[#E8E2D7] rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-inter">
            <thead className="bg-[#171717] text-[#C8A24A] font-montserrat uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price / Discount</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F1EA]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#F8F6F2] transition-colors">
                  
                  {/* Name & Thumbnail */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-[#E8E2D7]" />
                      <div>
                        <h4 className="font-montserrat text-xs font-bold text-[#1F1F1F]">{p.name}</h4>
                        <p className="text-[11px] text-gray-500">{p.subtitle}</p>
                        <span className="text-[10px] font-mono text-[#C8A24A] uppercase">{p.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 font-montserrat uppercase text-[11px] font-semibold text-gray-600">
                    {p.category}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-[#1F1F1F]">₹{p.price}</div>
                    {p.originalPrice && (
                      <div className="text-[10px] text-gray-400 line-through">₹{p.originalPrice}</div>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-montserrat uppercase font-bold ${
                        (p.stockQuantity ?? 10) <= 5
                          ? 'bg-red-100 text-red-600 border border-red-200'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {p.stockQuantity ?? 10} Units Left
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-4 font-bold text-[#1F1F1F]">
                    ★ {p.rating} ({p.reviewsCount})
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleDuplicate(p)}
                      className="p-2 text-gray-500 hover:text-[#C8A24A] hover:bg-[#F8F6F2] rounded-lg transition-all cursor-pointer"
                      title="Duplicate SKU"
                    >
                      <Copy size={15} />
                    </button>

                    <button
                      onClick={() => handleEdit(p)}
                      className="p-2 text-gray-500 hover:text-[#1F1F1F] hover:bg-[#F8F6F2] rounded-lg transition-all cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit size={15} />
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8E2D7] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8"
            >
              <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-4">
                <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                  {editingProduct.id && products.some(p => p.id === editingProduct.id) ? 'Edit Perfume SKU' : 'Add New Fragrance'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-black rounded-full cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveModal} className="space-y-4 text-xs font-inter">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-montserrat uppercase text-[10px] font-bold text-gray-500 block mb-1">
                      Perfume Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      placeholder="e.g. Midnight Amber"
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
                    />
                  </div>

                  <div>
                    <label className="font-montserrat uppercase text-[10px] font-bold text-gray-500 block mb-1">
                      Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={editingProduct.subtitle || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                      placeholder="e.g. Rare Cambodian Oud & Velvet Rose"
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-montserrat uppercase text-[10px] font-bold text-gray-500 block mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price || 899}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
                    />
                  </div>

                  <div>
                    <label className="font-montserrat uppercase text-[10px] font-bold text-gray-500 block mb-1">
                      MRP / Original Price (₹)
                    </label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice || 1299}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
                    />
                  </div>

                  <div>
                    <label className="font-montserrat uppercase text-[10px] font-bold text-gray-500 block mb-1">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingProduct.stockQuantity ?? 25}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stockQuantity: Number(e.target.value) })}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-montserrat uppercase text-[10px] font-bold text-gray-500 block mb-1">
                    Bottle Image URL
                  </label>
                  <input
                    type="text"
                    value={editingProduct.image || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
                  />
                </div>

                <div>
                  <label className="font-montserrat uppercase text-[10px] font-bold text-gray-500 block mb-1">
                    Fragrance Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    placeholder="Enter scent profile notes..."
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
                  />
                </div>

                <div className="pt-4 border-t border-[#F4F1EA] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-[#E8E2D7] font-montserrat uppercase text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#C8A24A] text-[#1F1F1F] font-montserrat uppercase text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer"
                  >
                    Save Perfume
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
