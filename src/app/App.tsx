import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'sonner';
import Home from './components/Home';
import Welcome from './components/Welcome';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BusinessType from './components/BusinessType';
import EtsySync from './components/EtsySync';
import OnlineShopSync from './components/OnlineShopSync';
import ManualSync from './components/ManualSync';
import ChooseListings from './components/ChooseListings';
import SetLimits from './components/SetLimits';
import Pricing from './components/Pricing';
import Inventory from './components/Inventory';
import AddItemsHub from './components/AddItemsHub';
import AddItem from './components/AddItem';
import DuplicateItem from './components/DuplicateItem';
import RecordSale from './components/RecordSale';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';
import { TRACKED_INVENTORY_KEY, writeTrackedToStorage } from './inventory/trackedInventory';
import { INVENTORY_DEMO_SEED } from './data/inventoryDemo';
import { seedActivityLogIfEmpty } from './data/activityLog';

export default function App() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const root = document.getElementById('root');
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const inPhoneFrame =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const target = e.target instanceof Element ? e.target : null;
      const inAppPortal = Boolean(
        target?.closest('[data-slot="drawer-content"]') ||
          target?.closest('[data-slot="drawer-overlay"]') ||
          target?.closest('[data-sonner-toast]') ||
          target?.closest('[role="dialog"]'),
      );

      if (inPhoneFrame || inAppPortal) {
        document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
        document.body.classList.remove('cursor-hidden');
      } else {
        document.body.classList.add('cursor-hidden');
      }
    };
    const handleMouseDown = () => document.body.classList.add('cursor-active');
    const handleMouseUp = () => document.body.classList.remove('cursor-active');
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  useEffect(() => {
    if (!localStorage.getItem(TRACKED_INVENTORY_KEY)) {
      writeTrackedToStorage(INVENTORY_DEMO_SEED);
    }
    seedActivityLogIfEmpty();
  }, []);
  return (
<BrowserRouter basename="/makerpilot">
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/demo" element={<Navigate to="/home" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/business-type" element={<BusinessType />} />
          <Route path="/sync-etsy" element={<EtsySync />} />
          <Route path="/sync-online-shop" element={<OnlineShopSync />} />
          <Route path="/sync-manual" element={<ManualSync />} />
          <Route path="/choose-listings" element={<ChooseListings />} />
          <Route path="/set-limits" element={<SetLimits />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/home" element={<><Home /><BottomNav /></>} />
          <Route path="/inventory" element={<><Inventory /><BottomNav /></>} />
          <Route path="/add-item" element={<><AddItemsHub /><BottomNav /></>} />
          <Route path="/add-item/manual" element={<><AddItem /><BottomNav /></>} />
          <Route path="/duplicate-item" element={<><DuplicateItem /><BottomNav /></>} />
          <Route path="/record-sale" element={<><RecordSale /><BottomNav /></>} />
          <Route path="/account" element={<><Settings /><BottomNav /></>} />
          <Route path="/settings" element={<Navigate to="/account" replace />} />
        </Routes>
        {createPortal(
          <Toaster
            position="top-center"
            duration={2500}
            theme="light"
          />,
          document.body,
        )}
      </div>
    </BrowserRouter>
  );
}