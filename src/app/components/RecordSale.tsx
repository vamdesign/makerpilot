import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Search, Plus, Minus, Check } from 'lucide-react';
import { toast } from 'sonner';

// Mock inventory for sale recording
const MOCK_INVENTORY = [
  { id: '1', name: 'Spaniel Bowl', stock: 5 },
  { id: '2', name: 'Tumbler - Sage', stock: 3 },
  { id: '3', name: 'Matcha Bowl', stock: 8 },
  { id: '4', name: 'Mushroom Dish', stock: 4 },
  { id: '5', name: 'Ring Dish - Blush', stock: 1 },
];

type Step = 'select-item' | 'select-quantity' | 'confirm';

export default function RecordSale() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('select-item');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<typeof MOCK_INVENTORY[0] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const filteredInventory = MOCK_INVENTORY.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemSelect = (item: typeof MOCK_INVENTORY[0]) => {
    setSelectedItem(item);
    setQuantity(1);
    setStep('select-quantity');
  };

  const handleConfirm = () => {
    // Mock save
    toast.success(`Recorded sale of ${quantity}x ${selectedItem?.name}`);
    navigate('/inventory');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className={`w-2 h-2 rounded-full ${step === 'select-item' ? 'bg-teal w-6' : 'bg-gray-300'}`}></div>
      <div className={`w-2 h-2 rounded-full ${step === 'select-quantity' ? 'bg-teal w-6' : 'bg-gray-300'}`}></div>
      <div className={`w-2 h-2 rounded-full ${step === 'confirm' ? 'bg-teal w-6' : 'bg-gray-300'}`}></div>
    </div>
  );

  return (
    <div className="min-h-screen pb-24 max-w-[430px] mx-auto bg-[#E5F0F0]">
      {/* Header */}
      <div className="bg-teal text-white px-6 py-6 rounded-b-3xl">
        <button
          onClick={() => {
            if (step === 'select-item') {
              navigate('/home');
            } else if (step === 'select-quantity') {
              setStep('select-item');
            } else {
              setStep('select-quantity');
            }
          }}
          className="flex items-center gap-2 mb-4 transition-opacity"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="mb-2" style={{fontFamily: "'DM Serif Display', serif"}}>
          Record Sale
        </h1>
        <p className="text-teal-light text-sm">Quick entry for craft shows and markets</p>
      </div>

      <div className="px-6 mt-6">
        {renderStepIndicator()}

        {/* Step 1: Select Item */}
        {step === 'select-item' && (
          <div>
            <h2 className="mb-4">Select Item</h2>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal"
                autoFocus
              />
            </div>

            {/* Item grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredInventory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  className="bg-white border-2 border-gray-200/20 p-4 rounded-xl transition-all text-center"
                >
                  <div className="bg-gray-100 h-24 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-3xl text-gray-300">📦</span>
                  </div>
                  <p className="text-sm mb-1">{item.name}</p>
                  <p className="text-xs text-gray-500">Stock: {item.stock}</p>
                </button>
              ))}
            </div>

            {filteredInventory.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No items found</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Select Quantity */}
        {step === 'select-quantity' && selectedItem && (
          <div>
            <h2 className="mb-6">How many sold?</h2>

            <div className="bg-teal-light/30 border-2 border-teal rounded-2xl p-6 mb-6 text-center">
              <p className="text-sm text-gray-600 mb-2">{selectedItem.name}</p>
              <p className="text-6xl mb-4">{quantity}</p>
              <p className="text-sm text-gray-600">
                New stock: {selectedItem.stock - quantity}
              </p>
            </div>

            {/* Large tap targets for quantity */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-100 py-8 rounded-2xl flex items-center justify-center transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={40} className={quantity <= 1 ? 'text-gray-300' : 'text-gray-700'} />
              </button>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(selectedItem.stock, quantity + 1))}
                className="bg-teal text-white py-8 rounded-2xl flex items-center justify-center transition-colors"
                disabled={quantity >= selectedItem.stock}
              >
                <Plus size={40} />
              </button>
            </div>

            {/* Quick quantity buttons */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[1, 2, 3, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setQuantity(Math.min(selectedItem.stock, num))}
                  className={`py-3 rounded-lg transition-colors ${
                    quantity === num
                      ? 'bg-teal text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('confirm')}
              className="w-full bg-teal text-white py-4 rounded-xl transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 'confirm' && selectedItem && (
          <div>
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" strokeWidth={3} />
              </div>
              <h2 className="mb-4">Confirm Sale</h2>
              <div className="text-left bg-white rounded-xl p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Item:</span>
                  <span>{selectedItem.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Quantity sold:</span>
                  <span className="text-teal">-{quantity}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">New stock total:</span>
                  <span className="text-xl">{selectedItem.stock - quantity}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-teal text-white py-4 rounded-xl transition-colors mb-3"
            >
              Save Sale
            </button>

            <button
              onClick={() => {
                setStep('select-item');
                setSelectedItem(null);
              }}
              className="w-full border-2 border-teal text-teal/30 py-4 rounded-xl transition-colors"
            >
              Add Another Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
