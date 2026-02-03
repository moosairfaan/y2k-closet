import { useState } from 'react'

const CATEGORY_LABELS = {
  top: 'Top',
  bottom: 'Bottom',
  shoes: 'Shoes',
  accessory: 'Accessory',
}

const CATEGORY_EMOJI = {
  top: '👕',
  bottom: '👖',
  shoes: '👟',
  accessory: '✨',
}

const SEASON_LABELS = {
  spring: '🌸 Spring',
  summer: '☀️ Summer',
  fall: '🍂 Fall',
  winter: '❄️ Winter',
}

export default function ItemCard({ item, onDragStart, onRemove, onRemoveFromCloset, isInOutfit }) {
  const [imageError, setImageError] = useState(false)

  function handleDragStart(e) {
    if (isInOutfit) return
    e.dataTransfer.setData('application/json', JSON.stringify(item))
    e.dataTransfer.effectAllowed = 'copy'
    onDragStart?.(item)
  }

  return (
    <article
      draggable={!isInOutfit}
      onDragStart={handleDragStart}
      className={`
        group relative rounded-3xl overflow-hidden
        bg-gradient-to-br from-white to-y2k-lavender/30
        shadow-y2k border-2 border-y2k-pink/30
        transition-all duration-300 hover:scale-[1.03] hover:shadow-holographic hover:border-y2k-pink/60
        ${isInOutfit ? 'opacity-90 ring-2 ring-y2k-mint' : 'cursor-grab active:cursor-grabbing'}
      `}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-3xl" />

      <div className="aspect-square relative bg-y2k-butter/30">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-y2k-pink p-4 text-center">
            <span className="text-5xl mb-2">{CATEGORY_EMOJI[item.category] || '👗'}</span>
            <span className="font-display text-sm">No image</span>
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}
        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-y2k-pink shadow-sm">
          {CATEGORY_EMOJI[item.category]} {CATEGORY_LABELS[item.category]}
        </span>
        {item.season && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-700 shadow-sm">
            {SEASON_LABELS[item.season] || item.season}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-gray-800 truncate" title={item.name}>
          {item.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-sm text-y2k-pink hover:text-pink-600 font-medium"
              aria-label={`Remove ${item.name} from outfit`}
            >
              Remove from outfit
            </button>
          )}
          {onRemoveFromCloset && (
            <button
              type="button"
              onClick={() => onRemoveFromCloset(item.id)}
              className="text-sm text-gray-500 hover:text-red-500 font-medium"
              aria-label={`Remove ${item.name} from closet`}
            >
              Remove from closet
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
