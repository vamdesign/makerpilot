import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const style = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <style>{style}</style>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-[430px] w-full mx-auto" style={{ height: '85vh', animation: 'fadeIn 0.3s ease-out' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h2 className="font-['DM_Sans:Bold',sans-serif] font-bold text-[20px] text-black">Terms & Conditions</h2>
            <button
              onClick={onClose}
              className="text-gray-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto px-6 py-6" style={{ height: 'calc(85vh - 80px)' }}>
            <p className="font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-600 mb-4">
              Effective May 6, 2026
            </p>

            <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-gray-800 mb-6 leading-relaxed">
              MakerPilot is an inventory tool for independent makers and Etsy sellers. By using the app, you agree to the following:
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="font-['DM_Sans:Bold',sans-serif] font-bold text-[16px] text-[#000000] mb-2">
                  Your account
                </h3>
                <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-gray-800 leading-relaxed">
                  You're responsible for keeping your login secure. You must be 18 or older to use MakerPilot.
                </p>
              </div>

              <div>
                <h3 className="font-['DM_Sans:Bold',sans-serif] font-bold text-[16px] text-[#000000] mb-2">
                  Your data
                </h3>
                <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-gray-800 leading-relaxed">
                  You own your inventory and sales data. We don't sell it or share it with third parties. See our Privacy Policy for details.
                </p>
              </div>

              <div>
                <h3 className="font-['DM_Sans:Bold',sans-serif] font-bold text-[16px] text-[#000000] mb-2">
                  Subscriptions
                </h3>
                <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-gray-800 leading-relaxed">
                  The free tier is free forever. Paid plans are billed monthly and can be cancelled anytime — no refunds for partial periods.
                </p>
              </div>

              <div>
                <h3 className="font-['DM_Sans:Bold',sans-serif] font-bold text-[16px] text-[#000000] mb-2">
                  Fair use
                </h3>
                <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-gray-800 leading-relaxed">
                  Don't use MakerPilot for anything unlawful, fraudulent, or disruptive.
                </p>
              </div>

              <div>
                <h3 className="font-['DM_Sans:Bold',sans-serif] font-bold text-[16px] text-[#000000] mb-2">
                  Disclaimers
                </h3>
                <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-gray-800 leading-relaxed">
                  Stock alerts and "days of cover" estimates are approximate guides, not financial advice. The service is provided as-is.
                </p>
              </div>

              <div>
                <h3 className="font-['DM_Sans:Bold',sans-serif] font-bold text-[16px] text-[#000000] mb-2">
                  Changes
                </h3>
                <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-gray-800 leading-relaxed">
                  We may update these terms and will notify you by email if anything significant changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
