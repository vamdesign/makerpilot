import { useNavigate, useLocation } from 'react-router';
import { Home, Package, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/account', icon: User, label: 'Account' },
  ];

  return (
    <nav className="absolute bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white">
      <div className="flex items-end justify-around px-1 pb-2 pt-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/inventory'
              ? location.pathname === '/inventory' || location.pathname.startsWith('/add-item')
              : location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex min-h-[48px] min-w-[44px] flex-col items-center justify-center px-2 py-1 ${
                isActive ? 'text-[#1A9E8F]' : 'text-gray-500'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="mt-0.5 text-[11px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
