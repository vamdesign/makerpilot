import { useNavigate } from 'react-router';
import PageTitle from './PageTitle';
import { cardBorderTouchable } from './cardBorder';
import { PRODUCT_THUMBNAIL_BY_ID } from '../data/productThumbnailMap';
import { appendManualTrackedItem } from '../inventory/trackedInventory';
import { appendActivityEvent } from '../data/activityLog';

const SAMPLE = {
  title: '4 Cup Spaniel Feeder Ocean Glaze',
  stock: 10,
  alertThreshold: 5,
  leadTime: 3,
  leadTimeUnit: 'weeks' as const,
  price: '$50.00',
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#E5E7EB] py-3 last:border-b-0">
      <span className="font-['DM_Sans:Regular',sans-serif] text-[13px] text-gray-500">{label}</span>
      <span className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#373737]">{value}</span>
    </div>
  );
}

export default function PosSampleItem() {
  const navigate = useNavigate();
  const Thumbnail = PRODUCT_THUMBNAIL_BY_ID[31];

  const handleSave = () => {
    const saved = appendManualTrackedItem({
      title: SAMPLE.title,
      stock: SAMPLE.stock,
      alertThreshold: SAMPLE.alertThreshold,
      leadTime: SAMPLE.leadTime,
      leadTimeUnit: SAMPLE.leadTimeUnit,
      price: SAMPLE.price,
    });

    if (saved) {
      appendActivityEvent({
        type: 'item_added',
        itemId: saved.id,
        itemTitle: saved.title,
        detail: `Stock ${SAMPLE.stock}`,
        timestamp: Date.now(),
      });
    }

    navigate('/inventory');
  };

  return (
    <div className="relative isolate mx-auto flex h-full min-h-0 max-w-[393px] flex-col bg-white">
      <div className="shrink-0">
        <PageTitle
          compact
          title="Add item"
          subtitle="A sample item to get you started."
        />
      </div>

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-28 pt-3">
        <div className={`mb-4 flex flex-col items-center rounded-2xl bg-white p-4 ${cardBorderTouchable}`}>
          <div className="h-32 w-32 overflow-hidden rounded-xl [&_img]:size-full [&_img]:object-cover [&_svg]:size-full">
            <Thumbnail />
          </div>
          <p className="mt-3 text-center font-['DM_Sans:SemiBold',sans-serif] text-[15px] text-[#373737]">
            {SAMPLE.title}
          </p>
        </div>

        <div className={`mb-6 rounded-2xl bg-white px-4 py-1 ${cardBorderTouchable}`}>
          <DetailRow label="Current stock" value={String(SAMPLE.stock)} />
          <DetailRow label="Notify me when" value={`${SAMPLE.alertThreshold} in stock`} />
          <DetailRow label="Time to make" value="3 wks" />
          <DetailRow label="Price" value={SAMPLE.price} />
          <DetailRow label="Channel" value="POS" />
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="mb-3 w-full rounded-xl bg-[#1A9E8F] py-4 font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-white active:bg-[#157d71]"
        >
          Save item
        </button>
        <button
          type="button"
          onClick={() => navigate('/business-type')}
          className="mb-6 min-h-[44px] w-full font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-400 active:text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
