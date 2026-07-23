import { INVENTORY_DEMO_SEED } from '../data/inventoryDemo';
import { seedActivityLogIfEmpty } from '../data/activityLog';
import { seedSalesHistory } from '../data/salesHistory';
import {
  TRACKED_INVENTORY_KEY,
  PRIMARY_CHANNEL_KEY,
  writeTrackedToStorage,
} from './trackedInventory';

const ACTIVITY_LOG_KEY = 'makerpilotActivityLog';
const SALES_CHANNELS_KEY = 'salesChannels';

/**
 * Load the shared portfolio base inventory (5 online + 1 POS Spaniel).
 * Same experience as /demo and as selecting Etsy (with or without POS).
 */
export function seedBaseInventoryExperience(): void {
  localStorage.removeItem(TRACKED_INVENTORY_KEY);
  localStorage.removeItem(ACTIVITY_LOG_KEY);

  localStorage.setItem(PRIMARY_CHANNEL_KEY, 'etsy');
  localStorage.setItem(SALES_CHANNELS_KEY, JSON.stringify(['etsy', 'craft-shows']));

  writeTrackedToStorage(INVENTORY_DEMO_SEED);
  seedActivityLogIfEmpty();
  seedSalesHistory();
}
