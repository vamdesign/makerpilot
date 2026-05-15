import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, User, Bell, Clock, CreditCard, LogOut, Sparkles } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [defaultLeadTime, setDefaultLeadTime] = useState(
    parseInt(localStorage.getItem('defaultLeadTime') || '21')
  );
  const [defaultThreshold, setDefaultThreshold] = useState(3);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleLogout = () => {
    // Clear any stored data
    localStorage.clear();
    navigate('/');
  };

  const handleSaveDefaults = () => {
    localStorage.setItem('defaultLeadTime', String(defaultLeadTime));
    alert('Settings saved!');
  };

  return (
    <div className="min-h-screen pb-24 max-w-[430px] mx-auto bg-[#E5F0F0]">
      {/* Header */}
      <div className="bg-teal text-white px-6 py-8 rounded-b-3xl">
        <h1 style={{fontFamily: "'DM Serif Display', serif"}}>Settings</h1>
      </div>

      <div className="px-6 mt-6">
        {/* Account section */}
        <div className="mb-8">
          <h3 className="text-sm text-gray-500 mb-3">ACCOUNT</h3>
          <div className="bg-white border border-gray-200 rounded-xl divide-y">
            <button className="w-full flex items-center justify-between p-4 transition-colors">
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-600" />
                <div className="text-left">
                  <p className="text-sm">Account Info</p>
                  <p className="text-xs text-gray-500">tory@example.com</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 transition-colors">
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-gray-600" />
                <div className="text-left">
                  <p className="text-sm">Subscription</p>
                  <p className="text-xs text-gray-500">Free plan</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Upgrade callout */}
        <div className="mb-8 bg-gradient-to-br from-teal to-teal-dark text-white rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-3">
            <Sparkles size={24} />
            <div>
              <h3 className="mb-1">Upgrade to Pro</h3>
              <p className="text-sm text-teal-light">
                Unlock advanced analytics, bulk operations, and priority support
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl">$7</span>
            <span className="text-teal-light text-sm">/month</span>
          </div>
          <button className="w-full bg-white text-teal py-3 rounded-lg transition-colors">
            Upgrade Now
          </button>
        </div>

        {/* Default settings */}
        <div className="mb-8">
          <h3 className="text-sm text-gray-500 mb-3">DEFAULTS</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
            <div>
              <label className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gray-600" />
                  <span className="text-sm">Default Lead Time (days)</span>
                </div>
              </label>
              <input
                type="number"
                value={defaultLeadTime}
                onChange={(e) => setDefaultLeadTime(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal"
                min="1"
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">Default Alert Threshold</label>
              <input
                type="number"
                value={defaultThreshold}
                onChange={(e) => setDefaultThreshold(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal"
                min="1"
              />
            </div>

            <button
              onClick={handleSaveDefaults}
              className="w-full bg-teal text-white py-3 rounded-lg transition-colors"
            >
              Save Defaults
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-8">
          <h3 className="text-sm text-gray-500 mb-3">NOTIFICATIONS</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-600" />
                <div>
                  <p className="text-sm">Push Notifications</p>
                  <p className="text-xs text-gray-500">Low stock alerts and reminders</p>
                </div>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  pushNotifications ? 'bg-teal' : 'bg-gray-300'
                }`}
                style={{ zIndex: 0 }}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    pushNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Other */}
        <div className="mb-8">
          <h3 className="text-sm text-gray-500 mb-3">OTHER</h3>
          <div className="bg-white border border-gray-200 rounded-xl divide-y">
            <button className="w-full flex items-center justify-between p-4 transition-colors">
              <span className="text-sm">Help & Support</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 transition-colors">
              <span className="text-sm">Privacy Policy</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 transition-colors">
              <span className="text-sm">Terms of Service</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-white border border-critical text-critical py-4 rounded-xl transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <LogOut size={20} />
          Log Out
        </button>

        <p className="text-center text-xs text-gray-400 mb-6">
          MakerPilot v1.0.0
        </p>
      </div>
    </div>
  );
}
