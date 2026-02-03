const CATEGORIES = [
  { value: 'all', label: 'All', emoji: '👗' },
  { value: 'top', label: 'Top', emoji: '👕' },
  { value: 'bottom', label: 'Bottom', emoji: '👖' },
  { value: 'shoes', label: 'Shoes', emoji: '👟' },
  { value: 'accessory', label: 'Accessory', emoji: '✨' },
]

export default function Filters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => onFilterChange(cat.value)}
          className={`
            px-4 py-2 rounded-2xl font-display font-medium text-sm transition-all duration-200
            ${activeFilter === cat.value
              ? 'bg-y2k-pink text-white shadow-y2k scale-105'
              : 'bg-white/80 text-gray-700 border-2 border-y2k-pink/40 hover:bg-y2k-lavender/50 hover:border-y2k-pink/60'
            }
          `}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  )
}
