import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import CornerPlaneMark from './CornerPlaneMark';
import ScreenHeader from './ScreenHeader';
import Base from '../../imports/Base/Base';
import { writePrimaryChannel } from '../inventory/trackedInventory';

export default function ManualSync() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedChannels = location.state?.selectedChannels || ['craft-shows'];
  const currentIndex = location.state?.currentIndex || 0;

  const handleSync = () => {
    writePrimaryChannel('manual');

    const isPosOnly =
      selectedChannels.length === 1 && selectedChannels[0] === 'craft-shows';

    if (isPosOnly) {
      navigate('/pos-sample-item');
      return;
    }

    const nextIndex = currentIndex + 1;

    // Check if there are more channels to sync
    if (nextIndex < selectedChannels.length) {
      const nextChannel = selectedChannels[nextIndex];

      if (nextChannel === 'etsy') {
        navigate('/sync-etsy', {
          state: { selectedChannels, currentIndex: nextIndex }
        });
      } else if (nextChannel === 'own-shop') {
        navigate('/sync-online-shop', {
          state: { selectedChannels, currentIndex: nextIndex }
        });
      }
    } else {
      // All syncs complete, go to inventory
      navigate('/inventory');
    }
  };

  return (
    <div className="relative mx-auto flex h-full min-h-0 max-w-[430px] flex-col" style={{ zIndex: 0 }}>
      <Base />

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <CornerPlaneMark />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-16 left-6 flex items-center gap-2 z-20"
        >
          <ChevronLeft size={20} className="text-gray-700" />
          <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700">Back</span>
        </button>

        <ScreenHeader>
          <h1 className="text-center mb-3" style={{fontFamily: "'DM Serif Display', serif"}}>
            Manual inventory tracking
          </h1>

          <p className="text-center text-gray-500 mb-12">
            Track craft show and in-person sales manually.
          </p>
        </ScreenHeader>

        <div className="px-6">
        <div className="bg-white rounded-2xl p-12 mb-8 flex flex-col items-center justify-center shadow-sm min-h-[250px]">
          <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-gray-500 text-center">
            Ready to track your inventory manually
          </p>
        </div>

        {/* Sync button */}
        <button
          onClick={handleSync}
          className="w-full py-4 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[16px] bg-[#1A9E8F] text-white"
        >
          Sync
        </button>
        </div>
      </div>
    </div>
  );
}
