import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import Group1 from '../../imports/Group1-1/Group1-27-76';
import Base from '../../imports/Base/Base';
import EtsyLogo from '../../imports/EtsyLogo-1/EtsyLogo';

export default function EtsySync() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedChannels = location.state?.selectedChannels || ['etsy'];
  const currentIndex = location.state?.currentIndex || 0;

  const handleSync = () => {
    navigate('/choose-listings', { state: { source: 'Etsy' } });
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[430px] mx-auto relative" style={{ zIndex: 0 }}>
      {/* Base background */}
      <div className="absolute inset-0">
        <Base />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-6 py-12">
        {/* Orange paper plane icon - small in top right */}
        <div className="absolute top-6 right-6 w-[50px] h-[45px]">
          <Group1 />
        </div>

        {/* Back button - top left */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 transition-opacity z-20"
        >
          <ChevronLeft size={20} className="text-gray-700" />
          <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700">Back</span>
        </button>

        {/* Headline */}
        <h1 className="text-center mb-3 mt-8" style={{fontFamily: "'DM Serif Display', serif"}}>
          Connect your Etsy shop
        </h1>

        {/* Subhead */}
        <p className="text-center text-gray-500 mb-12 px-4">
          We'll import your listings and keep your inventory in sync automatically.
        </p>

        {/* Etsy Logo Card */}
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
  );
}
