import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft, Plus, Minus, X } from 'lucide-react';
import Base from '../../imports/Base/Base';
import Group1 from '../../imports/Group1-1/Group1-27-76';
import HandmadeCeramicMushroomSpoonRest from '../../imports/HandmadeCeramicMushroomSpoonRest/HandmadeCeramicMushroomSpoonRest';
import TomatoCeramicMugTumblerHandmade from '../../imports/TomatoCeramicMugTumblerHandmade/TomatoCeramicMugTumblerHandmade';
import WatermelonCeramicMugTumblerHandmade from '../../imports/WatermelonCeramicMugTumblerHandmade/WatermelonCeramicMugTumblerHandmade';
import StrawberryCeramicMugTumblerHandmade from '../../imports/StrawberryCeramicMugTumblerHandmade/StrawberryCeramicMugTumblerHandmade';
import BlueberryCeramicMugTumblerHandmade from '../../imports/BlueberryCeramicMugTumblerHandmade/BlueberryCeramicMugTumblerHandmade';
import CitrusCeramicMugTumblerHandmade from '../../imports/CitrusCeramicMugTumblerHandmade/CitrusCeramicMugTumblerHandmade';
import EvilEyeCeramicMugTumblerHandmade from '../../imports/EvilEyeCeramicMugTumblerHandmade/EvilEyeCeramicMugTumblerHandmade';
import LargeHandCarvedCeramicServingBowls from '../../imports/LargeHandCarvedCeramicServingBowls/LargeHandCarvedCeramicServingBowls';
import Component65InchCeramicCatSlowFeederBowl from '../../imports/65InchCeramicCatSlowFeederBowl/65InchCeramicCatSlowFeederBowl';
import Component55InchCeramicCatSlowFeederBowl from '../../imports/55InchCeramicCatSlowFeederBowl/55InchCeramicCatSlowFeederBowl';
import Component8InchXlCeramicCatSlowFeeder from '../../imports/8InchXlCeramicCatSlowFeeder/8InchXlCeramicCatSlowFeeder';
import Small1CupSlowFeederCeramic from '../../imports/Small1CupSlowFeederCeramic/Small1CupSlowFeederCeramic';
import SmallMedium2CupSlowFeederCeramic from '../../imports/SmallMedium2CupSlowFeederCeramic/SmallMedium2CupSlowFeederCeramic';
import Component3CupCeramicSlowFeederBowl from '../../imports/3CupCeramicSlowFeederBowl/3CupCeramicSlowFeederBowl';
import Component345CupBlueSprayLongEarSpaniel from '../../imports/345CupBlueSprayLongEarSpaniel/345CupBlueSprayLongEarSpaniel';
import Component3CupLongEarSpanielWaterBowl from '../../imports/3CupLongEarSpanielWaterBowl/3CupLongEarSpanielWaterBowl';
import Component4CupPetFoodWaterCeramic from '../../imports/4CupPetFoodWaterCeramic/4CupPetFoodWaterCeramic';
import WhitePetFoodWaterCeramic from '../../imports/WhitePetFoodWaterCeramic/WhitePetFoodWaterCeramic';
import BlueHangingCeramicBirdFeeder from '../../imports/BlueHangingCeramicBirdFeeder/BlueHangingCeramicBirdFeeder';
import GreenBlueHangingCeramicBirdFeeder from '../../imports/GreenBlueHangingCeramicBirdFeeder/GreenBlueHangingCeramicBirdFeeder';
import GreenHangingCeramicBirdFeeder from '../../imports/GreenHangingCeramicBirdFeeder/GreenHangingCeramicBirdFeeder';
import CharcuterieBoardCheesePlatePorcelain from '../../imports/CharcuterieBoardCheesePlatePorcelain/CharcuterieBoardCheesePlatePorcelain';
import CharcuterieBoardCheesePlateSeashell from '../../imports/CharcuterieBoardCheesePlateSeashell/CharcuterieBoardCheesePlateSeashell';
import CharcuterieBoardCheesePlateStoneware from '../../imports/CharcuterieBoardCheesePlateStoneware/CharcuterieBoardCheesePlateStoneware';
import ServingSaladFruitCarvedWhiteBowl from '../../imports/ServingSaladFruitCarvedWhiteBowl/ServingSaladFruitCarvedWhiteBowl';
import ServingSaladFruitCarvedMatteWhite from '../../imports/ServingSaladFruitCarvedMatteWhite/ServingSaladFruitCarvedMatteWhite';
import CasseroleBakingDishHandmadeCera from '../../imports/CasseroleBakingDishHandmadeCera/CasseroleBakingDishHandmadeCera';
import LargeHandCarvedCeramic from '../../imports/LargeHandCarvedCeramic/LargeHandCarvedCeramic';
import Component5CupBlueSprayLongEarSpaniel from '../../imports/5CupBlueSprayLongEarSpaniel/5CupBlueSprayLongEarSpaniel';
import RainbowSaltCellar from '../../imports/RainbowSaltCellar/RainbowSaltCellar';

