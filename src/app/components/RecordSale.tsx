import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Plus, Minus, Check } from 'lucide-react';
import { toast } from 'sonner';
import PageTitle from './PageTitle';
import { INVENTORY_DEMO_SEED, type InventoryRow } from '../data/inventoryDemo';
import { readTrackedFromStorage, writeTrackedToStorage } from '../inventory/trackedInventory';
import { appendActivityEvent } from '../data/activityLog';

type Step = 'select-item' | 'select-quantity' | 'confirm';

function loadSaleInventory(): InventoryRow[] {
  const stored = readTrackedFromStorage();
  return stored && stored.length > 0 ? stored : [...INVENTORY_DEMO_SEED];
}

export default function RecordSale() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<InventoryRow[]>(loadSaleInventory);
  const [step, setStep] = useState<Step>('select-item');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryRow | null>(null);
  const [quantity, setQuantity] = useState(1);

  const filteredInventory = rows.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleItemSelect = (item: InventoryRow) => {
    setSelectedItem(item);
    setQuantity(1);
    setStep('select-quantity');
  };

  const handleConfirm = () => {
    if (!selectedItem) return;
    const current = rows.find((r) => r.id === selectedItem.id);
    if (!current) return;
    const newStock = Math.max(0, current.stock - quantity);
    const updated = rows.map((r) =>
      r.id === selectedItem.id ? { ...r, stock: newStock, updatedAt: Date.now() } : r,
    );
    writeTrackedToStorage(updated);
    appendActivityEvent({
      type: 'sale',
      itemId: current.id,
      itemTitle: current.title,
      detail: `Sold ${quantity} · Stock ${current.stock} → ${newStock}`,
      timestamp: Date.now(),
    });
    setRows(updated);
    const channel = current.channel;
    const isSynced = channel != null && channel !== 'manual';
    const platformName = channel
      ? channel.charAt(0).toUpperCase() + channel.slice(1)
      : null;

    if (isSynced && platformName) {
      toast.loading(`Updating ${platformName}…`, { id: 'sync-toast', duration: 1400 });
      setTimeout(() => {
        toast.success(`${platformName} updated`, { id: 'sync-toast' });
        navigate('/inventory');
      }, 1400);
    } else {
      toast.success(`Recorded sale of ${quantity}× ${current.title}`);
      navigate('/inventory');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className={`h-2 rounded-full ${step === 'select-item' ? 'bg-[#1A9E8F] w-6' : 'bg-gray-300 w-2'}`} />
      <div className={`h-2 rounded-full ${step === 'select-quantity' ? 'bg-[#1A9E8F] w-6' : 'bg-gray-300 w-2'}`} />
      <div className={`h-2 rounded-full ${step === 'confirm' ? 'bg-[#1A9E8F] w-6' : 'bg-gray-300 w-2'}`} />
    </div>
  );

  const liveSelected = selectedItem ? rows.find((r) => r.id === selectedItem.id) ?? selectedItem : null;

  return (
    <div className="relative mx-auto flex h-full min-h-0 max-w-[430px] flex-col bg-white">
      <PageTitle title="Record Sale" subtitle="Quick entry for craft shows and markets." />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        {renderStepIndicator()}

        {step === 'select-item' && (
          <div>
            <h2 className="mb-4 font-['DM_Sans:SemiBold',sans-serif] text-[16px] text-gray-900">Select item</h2>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A9E8F]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredInventory.map((item) => {
                const Thumbnail = item.Thumbnail;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemSelect(item)}
                    className="bg-white border-2 border-[#E5E7EB] p-3 rounded-xl text-center active:border-[#1A9E8F]"
                  >
                    <div className="bg-gray-100 h-24 rounded-lg mb-3 overflow-hidden [&_svg]:size-full">
                      <Thumbnail />
                    </div>
                    <p className="text-sm mb-1 font-['DM_Sans:Medium',sans-serif] text-gray-900 line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 font-['DM_Sans:Regular',sans-serif]">
                      Stock: {item.stock}
                    </p>
                  </button>
                );
              })}
            </div>

            {filteredInventory.length === 0 && (
              <div className="text-center py-12 text-gray-500 font-['DM_Sans:Regular',sans-serif] text-[14px]">
                <p>No items match your search.</p>
              </div>
            )}
          </div>
        )}

        {step === 'select-quantity' && liveSelected && (
          <div>
            <h2 className="mb-6 font-['DM_Sans:SemiBold',sans-serif] text-[16px] text-gray-900">
              How many sold?
            </h2>

            <div className="bg-[#E0F5F2]/40 border-2 border-[#1A9E8F] rounded-2xl p-6 mb-6 text-center">
              <p className="text-sm text-gray-600 mb-2 font-['DM_Sans:Regular',sans-serif] line-clamp-2">
                {liveSelected.title}
              </p>
              <p className="text-6xl mb-4 font-['DM_Sans:SemiBold',sans-serif] tabular-nums">{quantity}</p>
              <p className="text-sm text-gray-600 font-['DM_Sans:Regular',sans-serif]">
                New stock: {liveSelected.stock - quantity}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-100 py-8 rounded-2xl flex items-center justify-center"
                disabled={quantity <= 1}
              >
                <Minus size={40} className={quantity <= 1 ? 'text-gray-300' : 'text-gray-700'} />
              </button>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(liveSelected.stock, quantity + 1))}
                className="bg-[#1A9E8F] text-white py-8 rounded-2xl flex items-center justify-center"
                disabled={quantity >= liveSelected.stock}
              >
                <Plus size={40} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {[1, 2, 3, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuantity(Math.min(liveSelected.stock, num))}
                  className={`py-3 rounded-lg font-['DM_Sans:SemiBold',sans-serif] ${
                    quantity === num ? 'bg-[#1A9E8F] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setStep('confirm')}
              className="w-full bg-[#1A9E8F] text-white py-4 rounded-xl font-['DM_Sans:SemiBold',sans-serif]"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'confirm' && liveSelected && (
          <div>
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" strokeWidth={3} />
              </div>
              <h2 className="mb-4 font-['DM_Sans:SemiBold',sans-serif] text-[18px] text-gray-900">
                Confirm sale
              </h2>
              <div className="text-left bg-white rounded-xl p-4 mb-4 font-['DM_Sans:Regular',sans-serif] text-[14px]">
                <div className="flex justify-between mb-2 gap-2">
                  <span className="text-gray-600 shrink-0">Item</span>
                  <span className="text-right line-clamp-2">{liveSelected.title}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Quantity sold</span>
                  <span className="text-[#1A9E8F] font-semibold">-{quantity}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">New stock total</span>
                  <span className="text-xl font-['DM_Sans:SemiBold',sans-serif] tabular-nums">
                    {liveSelected.stock - quantity}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full bg-[#1A9E8F] text-white py-4 rounded-xl mb-3 font-['DM_Sans:SemiBold',sans-serif]"
            >
              Save Sale
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('select-item');
                setSelectedItem(null);
              }}
              className="w-full border-2 border-[#1A9E8F]/40 text-[#1A9E8F] py-4 rounded-xl font-['DM_Sans:SemiBold',sans-serif]"
            >
              Add another item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
