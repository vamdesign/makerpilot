import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
import PageTitle from './PageTitle';

export default function Settings() {
  const navigate = useNavigate();
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="relative isolate mx-auto flex h-full min-h-0 max-w-[430px] flex-col bg-white">
      <PageTitle title="Account" compact />

      <div className="relative z-10 flex-1 overflow-y-auto px-6 pt-2 pb-28">
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white divide-y">
          <button type="button" className="flex w-full items-center justify-between p-4">
            <div className="text-left">
              <p className="text-sm">Account Info</p>
              <p className="text-xs text-gray-500">tory@example.com</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between p-4"
            onClick={() => navigate('/pricing')}
          >
            <div className="text-left">
              <p className="text-sm">Subscription</p>
              <p className="text-xs text-gray-500">Free · Tap to upgrade</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm">Notifications</p>
              <p className="text-xs text-gray-500">Low stock alerts and reminders</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={pushNotifications}
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors ${
                pushNotifications ? 'bg-[#1A9E8F]' : 'bg-gray-300'
              }`}
              aria-label="Toggle notifications"
            >
              <span
                aria-hidden
                className={`block h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
                  pushNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <button type="button" className="flex w-full items-center justify-between p-4">
            <span className="text-sm">Help & Support</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button type="button" className="flex w-full items-center justify-between p-4">
            <span className="text-sm">Privacy Policy</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button type="button" className="flex w-full items-center justify-between p-4">
            <span className="text-sm">Terms of Service</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full p-4 text-left active:opacity-70"
          >
            <span className="text-sm text-[#B91C1C]">Log out</span>
          </button>
        </div>

        <p className="mb-6 text-center text-xs text-gray-400">MakerPilot v1.0.0</p>
      </div>
    </div>
  );
}