// Thumbnail mapping by ID
const thumbnailMap: { [key: number]: React.ComponentType } = {
  1: HandmadeCeramicMushroomSpoonRest,
  2: TomatoCeramicMugTumblerHandmade,
  3: WatermelonCeramicMugTumblerHandmade,
  4: StrawberryCeramicMugTumblerHandmade,
  5: BlueberryCeramicMugTumblerHandmade,
  6: CitrusCeramicMugTumblerHandmade,
  7: EvilEyeCeramicMugTumblerHandmade,
  8: LargeHandCarvedCeramicServingBowls,
  9: Component65InchCeramicCatSlowFeederBowl,
  10: Component55InchCeramicCatSlowFeederBowl,
  11: Component8InchXlCeramicCatSlowFeeder,
  12: Small1CupSlowFeederCeramic,
  13: SmallMedium2CupSlowFeederCeramic,
  14: Component3CupCeramicSlowFeederBowl,
  15: Component345CupBlueSprayLongEarSpaniel,
  16: Component3CupLongEarSpanielWaterBowl,
  17: Component4CupPetFoodWaterCeramic,
  18: WhitePetFoodWaterCeramic,
  19: BlueHangingCeramicBirdFeeder,
  20: GreenBlueHangingCeramicBirdFeeder,
  21: GreenHangingCeramicBirdFeeder,
  22: CharcuterieBoardCheesePlatePorcelain,
  23: CharcuterieBoardCheesePlateSeashell,
  24: CharcuterieBoardCheesePlateStoneware,
  25: ServingSaladFruitCarvedWhiteBowl,
  26: ServingSaladFruitCarvedMatteWhite,
  27: CasseroleBakingDishHandmadeCera,
  28: LargeHandCarvedCeramic,
  29: Component5CupBlueSprayLongEarSpaniel,
  30: RainbowSaltCellar,
};

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
    thumbnail: thumbnailMap[item.id]
  }));

  const [showModal, setShowModal] = useState(false);
  const [defaultAlert, setDefaultAlert] = useState(3);
  const [defaultLeadTime, setDefaultLeadTime] = useState(2);
  const [defaultLeadTimeUnit, setDefaultLeadTimeUnit] = useState<TimeUnit>('weeks');

  const initialLimits: { [key: number]: ItemLimits } = {};
  selectedItems.forEach(item => {
    initialLimits[item.id] = {
      alertThreshold: item.quantity,
      leadTime: 2,
      leadTimeUnit: 'weeks'
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
    navigate('/inventory');
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[430px] mx-auto relative">
      {/* Base background */}
      <div className="absolute inset-0">
        <Base />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Orange paper plane icon - small in top right */}
        <div className="absolute top-6 right-6 w-[50px] h-[45px] z-20">
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

        {/* Header */}
        <div className="px-6 pt-20 pb-3">
          {/* Headline */}
          <h1 className="text-center mb-4" style={{fontFamily: "'DM Serif Display', serif"}}>
            Restock Reminders
          </h1>

          {/* Set defaults link */}
          <div className="text-center mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-[#1A9E8F]"
            >
              Set defaults for all items →
            </button>
          </div>
        </div>

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
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700 whitespace-nowrap">
                    Notify me when
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => updateItemLimit(item.id, 'alertThreshold', -1)}
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <Minus size={16} className="text-gray-600" />
                    </button>
                    <span className="font-['DM_Sans:SemiBold',sans-serif] text-[16px] w-8 text-center text-gray-900">
                      {limits.alertThreshold}
                    </span>
                    <button
                      onClick={() => updateItemLimit(item.id, 'alertThreshold', 1)}
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                    <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700 w-[68px] text-center">
                      In stock
                    </span>
                  </div>
                </div>

                {/* Time to make row */}
                <div className="flex items-center gap-3">
                  <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700 whitespace-nowrap">
                    Time to make
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => updateItemLimit(item.id, 'leadTime', -1)}
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <Minus size={16} className="text-gray-600" />
                    </button>
                    <span className="font-['DM_Sans:SemiBold',sans-serif] text-[16px] w-8 text-center text-gray-900">
                      {limits.leadTime}
                    </span>
                    <button
                      onClick={() => updateItemLimit(item.id, 'leadTime', 1)}
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        const units: TimeUnit[] = ['days', 'weeks', 'months'];
                        const currentIndex = units.indexOf(limits.leadTimeUnit);
                        const nextIndex = (currentIndex + 1) % units.length;
                        updateItemLeadTimeUnit(item.id, units[nextIndex]);
                      }}
                      className="w-[68px] px-3 py-1.5 rounded-full bg-[#E6F4F2] border border-[#1A9E8F] flex items-center justify-center gap-1"
                    >
                      <span className="font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-[#1A9E8F]">
                        {limits.leadTimeUnit === 'days' ? 'Day' : limits.leadTimeUnit === 'weeks' ? 'Wks' : 'Mnth'}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <svg className="w-2.5 h-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" />
                        </svg>
                        <svg className="w-2.5 h-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky bottom section */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
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
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <p className="font-['DM_Sans:SemiBold',sans-serif] text-[16px] text-gray-900 mb-4">Set a default for all quantities:</p>

              {/* Steppers with same layout as main page */}
              <div className="flex flex-col gap-3 mb-4">
                {/* Notify me when row */}
                <div className="flex items-center">
                  <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700 w-[130px]">
                    Notify me when
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDefaultAlert(Math.max(0, defaultAlert - 1))}
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <Minus size={16} className="text-gray-600" />
                    </button>
                    <span className="font-['DM_Sans:SemiBold',sans-serif] text-[16px] w-8 text-center text-gray-900">
                      {defaultAlert}
                    </span>
                    <button
                      onClick={() => setDefaultAlert(defaultAlert + 1)}
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                    <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700 w-[68px] text-center">
                      In stock
                    </span>
                  </div>
                </div>

                {/* Time to make row */}
                <div className="flex items-center">
                  <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700 w-[130px]">
                    Time to make
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDefaultLeadTime(Math.max(1, defaultLeadTime - 1))}
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <Minus size={16} className="text-gray-600" />
                    </button>
                    <span className="font-['DM_Sans:SemiBold',sans-serif] text-[16px] w-8 text-center text-gray-900">
                      {defaultLeadTime}
                    </span>
                    <button
                      onClick={() => setDefaultLeadTime(defaultLeadTime + 1)}
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        const units: TimeUnit[] = ['days', 'weeks', 'months'];
                        const currentIndex = units.indexOf(defaultLeadTimeUnit);
                        const nextIndex = (currentIndex + 1) % units.length;
                        setDefaultLeadTimeUnit(units[nextIndex]);
                      }}
                      className="w-[68px] px-3 py-1.5 rounded-full bg-[#E6F4F2] border border-[#1A9E8F] flex items-center justify-center gap-1"
                    >
                      <span className="font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-[#1A9E8F]">
                        {defaultLeadTimeUnit === 'days' ? 'Day' : defaultLeadTimeUnit === 'weeks' ? 'Wks' : 'Mnth'}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <svg className="w-2.5 h-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" />
                        </svg>
                        <svg className="w-2.5 h-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                    </button>
                  </div>
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
