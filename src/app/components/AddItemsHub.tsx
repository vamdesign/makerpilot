import { useNavigate } from 'react-router';
import PageTitle from './PageTitle';
import {
  MAX_TRACKED_ITEMS,
  readStoreChannel,
  trackedItemCount,
  type StoreChannel,
} from '../inventory/trackedInventory';
import { toast } from 'sonner';

const CHANNEL_LABELS: Record<StoreChannel, string> = {
  etsy: 'Add from Etsy',
  shopify: 'Add from Shopify',
  wix: 'Add from Wix',
  square: 'Add from Square',
};

const CHANNEL_SOURCE: Record<StoreChannel, string> = {
  etsy: 'Etsy',
  shopify: 'Shopify',
  wix: 'Wix',
  square: 'Square',
};

export default function AddItemsHub() {
  const navigate = useNavigate();
  const storeChannel = readStoreChannel();
  const remaining = MAX_TRACKED_ITEMS - trackedItemCount();

  const guardCapacity = () => {
    if (remaining <= 0) {
      toast('10-item limit reached for this MVP.', {
        description: 'Remove an item to add another.',
      });
      return false;
    }
    return true;
  };

  const goChannelAdd = () => {
    if (!storeChannel || !guardCapacity()) return;
    navigate('/choose-listings', {
      state: { source: CHANNEL_SOURCE[storeChannel], mode: 'add' },
    });
  };

  const goManualAdd = () => {
    if (!guardCapacity()) return;
    navigate('/add-item/manual');
  };

  return (
    <div className="relative isolate mx-auto flex h-full min-h-0 max-w-[393px] flex-col bg-white">
      <PageTitle
        compact
        title="Add items"
        subtitle={
          remaining < MAX_TRACKED_ITEMS
            ? `${remaining} slot${remaining === 1 ? '' : 's'} left in your tracked inventory.`
            : 'Choose how you want to add inventory.'
        }
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-28 pt-3">
        {storeChannel ? (
          <button
            type="button"
            onClick={goChannelAdd}
            className="w-full rounded-2xl border-2 border-[#E5E7EB] bg-white px-4 py-4 text-left transition-colors active:bg-gray-50"
          >
            <p className="font-['DM_Sans:SemiBold',sans-serif] text-[15px] text-gray-900">
              {CHANNEL_LABELS[storeChannel]}
            </p>
            <p className="mt-1 font-['DM_Sans:Regular',sans-serif] text-[13px] text-gray-500">
              Pick more listings from your connected store.
            </p>
          </button>
        ) : null}

        <button
          type="button"
          onClick={goManualAdd}
          className="w-full rounded-2xl border-2 border-[#E5E7EB] bg-white px-4 py-4 text-left transition-colors active:bg-gray-50"
        >
          <p className="font-['DM_Sans:SemiBold',sans-serif] text-[15px] text-gray-900">
            Add manually
          </p>
          <p className="mt-1 font-['DM_Sans:Regular',sans-serif] text-[13px] text-gray-500">
            Enter item details yourself — craft shows, one-offs, and more.
          </p>
        </button>
      </div>
    </div>
  );
}
