import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, Edit, TrendingDown, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock data
const MOCK_ITEM = {
  id: '5',
  name: 'Ring Dish - Blush',
  stock: 1,
  threshold: 3,
  leadTime: 21,
  avgSoldPerWeek: 2.5,
  daysOfCover: 2,
  price: 24.99,
  salesChannels: ['Etsy', 'Shows'],
  activity: [
    { date: '2026-04-25', type: 'sale', quantity: 1, location: 'Etsy' },
    { date: '2026-04-20', type: 'restock', quantity: 5 },
    { date: '2026-04-18', type: 'sale', quantity: 2, location: 'Craft Show' },
    { date: '2026-04-12', type: 'sale', quantity: 1, location: 'Etsy' },
  ],
};

export default function InventoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen pb-24 max-w-[430px] mx-auto bg-[#E5F0F0]">
      {/* Header */}
      <div className="bg-teal text-white px-6 py-6 rounded-b-3xl">
        <button
          onClick={() => navigate('/inventory')}
          className="flex items-center gap-2 mb-4 transition-opacity"
        >
          <ChevronLeft size={20} />
          <span>Back to Inventory</span>
        </button>

        {/* Item image placeholder */}
        <div className="bg-teal-dark/30 rounded-2xl h-48 flex items-center justify-center mb-4">
          <div className="text-center text-teal-light">
            <p className="text-sm">Item photo</p>
          </div>
        </div>

        <h1 className="mb-2" style={{fontFamily: "'DM Serif Display', serif"}}>
          {MOCK_ITEM.name}
        </h1>
        <div className="flex items-center gap-2">
          <span className="bg-teal-dark/40 text-teal-light text-xs px-3 py-1 rounded-full">
            {MOCK_ITEM.salesChannels.join(' + ')}
          </span>
          <span className="bg-teal-dark/40 text-teal-light text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Clock size={12} />
            {MOCK_ITEM.leadTime}d lead time
          </span>
        </div>
      </div>

      <div className="px-6">
        {/* Key metrics */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-white border-2 border-critical rounded-xl p-4">
            <p className="text-3xl mb-1">{MOCK_ITEM.stock}</p>
            <p className="text-sm text-gray-600">Current Stock</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-3xl mb-1">{MOCK_ITEM.threshold}</p>
            <p className="text-sm text-gray-600">Alert Threshold</p>
          </div>
        </div>

        {/* Days of cover warning */}
        <div className="mt-3 bg-critical/10 border border-critical rounded-xl p-4">
          <div className="flex items-start gap-3">
            <TrendingDown className="text-critical mt-0.5" size={20} />
            <div className="flex-1">
              <p className="text-sm mb-1">
                <span className="text-critical">Only {MOCK_ITEM.daysOfCover} days of cover remaining</span>
              </p>
              <p className="text-xs text-gray-600">
                Based on avg. {MOCK_ITEM.avgSoldPerWeek} sold/week
              </p>
            </div>
          </div>
        </div>

        {/* Sales velocity */}
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="mb-3">Sales Velocity</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-teal">{MOCK_ITEM.avgSoldPerWeek}</span>
            <span className="text-gray-600">sold per week (avg.)</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/record-sale')}
            className="bg-teal text-white py-4 rounded-xl transition-colors"
          >
            Record Sale
          </button>
          <button className="bg-white border-2 border-teal text-teal/30 py-4 rounded-xl transition-colors">
            Restock
          </button>
        </div>
        <button className="w-full mt-3 bg-white border border-gray-300 text-gray-700 py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
          <Edit size={18} />
          Edit Item
        </button>

        {/* Activity log */}
        <div className="mt-8 mb-6">
          <h3 className="mb-4">Recent Activity</h3>
          <div className="bg-white border border-gray-200 rounded-xl divide-y">
            {MOCK_ITEM.activity.map((activity, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm capitalize">
                      {activity.type === 'sale' ? 'Sold' : 'Restocked'}{' '}
                      {Math.abs(activity.quantity)}x
                      {activity.location && ` (${activity.location})`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span
                    className={`${
                      activity.type === 'sale' ? 'text-teal' : 'text-green-600'
                    } text-sm`}
                  >
                    {activity.type === 'sale' ? '-' : '+'}
                    {activity.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
