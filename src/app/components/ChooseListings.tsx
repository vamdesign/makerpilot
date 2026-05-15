import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
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

interface ListingItem {
  id: number;
  title: string;
  price: string;
  quantity: number;
  hasVariations?: boolean;
  isTopSeller?: boolean;
  topSellerRank?: number;
  thumbnail?: React.ComponentType;
}

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

const initialListings: ListingItem[] = [
  { id: 1, title: 'Handmade Ceramic Mushroom Spoon Rest', price: '$21.00', quantity: 6, thumbnail: HandmadeCeramicMushroomSpoonRest },
  { id: 2, title: 'Tomato Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 3, isTopSeller: true, topSellerRank: 1, thumbnail: TomatoCeramicMugTumblerHandmade },
  { id: 3, title: 'Watermelon Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 4, isTopSeller: true, topSellerRank: 5, thumbnail: WatermelonCeramicMugTumblerHandmade },
  { id: 4, title: 'Strawberry Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 7, isTopSeller: true, topSellerRank: 2, thumbnail: StrawberryCeramicMugTumblerHandmade },
  { id: 5, title: 'Blueberry Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 5, isTopSeller: true, topSellerRank: 3, thumbnail: BlueberryCeramicMugTumblerHandmade },
  { id: 6, title: 'Citrus Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 2, isTopSeller: true, topSellerRank: 4, thumbnail: CitrusCeramicMugTumblerHandmade },
  { id: 7, title: 'Evil Eye Ceramic Mug Tumbler Handmade', price: '$42.00', quantity: 3, thumbnail: EvilEyeCeramicMugTumblerHandmade },
  { id: 8, title: 'Large Hand-Carved Ceramic Serving Bowls', price: '$100.00', quantity: 1, hasVariations: true, thumbnail: LargeHandCarvedCeramicServingBowls },
  { id: 9, title: '6.5 inch Ceramic Cat Slow Feeder Bowl', price: '$45.00', quantity: 2, thumbnail: Component65InchCeramicCatSlowFeederBowl },
  { id: 10, title: '5.5 inch Ceramic Cat Slow Feeder Bowl', price: '$43.00', quantity: 4, thumbnail: Component55InchCeramicCatSlowFeederBowl },
  { id: 11, title: '8 inch XL Ceramic Cat Slow Feeder', price: '$50.00', quantity: 1, thumbnail: Component8InchXlCeramicCatSlowFeeder },
  { id: 12, title: 'Small 1 cup Slow Feeder Ceramic', price: '$39.89', quantity: 5, thumbnail: Small1CupSlowFeederCeramic },
  { id: 13, title: 'Small-Medium 2 cup Slow Feeder Ceramic', price: '$46.89', quantity: 3, thumbnail: SmallMedium2CupSlowFeederCeramic },
  { id: 14, title: '3 cup Ceramic Slow Feeder Bowl', price: '$53.89', quantity: 2, thumbnail: Component3CupCeramicSlowFeederBowl },
  { id: 15, title: '3, 4, 5 cup Blue Spray Long ear Spaniel...', price: '$35.00', quantity: 9, hasVariations: true, thumbnail: Component345CupBlueSprayLongEarSpaniel },
  { id: 16, title: '3 cup Long ear Spaniel water Bowl', price: '$35.00', quantity: 4, thumbnail: Component3CupLongEarSpanielWaterBowl },
  { id: 17, title: '4 cup Pet Food Water Ceramic', price: '$29.89', quantity: 6, thumbnail: Component4CupPetFoodWaterCeramic },
  { id: 18, title: 'White Pet Food Water Ceramic', price: '$27.89', quantity: 3, thumbnail: WhitePetFoodWaterCeramic },
  { id: 19, title: 'Blue Hanging Ceramic Bird Feeder', price: '$41.00', quantity: 1, thumbnail: BlueHangingCeramicBirdFeeder },
  { id: 20, title: 'Green & Blue Hanging Ceramic Bird Feeder', price: '$41.00', quantity: 2, thumbnail: GreenBlueHangingCeramicBirdFeeder },
  { id: 21, title: 'Green Hanging Ceramic Bird Feeder', price: '$39.00', quantity: 1, thumbnail: GreenHangingCeramicBirdFeeder },
  { id: 22, title: 'Charcuterie Board Cheese Plate Porcelain', price: '$70.00', quantity: 3, thumbnail: CharcuterieBoardCheesePlatePorcelain },
  { id: 23, title: 'Charcuterie Board Cheese Plate Seashell', price: '$70.00', quantity: 2, thumbnail: CharcuterieBoardCheesePlateSeashell },
  { id: 24, title: 'Charcuterie Board Cheese Plate Stoneware', price: '$45.00', quantity: 4, thumbnail: CharcuterieBoardCheesePlateStoneware },
  { id: 25, title: 'Serving Salad Fruit Carved White Bowl', price: '$52.00', quantity: 2, thumbnail: ServingSaladFruitCarvedWhiteBowl },
  { id: 26, title: 'Serving Salad Fruit Carved Matte White', price: '$52.00', quantity: 1, thumbnail: ServingSaladFruitCarvedMatteWhite },
  { id: 27, title: 'Casserole Baking Dish handmade cera...', price: '$56.00', quantity: 1, thumbnail: CasseroleBakingDishHandmadeCera },
  { id: 28, title: 'Large Hand-Carved Ceramic ...', price: '$100.00', quantity: 1, thumbnail: LargeHandCarvedCeramic },
  { id: 29, title: '5 cup Blue Spray Long ear Spaniel', price: '$41.00', quantity: 3, thumbnail: Component5CupBlueSprayLongEarSpaniel },
  { id: 30, title: 'Rainbow Salt Cellar', price: '$30.00', quantity: 5, thumbnail: RainbowSaltCellar },
];

type SortType = 'top-sellers' | 'alphabetical' | 'quantity' | 'selected';
type SortDirection = 'asc' | 'desc';

export default function ChooseListings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [selectionOrder, setSelectionOrder] = useState<number[]>([]);
  const [sortType, setSortType] = useState<SortType>('top-sellers');
  const [qtyDirection, setQtyDirection] = useState<SortDirection>('desc');
  const [alphaDirection, setAlphaDirection] = useState<SortDirection>('asc');
  const MAX_ITEMS = 10;

  // Get source from navigation state, default to 'Etsy'
  const source = location.state?.source || 'Etsy';

  // Load inventory from localStorage or use initial values
  const [listings, setListings] = useState<ListingItem[]>(() => {
    const saved = localStorage.getItem('inventoryData');
    if (saved) {
      const parsedListings = JSON.parse(saved);
      // Add thumbnails back from the mapping
      return parsedListings.map((item: ListingItem) => ({
        ...item,
        thumbnail: thumbnailMap[item.id]
      }));
    }
    return initialListings;
  });

  // Save to localStorage whenever listings change (thumbnails will be stripped in JSON)
  useEffect(() => {
    localStorage.setItem('inventoryData', JSON.stringify(listings));
  }, [listings]);

  const toggleItem = (id: number) => {
    const newSelected = new Set(selectedItems);
    let newOrder = [...selectionOrder];

    if (newSelected.has(id)) {
      newSelected.delete(id);
      newOrder = newOrder.filter(itemId => itemId !== id);
    } else {
      if (newSelected.size < MAX_ITEMS) {
        newSelected.add(id);
        newOrder.push(id);
      }
    }
    setSelectedItems(newSelected);
    setSelectionOrder(newOrder);
  };

  const handleSortChange = (newSort: SortType) => {
    if (newSort === 'quantity' && sortType === 'quantity') {
      // Toggle direction if clicking the same sort
      setQtyDirection(qtyDirection === 'desc' ? 'asc' : 'desc');
    } else if (newSort === 'alphabetical' && sortType === 'alphabetical') {
      // Toggle alphabetical direction if clicking the same sort
      setAlphaDirection(alphaDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(newSort);
      if (newSort === 'quantity' && sortType !== 'quantity') {
        setQtyDirection('desc'); // Reset to desc when first selecting quantity sort
      } else if (newSort === 'alphabetical' && sortType !== 'alphabetical') {
        setAlphaDirection('asc'); // Reset to asc (A-Z) when first selecting alphabetical sort
      }
    }
  };

  const getSortedListings = () => {
    const sorted = [...listings];

    if (sortType === 'top-sellers') {
      return sorted.sort((a, b) => {
        if (a.isTopSeller && !b.isTopSeller) return -1;
        if (!a.isTopSeller && b.isTopSeller) return 1;
        if (a.isTopSeller && b.isTopSeller) {
          return (a.topSellerRank || 0) - (b.topSellerRank || 0);
        }
        return 0;
      });
    } else if (sortType === 'alphabetical') {
      return sorted.sort((a, b) => {
        if (alphaDirection === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    } else if (sortType === 'selected') {
      return sorted.sort((a, b) => {
        const aSelected = selectedItems.has(a.id);
        const bSelected = selectedItems.has(b.id);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return 0;
      });
    } else {
      // quantity sort
      return sorted.sort((a, b) => {
        if (qtyDirection === 'desc') {
          return b.quantity - a.quantity;
        } else {
          return a.quantity - b.quantity;
        }
      });
    }
  };

  const sortedListings = getSortedListings();
  const isMaxReached = selectedItems.size >= MAX_ITEMS;
  const canContinue = selectedItems.size > 0;

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
          <h1 className="text-center mb-3" style={{fontFamily: "'DM Serif Display', serif"}}>
            Your {source} Inventory
          </h1>

          {/* Counter - centered */}
          <div className="flex justify-center mb-4">
            <p className={`font-['DM_Sans:SemiBold',sans-serif] text-[14px] ${
              isMaxReached ? 'text-[#FF6600]' : 'text-[#1A9E8F]'
            }`}>
              {selectedItems.size} of {MAX_ITEMS} selected
            </p>
          </div>

          {/* Sort pills */}
          <div className="flex gap-2 justify-center mb-4">
            <button
              onClick={() => handleSortChange('top-sellers')}
              className={`px-3 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[12px] transition-all flex items-center gap-1 border ${
                sortType === 'top-sellers'
                  ? 'bg-[#1A9E8F] text-white border-[#1A9E8F]'
                  : 'bg-white border-gray-300 text-gray-600'
              }`}
            >
              <svg className={`w-3 h-3 ${sortType === 'top-sellers' ? 'fill-white' : 'fill-[#FF6600]'}`} viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Top sellers
            </button>
            <button
              onClick={() => handleSortChange('alphabetical')}
              className={`px-3 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[12px] transition-all border ${
                sortType === 'alphabetical'
                  ? 'bg-[#1A9E8F] text-white border-[#1A9E8F]'
                  : 'bg-white border-gray-300 text-gray-600'
              }`}
            >
              {sortType === 'alphabetical' ? (alphaDirection === 'asc' ? 'A–Z' : 'Z–A') : 'A–Z'}
            </button>
            <button
              onClick={() => handleSortChange('quantity')}
              className={`px-3 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[12px] transition-all border ${
                sortType === 'quantity'
                  ? 'bg-[#1A9E8F] text-white border-[#1A9E8F]'
                  : 'bg-white border-gray-300 text-gray-600'
              }`}
            >
              Qty {sortType === 'quantity' ? (qtyDirection === 'desc' ? '↓' : '↑') : '↓'}
            </button>
            <button
              onClick={() => selectedItems.size > 0 && handleSortChange('selected')}
              disabled={selectedItems.size === 0}
              className={`px-3 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[12px] transition-all flex items-center gap-1 border ${
                sortType === 'selected'
                  ? 'bg-[#1A9E8F] text-white border-[#1A9E8F]'
                  : selectedItems.size === 0
                  ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-gray-300 text-gray-600'
              }`}
            >
              <svg className={`w-3 h-3 ${sortType === 'selected' ? 'text-white' : selectedItems.size === 0 ? 'text-gray-400' : 'text-[#1A9E8F]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Selected
            </button>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 pb-32">
          {sortedListings.map((item) => {
            const isSelected = selectedItems.has(item.id);
            const isDisabled = !isSelected && isMaxReached;
            const isDimmed = item.hasVariations || isDisabled;

            return (
              <div
                key={item.id}
                onClick={() => !item.hasVariations && !isDisabled && toggleItem(item.id)}
                className={`border-2 rounded-xl p-4 mb-3 ${
                  isSelected
                    ? 'bg-[#E6F4F2] border-[#1A9E8F]'
                    : isDimmed
                    ? 'bg-gray-100 border-[#E5E7EB]'
                    : 'bg-white border-[#E5E7EB]'
                } ${
                  !isDimmed ? 'cursor-pointer' : ''
                }`}
                style={{ zIndex: 0 }}
              >
                <div className="flex items-start gap-3">
                  {/* Left side - Thumbnail with checkmark below */}
                  <div className="flex flex-col items-center gap-1">
                    {item.thumbnail && (
                      <div className="w-[40px] h-[40px] flex-shrink-0 rounded overflow-hidden">
                        <item.thumbnail />
                      </div>
                    )}
                    {!item.hasVariations && (
                      <div className="w-5 h-5 flex items-center justify-center">
                        {isSelected && (
                          <svg className="w-5 h-5 text-[#1A9E8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Middle - Title, top seller badge, and variations */}
                  <div className="flex-1">
                    <p className={`font-['DM_Sans:Regular',sans-serif] text-[14px] mb-1 ${
                      isDimmed ? 'text-gray-400' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </p>
                    {item.isTopSeller && !isDimmed && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FFF0E5] rounded-full mb-1">
                        <svg className="w-3 h-3 fill-[#FF6600]" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="font-['DM_Sans:Regular',sans-serif] text-[11px] text-[#CC5200]">
                          Top seller
                        </span>
                      </div>
                    )}
                    {item.hasVariations && (
                      <p className="font-['DM_Sans:Italic',sans-serif] text-[12px] text-gray-600 mt-1">
                        Contains variations, upgrade to add to inventory
                      </p>
                    )}
                  </div>

                  {/* Right side - Price and Quantity */}
                  <div className="flex flex-col items-end gap-2">
                    {/* Price */}
                    <p className={`font-['DM_Sans:Regular',sans-serif] text-[12px] ${
                      isDimmed ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {item.price}
                    </p>
                    {/* Quantity pill */}
                    <div className="px-3 py-1 bg-gray-100 rounded-full">
                      <p className={`font-['DM_Sans:Regular',sans-serif] text-[12px] ${
                        isDimmed ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Stock: {item.quantity}
                      </p>
                    </div>
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
            onClick={() => {
              // Preserve selection order (don't include thumbnail components - they can't be cloned)
              const selectedListings = selectionOrder
                .map(id => listings.find(item => item.id === id))
                .filter(item => item !== undefined)
                .map(item => ({
                  id: item!.id,
                  title: item!.title,
                  quantity: item!.quantity,
                  isTopSeller: item!.isTopSeller
                }));
              navigate('/set-limits', { state: { selectedItems: selectedListings } });
            }}
            disabled={!canContinue}
            className={`w-full py-3 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[14px] mb-3 ${
              canContinue
                ? 'bg-[#1A9E8F] text-white'
                : 'bg-gray-300 text-gray-500'
            }`}
          >
            Continue
          </button>

          {/* Upgrade to track more - clickable text when max reached */}
          {isMaxReached && (
            <div className="text-center">
              <button
                onClick={() => navigate('/pricing')}
                className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-[#1A9E8F] underline"
              >
                Upgrade to track more inventory
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
