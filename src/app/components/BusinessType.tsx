import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import CornerPlaneMark from './CornerPlaneMark';
import ScreenHeader from './ScreenHeader';
import Base from '../../imports/Base-2/Base-36-390';
import Pp04A from '../../imports/Pp04A/Pp04A';
import Pp02A from '../../imports/Pp02A/Pp02A';
import Pp01A from '../../imports/Pp01A/Pp01A';

export default function BusinessType() {
  const navigate = useNavigate();
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const channels = [
    { id: 'etsy', title: 'Etsy shop', description: 'Sync your listings automatically', icon: Pp04A },
    { id: 'own-shop', title: 'My own online shop', description: 'Sync from your Shopify, Wix, or Square store', icon: Pp02A },
    { id: 'craft-shows', title: 'Craft shows & markets', description: 'Capture sales on the go', icon: Pp01A },
  ];

  const toggleChannel = (id: string) => {
    setSelectedChannels(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedChannels.length > 0) {
      localStorage.setItem('salesChannels', JSON.stringify(selectedChannels));

      // Navigate to first selected sync screen
      // Order: etsy → own-shop → craft-shows
      const firstChannel = selectedChannels.includes('etsy')
        ? 'etsy'
        : selectedChannels.includes('own-shop')
        ? 'own-shop'
        : 'craft-shows';

      // Create sorted list for sequential navigation
      const sortedChannels = selectedChannels.sort((a, b) => {
        const order = { 'etsy': 1, 'own-shop': 2, 'craft-shows': 3 };
        return order[a as keyof typeof order] - order[b as keyof typeof order];
      });

      if (firstChannel === 'etsy') {
        navigate('/sync-etsy', {
          state: { selectedChannels: sortedChannels, currentIndex: 0 }
        });
      } else if (firstChannel === 'own-shop') {
        navigate('/sync-online-shop', {
          state: { selectedChannels: sortedChannels, currentIndex: 0 }
        });
      } else {
        navigate('/sync-manual', {
          state: { selectedChannels: sortedChannels, currentIndex: 0 }
        });
      }
    }
  };

  return (
    <div className="relative mx-auto flex h-full min-h-0 max-w-[430px] flex-col" style={{ zIndex: 0 }}>
      <Base />

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <CornerPlaneMark />

        <ScreenHeader>
          <h1 className="text-center mb-3" style={{fontFamily: "'DM Serif Display', serif"}}>
            Where do you sell?
          </h1>

          <p className="text-center text-gray-600 mb-8">
            We'll track your inventory across every channel you choose.
          </p>
        </ScreenHeader>

        {/* Channel cards */}
        <div className="space-y-4 mb-6 px-6">
          {channels.map((channel) => {
            const isSelected = selectedChannels.includes(channel.id);
            const AirplaneIcon = channel.icon;
            return (
              <div
                key={channel.id}
                onClick={() => toggleChannel(channel.id)}
                className={`relative rounded-2xl p-5 border-2 ${
                  isSelected
                    ? 'bg-[#EAF4F2] border-[#1A9E8F]'
                    : 'bg-white border-gray-300'
                }`}
                style={{ zIndex: 0 }}
              >
                {/* Paper airplane in top-right corner when selected */}
                {isSelected && (
                  <div className="absolute right-4 top-4">
                    <AirplaneIcon
                      className={
                        channel.id === 'craft-shows'
                          ? 'h-[calc(2.25rem*0.81)] w-auto'
                          : undefined
                      }
                    />
                  </div>
                )}

                {/* Text - centered */}
                <div className="text-center">
                  <h3 className="font-['DM_Sans:Bold',sans-serif] text-[16px] text-black mb-1">
                    {channel.title}
                  </h3>
                  <p className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-500">
                    {channel.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue button */}
        <div className="px-6">
        <button
          onClick={handleContinue}
          disabled={selectedChannels.length === 0 || (selectedChannels.includes('etsy') && selectedChannels.includes('own-shop'))}
          className={`w-full py-4 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[16px] mb-6 ${
            selectedChannels.length > 0 && !(selectedChannels.includes('etsy') && selectedChannels.includes('own-shop'))
              ? 'bg-[#1A9E8F] text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>

        {/* Conditional: Conflict notification or default pricing info */}
        {selectedChannels.includes('etsy') && selectedChannels.includes('own-shop') ? (
          // Conflict state: Both Etsy and My own online shop selected
          <div className="bg-white rounded-2xl border-2 border-[#FF6600] p-4 mb-4" style={{ zIndex: 0 }}>
            <p className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#CC5200] mb-2 text-center">
              You're on the free plan — only 1 sync channel included.
            </p>
            <p className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-[#CC5200] mb-4 text-center">
              Upgrade to Maker to connect both.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full bg-[#FF6600] text-white py-3 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[14px]"
            >
              See pricing
            </button>
          </div>
        ) : (
          // Default state: No conflict
          <>
            <p className="text-center text-gray-500 mb-3 font-['DM_Sans:Regular',sans-serif] text-[12px]">
              Free plan: 10 items shared across all channels.
            </p>
            <p
              onClick={() => navigate('/pricing')}
              className="text-center font-['DM_Sans:Regular',sans-serif] text-[14px] text-[#1A9E8F] underline"
            >
              See pricing
            </p>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
