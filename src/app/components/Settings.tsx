import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown } from 'lucide-react';
import PageTitle from './PageTitle';
import { readPrimaryChannel, readTrackedFromStorage } from '../inventory/trackedInventory';
import { INVENTORY_DEMO_SEED } from '../data/inventoryDemo';
import type { InventoryChannel } from '../data/inventoryDemo';
import { ALL_HOLIDAYS, getEnabledHolidayNames, setHolidayEnabled } from '../data/holidays';

/** Small pill toggle used for settings rows. */
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
        checked ? 'bg-[#1A9E8F]' : 'bg-gray-300'
      }`}
    >
      <span
        aria-hidden
        className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

/** Expandable row that reveals long-form content (Help, Privacy, Terms). */
function CollapsibleRow({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between"
        aria-expanded={open}
      >
        <span className="text-sm">{title}</span>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

/** Row for Account Settings: left label (+optional value), teal faux "Edit" on the right. */
function AccountEditRow({
  label,
  value,
  danger,
}: {
  label: string;
  value?: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <p className={`text-sm ${danger ? 'text-[#B91C1C]' : 'text-gray-700'}`}>
        {value ? (
          <>
            <span>{label}: </span>
            <span className="text-gray-900">{value}</span>
          </>
        ) : (
          label
        )}
      </p>
      <button
        type="button"
        className="text-sm font-medium text-[#1A9E8F] active:opacity-70"
      >
        Edit
      </button>
    </div>
  );
}

function PolicyHeading({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm font-medium text-gray-900">{children}</p>;
}

function PolicyText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{children}</p>;
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 list-disc space-y-1 pl-5 text-xs leading-relaxed text-gray-600">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PrivacyPolicyContent() {
  return (
    <div>
      <PolicyText>
        MakerPilot respects your privacy. This policy explains what information the app may collect
        and how it may be used.
      </PolicyText>

      <PolicyHeading>Information We Collect</PolicyHeading>
      <PolicyText>MakerPilot may collect:</PolicyText>
      <PolicyList
        items={[
          'Account information, such as your name and email',
          'Inventory, product, and business information you enter',
          'Photos or files you choose to upload',
          'Basic device, usage, and error information',
        ]}
      />

      <PolicyHeading>How We Use Information</PolicyHeading>
      <PolicyText>We may use your information to:</PolicyText>
      <PolicyList
        items={[
          'Provide and improve the app',
          'Save and manage your inventory',
          'Maintain account security',
          'Respond to support requests',
          'Send important service updates',
        ]}
      />
      <PolicyText>MakerPilot does not sell your personal information.</PolicyText>

      <PolicyHeading>Device Permissions</PolicyHeading>
      <PolicyText>
        MakerPilot may request access to your camera, photos, or files when needed for app features.
        You can manage these permissions in your device settings.
      </PolicyText>

      <PolicyHeading>Data Storage</PolicyHeading>
      <PolicyText>
        Your information may be stored by service providers that help operate MakerPilot. Reasonable
        steps are taken to protect your data, but no system is completely secure.
      </PolicyText>

      <PolicyHeading>Your Choices</PolicyHeading>
      <PolicyText>
        You may update or delete certain information through the app. You may also request account
        deletion by contacting support@makerpilot.com.
      </PolicyText>

      <PolicyHeading>Children&rsquo;s Privacy</PolicyHeading>
      <PolicyText>MakerPilot is not intended for children under 13.</PolicyText>

      <PolicyHeading>Changes</PolicyHeading>
      <PolicyText>
        This policy may be updated from time to time. The latest version will be available in the
        app.
      </PolicyText>
    </div>
  );
}

function TermsOfServiceContent() {
  return (
    <div>
      <PolicyText>By using MakerPilot, you agree to these Terms of Service.</PolicyText>

      <PolicyHeading>Using MakerPilot</PolicyHeading>
      <PolicyText>
        MakerPilot provides tools for managing inventory, products, and related business
        information.
      </PolicyText>
      <PolicyText>
        You agree to use the app lawfully and not interfere with its operation or security.
      </PolicyText>

      <PolicyHeading>Your Account</PolicyHeading>
      <PolicyText>
        You are responsible for keeping your account information accurate and your login details
        secure.
      </PolicyText>

      <PolicyHeading>Your Content</PolicyHeading>
      <PolicyText>
        You retain ownership of the information, images, and other content you add to MakerPilot.
      </PolicyText>
      <PolicyText>
        You give MakerPilot permission to store and process that content as needed to provide the
        service.
      </PolicyText>

      <PolicyHeading>App Availability</PolicyHeading>
      <PolicyText>
        MakerPilot may update, change, suspend, or remove features at any time. The app may also be
        temporarily unavailable for maintenance or technical reasons.
      </PolicyText>

      <PolicyHeading>Data Accuracy</PolicyHeading>
      <PolicyText>
        MakerPilot is intended to support inventory management, but it does not guarantee that
        inventory counts, reports, or other information will always be complete or accurate.
      </PolicyText>
      <PolicyText>
        You are responsible for reviewing your information and maintaining any necessary backups.
      </PolicyText>

      <PolicyHeading>Acceptable Use</PolicyHeading>
      <PolicyText>You may not:</PolicyText>
      <PolicyList
        items={[
          'Use the app for unlawful purposes',
          "Access another user's account",
          'Upload harmful code',
          'Attempt to disrupt or reverse engineer the app',
          "Violate another person's rights",
        ]}
      />

      <PolicyHeading>Termination</PolicyHeading>
      <PolicyText>
        MakerPilot may suspend or terminate accounts that violate these terms or create a security
        risk.
      </PolicyText>
      <PolicyText>
        You may stop using the app or request account deletion at any time.
      </PolicyText>

      <PolicyHeading>Limitation of Liability</PolicyHeading>
      <PolicyText>
        MakerPilot is provided on an &ldquo;as available&rdquo; basis. To the extent permitted by
        law, MakerPilot is not responsible for lost data, lost profits, or other indirect damages
        related to use of the app.
      </PolicyText>

      <PolicyHeading>Changes</PolicyHeading>
      <PolicyText>
        These terms may be updated from time to time. Continued use of MakerPilot means you accept
        the updated terms.
      </PolicyText>
    </div>
  );
}

const STORE_CHANNEL_LABELS: Record<Exclude<InventoryChannel, 'manual'>, string> = {
  etsy: 'Etsy',
  shopify: 'Shopify',
  wix: 'Wix',
  square: 'Square',
};

const STORE_CHANNEL_ORDER: Exclude<InventoryChannel, 'manual'>[] = [
  'etsy',
  'shopify',
  'wix',
  'square',
];

const IN_PERSON_LABEL = 'In Person Sales (POS)';

function getChannelLabels(): string[] {
  const items = readTrackedFromStorage() ?? INVENTORY_DEMO_SEED;
  const itemsCarryChannel = items.some((item) => item.channel != null);

  if (itemsCarryChannel) {
    const activeStore = new Set<Exclude<InventoryChannel, 'manual'>>();
    let hasInPerson = false;

    for (const item of items) {
      const channel = item.channel ?? 'manual';
      if (channel === 'manual') {
        hasInPerson = true;
      } else {
        activeStore.add(channel);
      }
    }

    const labels: string[] = [];
    for (const channel of STORE_CHANNEL_ORDER) {
      if (activeStore.has(channel)) {
        labels.push(STORE_CHANNEL_LABELS[channel]);
      }
    }
    if (hasInPerson) labels.push(IN_PERSON_LABEL);

    return labels.length > 0 ? labels : ['None'];
  }

  const labels: string[] = [];
  const primary = readPrimaryChannel();
  if (primary !== 'manual') {
    labels.push(STORE_CHANNEL_LABELS[primary]);
  }

  try {
    const salesChannels = JSON.parse(localStorage.getItem('salesChannels') || '[]') as string[];
    if (salesChannels.includes('craft-shows')) {
      labels.push(IN_PERSON_LABEL);
    }
  } catch {
    /* ignore */
  }

  return labels.length > 0 ? labels : ['None'];
}

export default function Settings() {
  const navigate = useNavigate();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);
  const [holidayCountdownOpen, setHolidayCountdownOpen] = useState(false);
  const [enabledHolidays, setEnabledHolidays] = useState<string[]>(() => getEnabledHolidayNames());
  const [helpOpen, setHelpOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const channelLabels = getChannelLabels();

  const toggleHoliday = (name: string) => {
    const next = setHolidayEnabled(name, !enabledHolidays.includes(name));
    setEnabledHolidays(next);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="relative isolate mx-auto flex h-full min-h-0 max-w-[430px] flex-col bg-white">
      <PageTitle title="Account" compact />

      <div className="relative z-10 flex-1 overflow-y-auto px-6 pt-2 pb-28">
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white divide-y">
          <CollapsibleRow
            title="Account Settings"
            open={accountOpen}
            onToggle={() => setAccountOpen((o) => !o)}
          >
            <div className="flex flex-col divide-y divide-gray-100">
              <AccountEditRow label="Name" value="Tory Haylor" />
              <AccountEditRow label="Email" value="mud2stone@gmail.com" />
              <AccountEditRow label="Password" value="•••••••" />
              <AccountEditRow label="Delete Account" danger />
            </div>
          </CollapsibleRow>

          <button
            type="button"
            className="flex w-full items-center justify-between p-4"
            onClick={() => navigate('/pricing')}
          >
            <div className="text-left">
              <p className="text-sm">Subscription</p>
              <p className="text-xs text-gray-500">Free · Tap to upgrade</p>
            </div>
          </button>

          <div className="p-4">
            <div className="text-left">
              <p className="text-sm">Channels:</p>
              <div className="mt-0.5 flex flex-col gap-0.5">
                {channelLabels.map((label) => (
                  <p key={label} className="text-xs text-gray-500">
                    {label}
                  </p>
                ))}
              </div>
            </div>
          </div>

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

          <div className="p-4">
            <button
              type="button"
              onClick={() => setHolidayCountdownOpen((o) => !o)}
              className="flex w-full items-center justify-between"
              aria-expanded={holidayCountdownOpen}
            >
              <div className="text-left">
                <p className="text-sm">Holiday Countdown</p>
                <p className="text-xs text-gray-500">Add upcoming selling dates. Choose more anytime.</p>
              </div>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${
                  holidayCountdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {holidayCountdownOpen && (
              <div className="mt-2 flex flex-col divide-y divide-gray-100">
                {ALL_HOLIDAYS.map((h) => {
                  const on = enabledHolidays.includes(h.name);
                  return (
                    <div key={h.name} className="flex items-center justify-between py-2.5">
                      <span className="text-sm text-gray-700">{h.name}</span>
                      <Toggle
                        checked={on}
                        onChange={() => toggleHoliday(h.name)}
                        label={`Toggle ${h.name} countdown`}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <CollapsibleRow
            title="Help & Support"
            open={helpOpen}
            onToggle={() => setHelpOpen((o) => !o)}
          >
            <div className="space-y-1">
              <p className="text-sm text-gray-700">Phone: (888) 555-1234</p>
              <p className="text-sm text-gray-700">Email: support@makerpilot.com</p>
            </div>
          </CollapsibleRow>

          <CollapsibleRow
            title="Privacy Policy"
            open={privacyOpen}
            onToggle={() => setPrivacyOpen((o) => !o)}
          >
            <PrivacyPolicyContent />
          </CollapsibleRow>

          <CollapsibleRow
            title="Terms of Service"
            open={termsOpen}
            onToggle={() => setTermsOpen((o) => !o)}
          >
            <TermsOfServiceContent />
          </CollapsibleRow>

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
