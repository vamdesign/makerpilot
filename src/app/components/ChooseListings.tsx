import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import Base from '../../imports/Base/Base';
import CornerPlaneMark from './CornerPlaneMark';
import ScreenHeader from './ScreenHeader';
import TopSellerBadge from './TopSellerBadge';
import { PRODUCT_THUMBNAIL_BY_ID as thumbnailMap } from '../data/productThumbnailMap';
import {
  MAX_TRACKED_ITEMS,
  readTrackedFromStorage,
  trackedItemCount,
} from '../inventory/trackedInventory';
import { DEMO_CHOOSE_LISTING_IDS, isDemoMode } from '../demo/demoMode';

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


const initialListings: ListingItem[] = [
  { id: 1, title: 'Handmade Ceramic Mushroom Spoon Rest', price: '$21.00', quantity: 6, thumbnail: thumbnailMap[1] },
  { id: 2, title: 'Tomato Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 3, isTopSeller: true, topSellerRank: 1, thumbnail: thumbnailMap[2] },
  { id: 3, title: 'Watermelon Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 4, isTopSeller: true, topSellerRank: 5, thumbnail: thumbnailMap[3] },
  { id: 4, title: 'Strawberry Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 7, isTopSeller: true, topSellerRank: 2, thumbnail: thumbnailMap[4] },
  { id: 5, title: 'Blueberry Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 5, isTopSeller: true, topSellerRank: 3, thumbnail: thumbnailMap[5] },
  { id: 6, title: 'Citrus Ceramic Mug Tumbler Handmade', price: '$36.00', quantity: 2, isTopSeller: true, topSellerRank: 4, thumbnail: thumbnailMap[6] },
  { id: 7, title: 'Evil Eye Ceramic Mug Tumbler Handmade', price: '$42.00', quantity: 3, thumbnail: thumbnailMap[7] },
  { id: 8, title: 'Large Hand-Carved Ceramic Serving Bowls', price: '$100.00', quantity: 1, hasVariations: true, thumbnail: thumbnailMap[8] },
  { id: 9, title: '6.5 inch Ceramic Cat Slow Feeder Bowl', price: '$45.00', quantity: 2, thumbnail: thumbnailMap[9] },
  { id: 10, title: '5.5 inch Ceramic Cat Slow Feeder Bowl', price: '$43.00', quantity: 4, thumbnail: thumbnailMap[10] },
  { id: 11, title: '8 inch XL Ceramic Cat Slow Feeder', price: '$50.00', quantity: 1, thumbnail: thumbnailMap[11] },
  { id: 12, title: 'Small 1 cup Slow Feeder Ceramic', price: '$39.89', quantity: 5, thumbnail: thumbnailMap[12] },
  { id: 13, title: 'Small-Medium 2 cup Slow Feeder Ceramic', price: '$46.89', quantity: 3, thumbnail: thumbnailMap[13] },
  { id: 14, title: '3 cup Ceramic Slow Feeder Bowl', price: '$53.89', quantity: 2, thumbnail: thumbnailMap[14] },
  { id: 15, title: '3, 4, 5 cup Blue Spray Long ear Spaniel...', price: '$35.00', quantity: 9, hasVariations: true, thumbnail: thumbnailMap[15] },
  { id: 16, title: '3 cup Long ear Spaniel water Bowl', price: '$35.00', quantity: 4, thumbnail: thumbnailMap[16] },
  { id: 17, title: '4 cup Pet Food Water Ceramic', price: '$29.89', quantity: 6, thumbnail: thumbnailMap[17] },
  { id: 18, title: 'White Pet Food Water Ceramic', price: '$27.89', quantity: 3, thumbnail: thumbnailMap[18] },
  { id: 19, title: 'Blue Hanging Ceramic Bird Feeder', price: '$41.00', quantity: 1, thumbnail: thumbnailMap[19] },
  { id: 20, title: 'Green & Blue Hanging Ceramic Bird Feeder', price: '$41.00', quantity: 2, thumbnail: thumbnailMap[20] },
  { id: 21, title: 'Green Hanging Ceramic Bird Feeder', price: '$39.00', quantity: 1, thumbnail: thumbnailMap[21] },
  { id: 22, title: 'Charcuterie Board Cheese Plate Porcelain', price: '$70.00', quantity: 3, thumbnail: thumbnailMap[22] },
  { id: 23, title: 'Charcuterie Board Cheese Plate Seashell', price: '$70.00', quantity: 2, thumbnail: thumbnailMap[23] },
  { id: 24, title: 'Charcuterie Board Cheese Plate Stoneware', price: '$45.00', quantity: 4, thumbnail: thumbnailMap[24] },
  { id: 25, title: 'Serving Salad Fruit Carved White Bowl', price: '$52.00', quantity: 2, thumbnail: thumbnailMap[25] },
  { id: 26, title: 'Serving Salad Fruit Carved Matte White', price: '$52.00', quantity: 1, thumbnail: thumbnailMap[26] },
  { id: 27, title: 'Casserole Baking Dish handmade cera...', price: '$56.00', quantity: 1, thumbnail: thumbnailMap[27] },
  { id: 28, title: 'Large Hand-Carved Ceramic ...', price: '$100.00', quantity: 1, thumbnail: thumbnailMap[28] },
  { id: 29, title: '5 cup Blue Spray Long ear Spaniel', price: '$41.00', quantity: 3, thumbnail: thumbnailMap[29] },
  { id: 30, title: 'Rainbow Salt Cellar', price: '$30.00', quantity: 5, thumbnail: thumbnailMap[30] },
];

type SortType = 'top-sellers' | 'alphabetical' | 'quantity' | 'selected';
type SortDirection = 'asc' | 'desc';

export default function ChooseListings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(() => {
    if (!isDemoMode()) return new Set();
    // Demo: pre-check the arranged 6 listings (skip any already tracked in add mode)
    const tracked = new Set((readTrackedFromStorage() ?? []).map((r) => r.id));
    return new Set(DEMO_CHOOSE_LISTING_IDS.filter((id) => !tracked.has(id)));
  });
  const [selectionOrder, setSelectionOrder] = useState<number[]>(() => {
    if (!isDemoMode()) return [];
    const tracked = new Set((readTrackedFromStorage() ?? []).map((r) => r.id));
    return DEMO_CHOOSE_LISTING_IDS.filter((id) => !tracked.has(id));
  });
  const [sortType, setSortType] = useState<SortType>('top-sellers');
  const [qtyDirection, setQtyDirection] = useState<SortDirection>('desc');
  const [alphaDirection, setAlphaDirection] = useState<SortDirection>('asc');

  const isAddMode = location.state?.mode === 'add';
  const source = location.state?.source || 'Etsy';

  const trackedRows = useMemo(() => readTrackedFromStorage() ?? [], [location.key]);
  const trackedStockById = useMemo(() => {
    const map = new Map<number, number>();
    trackedRows.forEach((r) => map.set(r.id, r.stock));
    return map;
  }, [trackedRows]);
  const alreadyTrackedIds = useMemo(
    () => new Set(trackedRows.map((r) => r.id)),
    [trackedRows],
  );

  const maxSelectable = isAddMode
    ? Math.max(0, MAX_TRACKED_ITEMS - trackedItemCount())
    : MAX_TRACKED_ITEMS;

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
    if (alreadyTrackedIds.has(id)) return;

    const newSelected = new Set(selectedItems);
    let newOrder = [...selectionOrder];

    if (newSelected.has(id)) {
      newSelected.delete(id);
      newOrder = newOrder.filter(itemId => itemId !== id);
    } else {
      if (newSelected.size < maxSelectable) {
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
  const isMaxReached = selectedItems.size >= maxSelectable;
  // Demo with seed already loaded: Continue stays active (6 of 10 tracked). Free-form: need a pick.
  const canContinue =
    selectedItems.size > 0 || (isDemoMode() && !isAddMode && trackedItemCount() > 0);

  return (
    <div className="relative mx-auto flex h-full min-h-0 max-w-[430px] flex-col">
      <Base />

      {/* Content — h-full (not 100vh) so sticky footer aligns with #root phone frame */}
      <div className="relative z-10 flex flex-col h-full min-h-0">
        <CornerPlaneMark />

        {/* Back button - top left */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-16 left-6 flex items-center gap-2 z-20"
        >
          <ChevronLeft size={20} className="text-gray-700" />
          <span className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-700">Back</span>
        </button>

        {/* Header */}
        <ScreenHeader>
          <h1 className="text-center mb-3" style={{fontFamily: "'DM Serif Display', serif"}}>
            {isAddMode ? `Add from ${source}` : `Your ${source} Inventory`}
          </h1>

          {/* Counter - centered */}
          <div className="flex justify-center mb-4">
            <p className={`font-['DM_Sans:SemiBold',sans-serif] text-[14px] ${
              isMaxReached ? 'text-[#FF6600]' : 'text-[#1A9E8F]'
            }`}>
              {trackedItemCount() + selectedItems.size} of {MAX_TRACKED_ITEMS} selected
            </p>
          </div>

          {/* Sort pills */}
          <div className="flex gap-2 justify-center mb-4">
            <button
              onClick={() => handleSortChange('top-sellers')}
              className={`px-3 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[12px] flex items-center gap-1 border ${
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
              className={`px-3 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[12px] border ${
                sortType === 'alphabetical'
                  ? 'bg-[#1A9E8F] text-white border-[#1A9E8F]'
                  : 'bg-white border-gray-300 text-gray-600'
              }`}
            >
              {sortType === 'alphabetical' ? (alphaDirection === 'asc' ? 'A–Z' : 'Z–A') : 'A–Z'}
            </button>
            <button
              onClick={() => handleSortChange('quantity')}
              className={`px-3 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[12px] border ${
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
              className={`px-3 py-2 rounded-full font-['DM_Sans:SemiBold',sans-serif] text-[12px] flex items-center gap-1 border ${
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
        </ScreenHeader>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 pb-32">
          {sortedListings.map((item) => {
            const isSelected = selectedItems.has(item.id);
            const isAlreadyTracked = alreadyTrackedIds.has(item.id);
            const liveTrackedStock = trackedStockById.get(item.id) ?? item.quantity;
            const displayStock = isAlreadyTracked ? liveTrackedStock : item.quantity;
            const isDisabled = !isSelected && (isMaxReached || isAlreadyTracked);
            const isDimmed = item.hasVariations || isDisabled;

            return (
              <div
                key={item.id}
                onClick={() => !item.hasVariations && !isDisabled && toggleItem(item.id)}
                className={`border-2 rounded-xl px-3 py-4 mb-2 ${
                  isSelected
                    ? 'bg-[#E6F4F2] border-[#1A9E8F]'
                    : isDimmed
                    ? 'bg-gray-100 border-[#E5E7EB]'
                    : 'bg-white border-[#E5E7EB]'
                }`}
                style={{ zIndex: 0 }}
              >
                <div className="flex items-start gap-3">
                  {item.thumbnail && (
                    <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded [&_*]:leading-none [&_svg]:block [&_svg]:h-full [&_svg]:max-h-full [&_svg]:w-full">
                      <item.thumbnail />
                    </div>
                  )}

                  {/* Title, badges, variations */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`m-0 font-['DM_Sans:Regular',sans-serif] text-[14px] leading-tight ${
                        isDimmed ? 'text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {item.title}
                    </p>
                    {item.isTopSeller && !isDimmed && (
                      <div className="mt-1 mb-0">
                        <TopSellerBadge />
                      </div>
                    )}
                    {item.hasVariations && (
                      <p className="mt-1 mb-0 font-['DM_Sans:Italic',sans-serif] text-[12px] text-gray-600">
                        Contains variations, upgrade to add to inventory
                      </p>
                    )}
                    {isAlreadyTracked && !item.hasVariations && (
                      <p className="mt-1 mb-0 font-['DM_Sans:Italic',sans-serif] text-[12px] text-gray-500">
                        In your inventory · Stock: {liveTrackedStock}
                      </p>
                    )}
                  </div>

                  {/* Price and quantity */}
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {/* Price */}
                    <p
                      className={`m-0 leading-none font-['DM_Sans:Regular',sans-serif] text-[12px] ${
                        isDimmed ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {item.price}
                    </p>
                    {/* Quantity pill — tight leading so card bottom inset matches pt (≈16px) */}
                    <div className="rounded-full bg-gray-100 px-2.5 py-1">
                      <p
                        className={`m-0 leading-none font-['DM_Sans:Regular',sans-serif] text-[12px] ${
                          isDimmed ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Stock: {displayStock}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky bottom section — full-bleed white, extra bottom padding for phone safe area */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-6 pt-4 pb-8">
          {/* Continue button */}
          <button
            onClick={() => {
              // No additional listings picked → skip Restock reminders, go straight to inventory.
              if (selectedItems.size === 0) {
                navigate('/inventory');
                return;
              }
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
              navigate('/set-limits', {
                state: {
                  selectedItems: selectedListings,
                  mode: isAddMode ? 'add' : undefined,
                },
              });
            }}
            disabled={!canContinue}
            className={`w-full py-3 rounded-xl font-['DM_Sans:SemiBold',sans-serif] text-[14px] ${
              isMaxReached ? 'mb-3' : ''
            } ${
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
