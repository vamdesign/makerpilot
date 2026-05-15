import { useNavigate, useLocation } from 'react-router';
import Group1 from '../../imports/Group1-1/Group1-27-76';
import Base from '../../imports/Base/Base';

export default function ManualSync() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedChannels = location.state?.selectedChannels || ['craft-shows'];
  const currentIndex = location.state?.currentIndex || 0;

  const handleSync = () => {
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

        {/* Headline */}
        <h1 className="text-center mb-3 mt-8" style={{fontFamily: "'DM Serif Display', serif"}}>
          Manual inventory tracking
        </h1>

        {/* Subhead */}
        <p className="text-center text-gray-500 mb-12">
          Track craft show and in-person sales manually.
        </p>

        {/* White card placeholder */}
        <div className="bg-white rounded-2xl p-12 mb-8 flex flex-col items-center justify-center shadow-sm min-h-[250px]">
          <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-gray-500 text-center">
            Ready to track your inventory manually
          </p>
        </div>

        {/* Sync button */}
        <button
          onClick={handleSync}
          className="w-full py-4 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[16px] bg-[#1A9E8F] text-white cursor-pointer"
        >
          Sync
        </button>
      </div>
    </div>
  );
}
