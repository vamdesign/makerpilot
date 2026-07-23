import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { seedBaseInventoryExperience } from '../inventory/seedBaseInventory';

/**
 * /demo — force-loads a clean, fully populated demo state, then redirects to Home.
 * Always resets so the demo is pristine on every visit (portfolio / hiring-manager view).
 */
export default function DemoLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    seedBaseInventoryExperience();
    navigate('/home', { replace: true });
  }, [navigate]);

  return null;
}
