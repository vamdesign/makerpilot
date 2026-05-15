import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Plus, Minus, Camera } from 'lucide-react';
import { toast } from 'sonner';

export default function AddItem() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [stock, setStock] = useState(0);
  const [leadTime, setLeadTime] = useState(parseInt(localStorage.getItem('defaultLeadTime') || '21'));
  const [price, setPrice] = useState('');
  const [threshold, setThreshold] = useState(3);
  const [showsOnly, setShowsOnly] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - in real app would save to backend
    toast.success('Item added successfully!');
    navigate('/inventory');
  };

  return (
    <div className="min-h-screen pb-24 max-w-[430px] mx-auto bg-[#E5F0F0]">
      {/* Header */}
      <div className="bg-teal text-white px-6 py-6 rounded-b-3xl">
        <button
          onClick={() => navigate('/inventory')}
          className="flex items-center gap-2 mb-4 transition-opacity"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 style={{fontFamily: "'DM Serif Display', serif"}}>Add New Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-6 mt-6">
        {/* Photo upload */}
        <div className="mb-6">
          <label className="block mb-2">Item Photo</label>
          <button
            type="button"
            className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2/20 transition-colors"
          >
            <Camera size={32} className="text-gray-400" />
            <span className="text-sm text-gray-500">Tap to add photo</span>
          </button>
        </div>

        {/* Item name */}
        <div className="mb-5">
          <label htmlFor="itemName" className="block mb-2">
            Item Name *
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal"
            placeholder="e.g., Spaniel Bowl"
            required
          />
        </div>

        {/* Stock count */}
        <div className="mb-5">
          <label className="block mb-2">Starting Stock Count *</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStock(Math.max(0, stock - 1))}
              className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center transition-colors"
            >
              <Minus size={24} />
            </button>
            <div className="flex-1 bg-teal-light/30 border-2 border-teal rounded-xl py-3 text-center">
              <span className="text-3xl">{stock}</span>
            </div>
            <button
              type="button"
              onClick={() => setStock(stock + 1)}
              className="w-14 h-14 bg-teal text-white rounded-xl flex items-center justify-center transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Lead time */}
        <div className="mb-5">
          <label htmlFor="leadTime" className="block mb-2">
            Production Lead Time (days)
          </label>
          <input
            type="number"
            id="leadTime"
            value={leadTime}
            onChange={(e) => setLeadTime(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal"
            min="1"
          />
          <p className="text-xs text-gray-500 mt-1">From your onboarding settings</p>
        </div>

        {/* Alert threshold */}
        <div className="mb-5">
          <label htmlFor="threshold" className="block mb-2">
            Low Stock Alert Threshold
          </label>
          <input
            type="number"
            id="threshold"
            value={threshold}
            onChange={(e) => setThreshold(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal"
            min="1"
          />
          <p className="text-xs text-gray-500 mt-1">Alert when stock reaches this level</p>
        </div>

        {/* Optional: Price */}
        <div className="mb-5">
          <label htmlFor="price" className="block mb-2">
            Price (optional)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        {/* Shows only toggle */}
        <div className="mb-6 flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="text-sm">Shows Only</p>
            <p className="text-xs text-gray-500 mt-0.5">Only sold at craft shows/markets</p>
          </div>
          <button
            type="button"
            onClick={() => setShowsOnly(!showsOnly)}
            className={`w-14 h-8 rounded-full transition-colors relative ${
              showsOnly ? 'bg-teal' : 'bg-gray-300'
            }`}
            style={{ zIndex: 0 }}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                showsOnly ? 'translate-x-7' : 'translate-x-1'
              }`}
            ></div>
          </button>
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full bg-teal text-white py-4 rounded-xl transition-colors mb-6"
        >
          Save Item
        </button>
      </form>
    </div>
  );
}
