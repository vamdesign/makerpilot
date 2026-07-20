import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import CornerPlaneMark from './CornerPlaneMark';
import ScreenHeader from './ScreenHeader';
import Base from '../../imports/Base/Base';
import EtsyLogo from '../../imports/EtsyLogo-1/EtsyLogo';
import { writePrimaryChannel } from '../inventory/trackedInventory';

export default function EtsySync() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedChannels = location.state?.selectedChannels || ['etsy'];
  const currentIndex = location.state?.currentIndex || 0;

  const handleSync = () => {
    writePrimaryChannel('etsy');
    navigate('/choose-listings', { state: { source: 'Etsy' } });
  };

  return (
    <div className="relative mx-auto flex h-full min-h-0 max-w-[430px] flex-col" style={{ zIndex: 0 }}>
      <Base />

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <CornerPlaneMark />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 z-20"
        >
          <ChevronLeft size={20} className="text-gray-700" />
          <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700">Back</span>
        </button>

        <ScreenHeader>
          <h1 className="text-center mb-3" style={{fontFamily: "'DM Serif Display', serif"}}>
            Connect your Etsy shop
          </h1>

          <p className="text-center text-gray-500 mb-12 px-4">
            We'll import your listings and keep your inventory in sync automatically.
          </p>
        </ScreenHeader>

        <div className="px-6">
        <div className="bg-white rounded-2xl border-2 border-[#E5E7EB] p-6 mb-3 flex flex-col items-center" style={{ zIndex: 0 }}>
          {/* Small Etsy Logo */}
          <div className="h-[50px] flex items-center justify-center mb-4">
            <EtsyLogo />
          </div>

          {/* Explanatory text */}
          <p className="text-center font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700 mb-4">
            Link your Etsy store to import inventory
          </p>

          {/* Connect button */}
          <button
            onClick={handleSync}
            className="w-full bg-[#1A9E8F] text-white py-3 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[14px]"
          >
            Connect
          </button>
        </div>

        {/* Trust line */}
        <p className="text-center font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-500 px-4">
          We only read listings, we never post on your behalf
        </p>
        </div>
      </div>
    </div>
  );
}
