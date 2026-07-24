import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft, Plus, Minus, X } from 'lucide-react';
import Base from '../../imports/Base/Base';
import CornerPlaneMark from './CornerPlaneMark';
import ScreenHeader from './ScreenHeader';
import { PRODUCT_THUMBNAIL_BY_ID } from '../data/productThumbnailMap';
import StepperControlRow, { StepperSuffixText } from './inventory/StepperControlRow';
import { persistOnboardingInventory } from '../inventory/trackedInventory';

interface SelectedItem {
  id: number;
  title: string;
  quantity: number;
  isTopSeller?: boolean;
  thumbnail?: React.ComponentType;
}

interface ItemLimits {
  alertThreshold: number;
  leadTime: number;
  leadTimeUnit: 'days' | 'weeks' | 'months';
}

type TimeUnit = 'days' | 'weeks' | 'months';

export default function SetLimits() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems: SelectedItem[] = (location.state?.selectedItems || []).map((item: SelectedItem) => ({
    ...item,
    thumbnail: PRODUCT_THUMBNAIL_BY_ID[item.id],
  }));

  const [showModal, setShowModal] = useState(false);
  const [defaultAlert, setDefaultAlert] = useState(3);
  const [defaultLeadTime, setDefaultLeadTime] = useState(2);
  const [defaultLeadTimeUnit, setDefaultLeadTimeUnit] = useState<TimeUnit>('weeks');

  const initialLimits: { [key: number]: ItemLimits } = {};
  selectedItems.forEach((item) => {
    initialLimits[item.id] = {
      // Default so most items read “healthy” on Inventory (v1); user can still raise alert level.
      alertThreshold: Math.min(3, Math.max(0, item.quantity - 1)),
      leadTime: 2,
      leadTimeUnit: 'weeks',
    };
  });

  const [itemLimits, setItemLimits] = useState<{ [key: number]: ItemLimits }>(initialLimits);

  const updateItemLimit = (itemId: number, field: 'alertThreshold' | 'leadTime', delta: number) => {
    setItemLimits(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: field === 'alertThreshold' ? Math.max(0, prev[itemId][field] + delta) : Math.max(1, prev[itemId][field] + delta)
      }
    }));
  };

  const updateItemLeadTimeUnit = (itemId: number, unit: TimeUnit) => {
    setItemLimits(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        leadTimeUnit: unit
      }
    }));
  };

  const applyToAll = () => {
    const newLimits: { [key: number]: ItemLimits } = {};
    selectedItems.forEach(item => {
      newLimits[item.id] = {
        alertThreshold: defaultAlert,
        leadTime: defaultLeadTime,
        leadTimeUnit: defaultLeadTimeUnit
      };
    });
    setItemLimits(newLimits);
    setShowModal(false);
  };

  const handleContinue = () => {
    const isAddMode = location.state?.mode === 'add';
    persistOnboardingInventory(
      selectedItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        isTopSeller: item.isTopSeller,
      })),
      itemLimits,
      { append: isAddMode },
    );
    navigate('/inventory');
  };

  return (
    <div className="relative mx-auto flex h-full min-h-0 max-w-[430px] flex-col">
      <Base />

      {/* Content — h-full (not 100vh) so sticky footer aligns with #root phone frame */}
      <div className="relative z-10 flex flex-col h-full min-h-0">
        <CornerPlaneMark />

        {/* Back button - top left */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-16 left-6 flex items-center gap-2 z-20"
        >
          <ChevronLeft size={20} className="text-gray-700" />
          <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700">Back</span>
        </button>

        <ScreenHeader>
          <h1 className="text-center mb-4" style={{fontFamily: "'DM Serif Display', serif"}}>
            Restock Reminders
          </h1>

          <div className="text-center mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-[#1A9E8F]"
            >
              Set defaults for all items →
            </button>
          </div>
        </ScreenHeader>

        {/* Scrollable item list */}
        <div className="flex-1 overflow-y-auto px-6 pb-32">
          {selectedItems.map((item) => {
            const limits = itemLimits[item.id];

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border-2 border-[#E5E7EB] p-4 mb-3"
                style={{ zIndex: 0 }}
              >
                {/* Item title with thumbnail */}
                <div className="flex items-start gap-2 mb-2">
                  {item.thumbnail && (
                    <div className="w-[40px] h-[40px] flex-shrink-0 rounded overflow-hidden">
                      <item.thumbnail />
                    </div>
                  )}
                  <p className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-900">
                    {item.title}
                  </p>
                </div>

                {/* Second line: Top seller badge and Stock */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {item.isTopSeller && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FFF0E5] rounded-full">
                        <svg className="w-3 h-3 fill-[#FF6600]" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="font-['DM_Sans:Regular',sans-serif] text-[11px] text-[#CC5200]">
                          Top seller
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-500">
                    Stock: {item.quantity}
                  </p>
                </div>

                {/* Send notification row */}
                <StepperControlRow
                  label="Notify me when"
                  value={limits.alertThreshold}
                  onDecrement={() => updateItemLimit(item.id, 'alertThreshold', -1)}
                  onIncrement={() => updateItemLimit(item.id, 'alertThreshold', 1)}
                  suffix={<StepperSuffixText>In stock</StepperSuffixText>}
                />

                {/* Time to make row */}
                <StepperControlRow
                  label="Time to make"
                  value={limits.leadTime}
                  onDecrement={() => updateItemLimit(item.id, 'leadTime', -1)}
                  onIncrement={() => updateItemLimit(item.id, 'leadTime', 1)}
                  className="mb-0"
                  suffix={
                    <button
                      type="button"
                      onClick={() => {
                        const units: TimeUnit[] = ['days', 'weeks', 'months'];
                        const currentIndex = units.indexOf(limits.leadTimeUnit);
                        const nextIndex = (currentIndex + 1) % units.length;
                        updateItemLeadTimeUnit(item.id, units[nextIndex]);
                      }}
                      className="flex h-9 w-full max-w-[72px] shrink-0 items-center justify-center gap-1 rounded-full border border-[#1A9E8F] bg-[#E6F4F2] px-2 py-1.5"
                    >
                      <span className="font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-[#1A9E8F]">
                        {limits.leadTimeUnit === 'days'
                          ? 'Day'
                          : limits.leadTimeUnit === 'weeks'
                            ? 'Wks'
                            : 'Mnth'}
                      </span>
                      <div className="flex flex-col items-center justify-center -space-y-1.5 leading-none [&_svg]:block [&_svg]:shrink-0">
                        <svg className="h-2.5 w-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" />
                        </svg>
                        <svg className="h-2.5 w-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                    </button>
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Sticky bottom section */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 pt-4 pb-8">
          {/* Continue button */}
          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[14px] bg-[#1A9E8F] text-white"
          >
            Continue to Inventory
          </button>
        </div>

        {/* Modal overlay */}
        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 px-6"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 active:text-gray-600"
              >
                <X size={20} />
              </button>

              <p className="font-['DM_Sans:SemiBold',sans-serif] text-[16px] text-gray-900 mb-4">Set a default for all quantities:</p>

              {/* Steppers with same layout as main page */}
      <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-[108px] shrink-0 font-['DM_Sans:Regular',sans-serif] text-[13px] text-gray-700">
                    Notify me when
                  </span>
                  <button type="button" onClick={() => setDefaultAlert(Math.max(0, defaultAlert - 1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-['DM_Sans:SemiBold',sans-serif] text-[16px] text-gray-900">{defaultAlert}</span>
                  <button type="button" onClick={() => setDefaultAlert(defaultAlert + 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    <Plus size={16} className="text-gray-600" />
                  </button>
                  <span className="font-['DM_Sans:Regular',sans-serif] text-[13px] text-gray-700">In stock</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-[108px] shrink-0 font-['DM_Sans:Regular',sans-serif] text-[13px] text-gray-700">
                    Time to make
                  </span>
                  <button type="button" onClick={() => setDefaultLeadTime(Math.max(1, defaultLeadTime - 1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-['DM_Sans:SemiBold',sans-serif] text-[16px] text-gray-900">{defaultLeadTime}</span>
                  <button type="button" onClick={() => setDefaultLeadTime(defaultLeadTime + 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    <Plus size={16} className="text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const units: TimeUnit[] = ['days', 'weeks', 'months'];
                      setDefaultLeadTimeUnit(units[(units.indexOf(defaultLeadTimeUnit) + 1) % units.length]);
                    }}
                    className="flex h-9 w-[68px] shrink-0 items-center justify-center gap-1 rounded-full border border-[#1A9E8F] bg-[#E6F4F2] px-3 py-1.5"
                  >
                    <span className="font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-[#1A9E8F]">
                      {defaultLeadTimeUnit === 'days' ? 'Day' : defaultLeadTimeUnit === 'weeks' ? 'Wks' : 'Mnth'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Apply to all button */}
              <button
                onClick={applyToAll}
                className="w-full bg-[#1A9E8F] text-white rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[14px] px-[0px] py-[12px]"
              >
                Apply to all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
