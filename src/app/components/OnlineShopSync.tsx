import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import CornerPlaneMark from './CornerPlaneMark';
import ScreenHeader from './ScreenHeader';
import Base from '../../imports/Base/Base';
import ShopifyLogo from '../../imports/ShopifyLogo-1/ShopifyLogo-55-846';
import WixLogo from '../../imports/WixLogo-1-1/WixLogo-55-836';
import SquareLogo from '../../imports/SquareLogo-1/SquareLogo-55-841';
import { writePrimaryChannel, type PrimaryChannel } from '../inventory/trackedInventory';

export default function OnlineShopSync() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('shopify');

  const selectedChannels = location.state?.selectedChannels || ['own-shop'];
  const currentIndex = location.state?.currentIndex || 0;

  const platformNames = {
    shopify: 'Shopify',
    wix: 'Wix',
    square: 'Square'
  };

  const platformLogos = {
    shopify: ShopifyLogo,
    wix: WixLogo,
    square: SquareLogo
  };

  const LogoComponent = platformLogos[selectedPlatform as keyof typeof platformLogos];

  const handleSync = () => {
    writePrimaryChannel(selectedPlatform as PrimaryChannel);
    navigate('/choose-listings', {
      state: { source: platformNames[selectedPlatform as keyof typeof platformNames] },
    });
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
            Connect your online store
          </h1>

          <p className="text-center text-gray-500 mb-8 px-4">
            Choose your platform to link your store inventory.
          </p>
        </ScreenHeader>

        <div className="px-6">
        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => setSelectedPlatform('shopify')}
            className={`flex-1 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[14px] ${
              selectedPlatform === 'shopify'
                ? 'bg-white text-[#373737] shadow-sm'
                : 'bg-transparent text-gray-600'
            }`}
          >
            Shopify
          </button>
          <button
            onClick={() => setSelectedPlatform('wix')}
            className={`flex-1 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[14px] ${
              selectedPlatform === 'wix'
                ? 'bg-white text-[#373737] shadow-sm'
                : 'bg-transparent text-gray-600'
            }`}
          >
            Wix
          </button>
          <button
            onClick={() => setSelectedPlatform('square')}
            className={`flex-1 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[14px] ${
              selectedPlatform === 'square'
                ? 'bg-white text-[#373737] shadow-sm'
                : 'bg-transparent text-gray-600'
            }`}
          >
            Square
          </button>
        </div>

        {/* Logo Card */}
        <div className="bg-white rounded-2xl border-2 border-[#E5E7EB] p-6 mb-3 flex flex-col items-center" style={{ zIndex: 0 }}>
          {/* Platform Logo */}
          <div className="h-[50px] flex items-center justify-center mb-4">
            <LogoComponent />
          </div>

          {/* Explanatory text */}
          <p className="text-center font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700 mb-4">
            Link your {platformNames[selectedPlatform as keyof typeof platformNames]} store to import inventory
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
