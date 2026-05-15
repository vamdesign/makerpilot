import { useNavigate, useLocation } from 'react-router';
import { Home, Package, Plus, ListChecks, Settings } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/record-sale', icon: Plus, label: 'Add', isCenter: true },
    { path: '/plan', icon: ListChecks, label: 'Plan' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="max-w-[430px] mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
                          (item.path === '/inventory' && location.pathname.startsWith('/inventory'));

          if (item.isCenter) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="bg-teal text-white p-4 rounded-full shadow-lg transition-colors">
                  <Icon size={28} strokeWidth={2.5} />
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
                isActive ? 'text-teal' : 'text-gray-500'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
