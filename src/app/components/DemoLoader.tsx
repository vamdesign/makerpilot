import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { enableDemoMode } from '../demo/demoMode';
import { seedBaseInventoryExperience } from '../inventory/seedBaseInventory';

/**
 * /demo — seeds portfolio demo state, then opens the Welcome (sign-on) screen.
 */
export default function DemoLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    enableDemoMode();
    seedBaseInventoryExperience();
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
}
