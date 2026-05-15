import { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

// Mock make-list data
const MAKE_LIST = [
  {
    id: '5',
    name: 'Ring Dish - Blush',
    currentStock: 1,
    threshold: 3,
    suggestedBatch: 5,
    leadTime: 21,
    urgency: 'critical',
    daysUntilOut: 2,
  },
  {
    id: '2',
    name: 'Tumbler - Sage',
    currentStock: 3,
    threshold: 3,
    suggestedBatch: 4,
    leadTime: 21,
    urgency: 'soon',
    daysUntilOut: 8,
  },
  {
    id: '1',
    name: 'Spaniel Bowl',
    currentStock: 5,
    threshold: 2,
    suggestedBatch: 3,
    leadTime: 21,
    urgency: 'healthy',
    daysUntilOut: 14,
  },
];

const COMPLETED_BATCHES = [
  {
    id: 'b1',
    name: 'Matcha Bowl',
    quantity: 8,
    completedDate: '2026-04-25',
  },
  {
    id: 'b2',
    name: 'Mushroom Dish',
    quantity: 6,
    completedDate: '2026-04-18',
  },
];

export default function Plan() {
  const [showCompleted, setShowCompleted] = useState(false);

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return {
          badge: 'bg-critical text-white',
          border: 'border-critical',
          bg: 'bg-red-50',
          button: 'bg-critical text-white',
        };
      case 'soon':
        return {
          badge: 'bg-warn text-white',
          border: 'border-warn',
          bg: 'bg-warn-light',
          button: 'bg-warn text-white',
        };
      default:
        return {
          badge: 'bg-green-100 text-green-700',
          border: 'border-green-200',
          bg: 'bg-green-50',
          button: 'bg-teal text-white',
        };
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return <AlertCircle size={20} className="text-critical" />;
      case 'soon':
        return <AlertTriangle size={20} className="text-warn" />;
      default:
        return <CheckCircle2 size={20} className="text-green-600" />;
    }
  };

  return (
    <div className="min-h-screen pb-24 max-w-[430px] mx-auto bg-[#E5F0F0]">
      {/* Header */}
      <div className="bg-teal text-white px-6 py-8 rounded-b-3xl">
        <h1 className="mb-3" style={{fontFamily: "'DM Serif Display', serif"}}>
          Make-List
        </h1>
        <p className="text-teal-light text-sm">
          Prioritized production schedule based on stock levels and lead times
        </p>
      </div>

      <div className="px-6">
        {/* Priority items */}
        <div className="mt-6 space-y-4">
          {MAKE_LIST.map((item) => {
            const styles = getUrgencyStyles(item.urgency);
            return (
              <div
                key={item.id}
                className={`bg-white border-2 ${styles.border} rounded-2xl p-5 ${styles.bg}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    {getUrgencyIcon(item.urgency)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base">{item.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full uppercase ${styles.badge}`}>
                          {item.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.urgency === 'critical'
                          ? `Running out in ${item.daysUntilOut} days`
                          : `${item.daysUntilOut} days of cover remaining`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 bg-white rounded-xl p-3">
                  <div className="text-center">
                    <p className="text-2xl text-teal">{item.currentStock}</p>
                    <p className="text-xs text-gray-500 mt-1">Current</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl text-teal">+{item.suggestedBatch}</p>
                    <p className="text-xs text-gray-500 mt-1">Suggested</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl text-gray-700">{item.leadTime}d</p>
                    <p className="text-xs text-gray-500 mt-1">Lead time</p>
                  </div>
                </div>

                <button className={`w-full py-3 rounded-lg transition-colors ${styles.button}`}>
                  Start Batch
                </button>
              </div>
            );
          })}
        </div>

        {/* Completed batches */}
        <div className="mt-8 mb-6">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="w-full flex items-center justify-between mb-4 text-gray-700 transition-colors"
          >
            <h3>Completed Batches ({COMPLETED_BATCHES.length})</h3>
            {showCompleted ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showCompleted && (
            <div className="bg-white border border-gray-200 rounded-xl divide-y">
              {COMPLETED_BATCHES.map((batch) => (
                <div key={batch.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm mb-1">{batch.name}</p>
                      <p className="text-xs text-gray-500">
                        Completed {new Date(batch.completedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 text-sm">+{batch.quantity}</span>
                      <CheckCircle2 size={20} className="text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
