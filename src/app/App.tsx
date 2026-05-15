import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'sonner';
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
import InventoryDetail from './components/InventoryDetail';
import AddItem from './components/AddItem';
import RecordSale from './components/RecordSale';
import Plan from './components/Plan';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';

export default function App() {
  useEffect(() => {
    // Track cursor position
    const handleMouseMove = (e: MouseEvent) => {
      const appContainer = document.querySelector('.h-full');
      if (appContainer) {
        const rect = appContainer.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInside) {
          document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
          document.body.classList.remove('cursor-hidden');
        } else {
          document.body.classList.add('cursor-hidden');
        }
      }
    };

    // Add active state on mousedown
    const handleMouseDown = () => {
      document.body.classList.add('cursor-active');
    };

    // Remove active state on mouseup
    const handleMouseUp = () => {
      document.body.classList.remove('cursor-active');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/business-type" element={<BusinessType />} />
          <Route path="/sync-etsy" element={<EtsySync />} />
          <Route path="/sync-online-shop" element={<OnlineShopSync />} />
          <Route path="/sync-manual" element={<ManualSync />} />
          <Route path="/choose-listings" element={<ChooseListings />} />
          <Route path="/set-limits" element={<SetLimits />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/inventory" element={<><Inventory /><BottomNav /></>} />
          <Route path="/inventory/:id" element={<><InventoryDetail /><BottomNav /></>} />
          <Route path="/add-item" element={<><AddItem /><BottomNav /></>} />
          <Route path="/record-sale" element={<><RecordSale /><BottomNav /></>} />
          <Route path="/plan" element={<><Plan /><BottomNav /></>} />
          <Route path="/settings" element={<><Settings /><BottomNav /></>} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}
