import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Plus, Target } from 'lucide-react';

// Mock inventory data
const MOCK_INVENTORY = [
  {
    id: '1',
    name: 'Spaniel Bowl',
    stock: 5,
    threshold: 2,
    leadTime: 21,
    status: 'healthy',
    showsOnly: false,
  },
  {
    id: '2',
    name: 'Tumbler - Sage',
    stock: 3,
    threshold: 3,
    leadTime: 21,
    status: 'low',
    showsOnly: false,
  },
  {
    id: '3',
    name: 'Matcha Bowl',
    stock: 8,
    threshold: 3,
    leadTime: 21,
    status: 'healthy',
    showsOnly: false,
  },
  {
    id: '4',
    name: 'Mushroom Dish',
    stock: 4,
    threshold: 2,
    leadTime: 21,
    status: 'healthy',
    showsOnly: true,
  },
  {
    id: '5',
    name: 'Ring Dish - Blush',
    stock: 1,
    threshold: 3,
    leadTime: 21,
    status: 'critical',
    showsOnly: false,
  },
];

type FilterType = 'all' | 'low' | 'shows';

export default function Inventory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-critical';
      case 'low':
        return 'bg-warn';
      default:
        return 'bg-green-500';
    }
  };

  const filteredInventory = MOCK_INVENTORY.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'low' && (item.status === 'low' || item.status === 'critical')) ||
      (filter === 'shows' && item.showsOnly);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pb-24 max-w-[430px] mx-auto bg-[#E5F0F0]">
      {/* Header */}
      <div className="bg-teal text-white px-6 py-8 rounded-b-3xl">
        <h1 className="mb-6" style={{fontFamily: "'DM Serif Display', serif"}}>Inventory</h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-dark" size={20} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-900 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-light"
          />
        </div>
      </div>

      <div className="px-6">
        {/* Filter chips */}
        <div className="flex gap-2 mt-6 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === 'all'
                ? 'bg-teal text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === 'low'
                ? 'bg-warn text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Low Stock
          </button>
          <button
            onClick={() => setFilter('shows')}
            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-1 ${
              filter === 'shows'
                ? 'bg-teal text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Target size={16} />
            Shows
          </button>
        </div>

        {/* Inventory list */}
        <div className="space-y-3 mb-6">
          {filteredInventory.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/inventory/${item.id}`)}
              className="w-full bg-white border border-gray-200 rounded-xl p-4 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                {/* Status dot */}
                <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>

                {/* Item info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base">{item.name}</h3>
                    {item.showsOnly && (
                      <span className="bg-teal-light text-teal text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Target size={12} />
                        Shows
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Stock: {item.stock}</span>
                    <span>•</span>
                    <span>Alert at: {item.threshold}</span>
                    <span>•</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {item.leadTime}d lead
                    </span>
                  </div>
                </div>

                {/* Stock count */}
                <div className="text-right">
                  <p className="text-2xl">{item.stock}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No items found</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/add-item')}
        className="fixed right-6 bottom-24 bg-teal text-white p-4 rounded-full shadow-lg transition-colors"
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>
    </div>
  );
}
