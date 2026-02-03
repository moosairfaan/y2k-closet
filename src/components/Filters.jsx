const CATEGORIES = [
  { value: 'all', label: 'All', emoji: '👗' },
  { value: 'top', label: 'Top', emoji: '👕' },
  { value: 'bottom', label: 'Bottom', emoji: '👖' },
  { value: 'shoes', label: 'Shoes', emoji: '👟' },
  { value: 'accessory', label: 'Accessory', emoji: '✨' },
]

const SEASONS = [
  { value: 'all', label: 'All seasons', emoji: '📅' },
  { value: 'spring', label: 'Spring', emoji: '🌸' },
  { value: 'summer', label: 'Summer', emoji: '☀️' },
  { value: 'fall', label: 'Fall', emoji: '🍂' },
  { value: 'winter', label: 'Winter', emoji: '❄️' },
]

export default function Filters({ activeFilter, onFilterChange, activeSeasonFilter, onSeasonFilterChange }) {
  return (
    <div className="space-y-4">
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
      <div className="flex flex-wrap gap-2 justify-center">
        {SEASONS.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => onSeasonFilterChange(s.value)}
            className={`
              px-3 py-1.5 rounded-xl font-display font-medium text-xs transition-all duration-200
              ${activeSeasonFilter === s.value
                ? 'bg-y2k-mint text-gray-800 shadow-sm'
                : 'bg-white/60 text-gray-600 border border-y2k-pink/30 hover:bg-y2k-lavender/40'
              }
            `}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
