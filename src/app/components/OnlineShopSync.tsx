import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import Group1 from '../../imports/Group1-1/Group1-27-76';
import Base from '../../imports/Base/Base';
import ShopifyLogo from '../../imports/ShopifyLogo-1/ShopifyLogo-55-846';
import WixLogo from '../../imports/WixLogo-1-1/WixLogo-55-836';
import SquareLogo from '../../imports/SquareLogo-1/SquareLogo-55-841';

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
    navigate('/choose-listings', {
      state: { source: platformNames[selectedPlatform as keyof typeof platformNames] }
    });
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
          Connect your online store
        </h1>

        {/* Subhead */}
        <p className="text-center text-gray-500 mb-8 px-4">
          Choose your platform to link your store inventory.
        </p>

        {/* Segmented control - pills */}
        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => setSelectedPlatform('shopify')}
            className={`flex-1 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[14px] transition-all ${
              selectedPlatform === 'shopify'
                ? 'bg-white text-black shadow-sm'
                : 'bg-transparent text-gray-600'
            }`}
          >
            Shopify
          </button>
          <button
            onClick={() => setSelectedPlatform('wix')}
            className={`flex-1 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[14px] transition-all ${
              selectedPlatform === 'wix'
                ? 'bg-white text-black shadow-sm'
                : 'bg-transparent text-gray-600'
            }`}
          >
            Wix
          </button>
          <button
            onClick={() => setSelectedPlatform('square')}
            className={`flex-1 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[14px] transition-all ${
              selectedPlatform === 'square'
                ? 'bg-white text-black shadow-sm'
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
  );
}
