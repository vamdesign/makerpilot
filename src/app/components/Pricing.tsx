import { useNavigate } from 'react-router';
import { Check, ChevronLeft, X } from 'lucide-react';
import CornerPlaneMark from './CornerPlaneMark';
import ScreenHeader from './ScreenHeader';
import BaseLong from '../../imports/BaseLong/BaseLong';

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto flex h-full min-h-0 max-w-[393px] flex-col overflow-hidden">
      <BaseLong />

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        <CornerPlaneMark />

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 flex items-center gap-2"
        >
          <ChevronLeft size={20} className="text-gray-700" />
          <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700">Back</span>
        </button>

        <ScreenHeader>
          <h1 className="mb-2 text-center" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Plans & Pricing
          </h1>
          <p className="text-center font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-500">
            Simple pricing for makers at every stage.
          </p>
        </ScreenHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-6 pb-8">
          {/* Plan cards */}
          <div className="mb-6 space-y-2.5">
          {/* Starter Plan */}
          <div
            className="bg-white rounded-2xl border-2 border-gray-400 p-4"
            style={{ zIndex: 0 }}
          >
            {/* Header band */}
            <div className="bg-[#F9FAFB] -mx-4 -mt-4 px-4 py-3 rounded-t-2xl mb-3 flex items-center justify-between">
              <span className="font-['DM_Sans:Bold',sans-serif] text-[15px] text-black">Starter</span>
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-[11px] font-['DM_Sans:SemiBold',sans-serif]">
                Free forever
              </span>
            </div>

            {/* Price */}
            <p className="font-['DM_Sans:Bold',sans-serif] text-[28px] text-black mb-3">$0</p>

            {/* Features */}
            <div className="space-y-1.5 mb-3">
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#1A9E8F] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Up to 10 inventory items</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#1A9E8F] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Low-stock alerts</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#1A9E8F] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">1 channel sync</span>
              </div>
              <div className="flex items-start gap-2">
                <X size={14} className="text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-400">No variant tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <X size={14} className="text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-400">No AI pilot</span>
              </div>
            </div>

            {/* Current plan badge */}
            <div className="flex justify-end">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-['DM_Sans:SemiBold',sans-serif]">
                Your current plan
              </span>
            </div>
          </div>

          {/* Maker Plan (Featured) */}
          <div className="bg-white rounded-2xl border-2 border-[#1A9E8F] p-4" style={{ zIndex: 0 }}>
            {/* Header band */}
            <div className="bg-[#EAF4F2] -mx-4 -mt-4 px-4 py-3 rounded-t-2xl mb-3 flex items-center justify-between">
              <span className="font-['DM_Sans:Bold',sans-serif] text-[15px] text-black">Maker</span>
              <span className="bg-[#1A9E8F] text-white px-2 py-0.5 rounded-full text-[11px] font-['DM_Sans:SemiBold',sans-serif]">
                Most popular
              </span>
            </div>

            {/* Price */}
            <p className="font-['DM_Sans:Bold',sans-serif] text-[28px] text-[#1A9E8F] mb-3">$9/mo</p>

            {/* Features */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#1A9E8F] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Up to 50 inventory items</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#1A9E8F] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Low-stock alerts</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#1A9E8F] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">2 channel sync</span>
              </div>
              <div className="flex items-start gap-2">
                <X size={14} className="text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-400">No variant tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <X size={14} className="text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-400">No AI pilot</span>
              </div>
            </div>

            {/* Upgrade button */}
            <button className="w-full bg-[#1A9E8F] text-white py-3 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[14px]">
              Upgrade to Maker
            </button>
          </div>

          {/* Studio Plan */}
          <div className="bg-white rounded-2xl border-2 border-[#534AB7] p-4" style={{ zIndex: 0 }}>
            {/* Header band */}
            <div className="bg-[#F5F3FF] -mx-4 -mt-4 px-4 py-3 rounded-t-2xl mb-3">
              <span className="font-['DM_Sans:Bold',sans-serif] text-[15px] text-black">Studio</span>
            </div>

            {/* Price */}
            <p className="font-['DM_Sans:Bold',sans-serif] text-[28px] text-[#534AB7] mb-3">$24/mo</p>

            {/* Features */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#534AB7] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Up to 100 inventory items</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#534AB7] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Low-stock alerts</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#534AB7] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">3 channel sync</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#534AB7] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Variant tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <X size={14} className="text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-400">No AI pilot</span>
              </div>
            </div>

            {/* Upgrade button */}
            <button className="w-full bg-[#534AB7] text-white py-3 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[14px]">
              Upgrade to Studio
            </button>
          </div>

          {/* Pilot Pro Plan */}
          <div className="bg-white rounded-2xl border-2 border-[#FF6600] p-4" style={{ zIndex: 0 }}>
            {/* Header band */}
            <div className="bg-[#FDF0E6] -mx-4 -mt-4 px-4 py-3 rounded-t-2xl mb-3">
              <span className="font-['DM_Sans:Bold',sans-serif] text-[15px] text-black">Pilot Pro</span>
            </div>

            {/* Price */}
            <p className="font-['DM_Sans:Bold',sans-serif] text-[28px] text-[#FF6600] mb-3">$59/mo</p>

            {/* Features */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#FF6600] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Unlimited inventory items</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#FF6600] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Low-stock alerts</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#FF6600] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">All channel sync</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#FF6600] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">Variant tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#FF6600] mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-700">AI pilot</span>
              </div>
            </div>

            {/* Upgrade button */}
            <button className="w-full bg-[#FF6600] text-white py-3 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[14px]">
              Upgrade to Pilot Pro
            </button>
          </div>
        </div>

        {/* Bottom note */}
        <p className="px-4 text-center font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-500">
          All paid plans include a 14-day free trial. Cancel anytime.
        </p>
        </div>
      </div>
    </div>
  );
}
