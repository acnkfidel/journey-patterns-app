const WIDGET_META = {
  UserManagement:  { icon: '👥', color: 'border-red-200 bg-red-50/80 text-red-700',        hover: 'hover:border-red-300' },
  Analytics:       { icon: '📊', color: 'border-violet-200 bg-violet-50/80 text-violet-700', hover: 'hover:border-violet-300' },
  LoyaltyPoints:   { icon: '⭐', color: 'border-yellow-200 bg-yellow-50/80 text-yellow-700', hover: 'hover:border-yellow-300' },
  RecentOrders:    { icon: '📦', color: 'border-blue-200 bg-blue-50/80 text-blue-700',       hover: 'hover:border-blue-300' },
  RewardOffers:    { icon: '🎁', color: 'border-pink-200 bg-pink-50/80 text-pink-700',       hover: 'hover:border-pink-300' },
  MemberBenefits:  { icon: '🏅', color: 'border-green-200 bg-green-50/80 text-green-700',   hover: 'hover:border-green-300' },
  BrowsingHistory: { icon: '🕒', color: 'border-gray-200 bg-gray-50/80 text-gray-700',      hover: 'hover:border-gray-300' },
  SystemAlerts:    { icon: '🔔', color: 'border-orange-200 bg-orange-50/80 text-orange-700', hover: 'hover:border-orange-300' },
  AuditLog:        { icon: '📋', color: 'border-slate-200 bg-slate-50/80 text-slate-700',   hover: 'hover:border-slate-300' },
};

const FALLBACK = { icon: '📌', color: 'border-gray-200 bg-gray-50 text-gray-700', hover: '' };

export default function WidgetCard({ name, active = true }) {
  const meta = WIDGET_META[name] || FALLBACK;

  if (!active) {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/60 opacity-50">
        <span className="text-2xl leading-none grayscale">{meta.icon}</span>
        <div>
          <div className="font-semibold text-sm text-gray-400 leading-tight">{name}</div>
          <div className="text-xs text-gray-300 mt-0.5">Not in config</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm ${meta.color} ${meta.hover}`}>
      <span className="text-2xl leading-none">{meta.icon}</span>
      <div>
        <div className={`font-semibold text-sm leading-tight`}>{name}</div>
        <div className="text-xs opacity-70 mt-0.5">Active widget</div>
      </div>
    </div>
  );
}
