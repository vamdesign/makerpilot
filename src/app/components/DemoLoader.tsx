import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  TRACKED_INVENTORY_KEY,
  PRIMARY_CHANNEL_KEY,
  writeTrackedToStorage,
} from '../inventory/trackedInventory';
import { INVENTORY_DEMO_SEED } from '../data/inventoryDemo';
import { seedActivityLogIfEmpty } from '../data/activityLog';
import { seedSalesHistory } from '../data/salesHistory';

const ACTIVITY_LOG_KEY = 'makerpilotActivityLog';
const SALES_CHANNELS_KEY = 'salesChannels';

/**
 * /demo — force-loads a clean, fully populated demo state, then redirects to Home.
 * Always resets so the demo is pristine on every visit (portfolio / hiring-manager view).
 */
export default function DemoLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    // Wipe any prior state so the demo is always pristine
    localStorage.removeItem(TRACKED_INVENTORY_KEY);
    localStorage.removeItem(ACTIVITY_LOG_KEY);

    // Onboarded as an Etsy seller with in-person sales too
    localStorage.setItem(PRIMARY_CHANNEL_KEY, 'etsy');
    localStorage.setItem(SALES_CHANNELS_KEY, JSON.stringify(['etsy', 'craft-shows']));

    // Write the populated inventory + activity log
    writeTrackedToStorage(INVENTORY_DEMO_SEED);
    seedActivityLogIfEmpty();
    seedSalesHistory();

    navigate('/home', { replace: true });
  }, [navigate]);

  return null;
}
