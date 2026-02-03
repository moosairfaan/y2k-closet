import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from './ItemCard'
import AddItemForm from './AddItemForm'
import Filters from './Filters'

const STORAGE_KEY = 'y2k-closet-items'
const OUTFIT_KEY = 'y2k-closet-outfit'

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadOutfit() {
  try {
    const raw = localStorage.getItem(OUTFIT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function saveOutfit(outfit) {
  localStorage.setItem(OUTFIT_KEY, JSON.stringify(outfit))
}

export default function Closet() {
  const [items, setItems] = useState(() => loadItems())
  const [filter, setFilter] = useState('all')
  const [seasonFilter, setSeasonFilter] = useState('all')
  const [outfit, setOutfit] = useState(() => loadOutfit())
  const [outfitDropActive, setOutfitDropActive] = useState(false)

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const next = [...prev, item]
      saveItems(next)
      return next
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id)
      saveItems(next)
      return next
    })
    setOutfit((prev) => {
      const next = prev.filter((i) => i.id !== id)
      saveOutfit(next)
      return next
    })
  }, [])

  const filteredItems = items.filter((i) => {
    const matchCategory = filter === 'all' || i.category === filter
    const matchSeason = seasonFilter === 'all' || i.season === seasonFilter || !i.season
    return matchCategory && matchSeason
  })

  const outfitIds = new Set(outfit.map((i) => i.id))

  const handleOutfitDrop = useCallback((e) => {
    e.preventDefault()
    setOutfitDropActive(false)
    try {
      const data = e.dataTransfer.getData('application/json')
      if (!data) return
      const item = JSON.parse(data)
      setOutfit((prev) => {
        const exists = prev.some((i) => i.id === item.id)
        if (exists) return prev
        const next = [...prev, item]
        saveOutfit(next)
        return next
      })
    } catch {
      // ignore
    }
  }, [])

  const removeFromOutfit = useCallback((id) => {
    setOutfit((prev) => {
      const next = prev.filter((i) => i.id !== id)
      saveOutfit(next)
      return next
    })
  }, [])

  const handleOutfitDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setOutfitDropActive(true)
  }, [])

  const handleOutfitDragLeave = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOutfitDropActive(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-mesh bg-[length:200%_200%] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link
            to="/"
            className="font-display text-2xl sm:text-3xl font-bold holographic-text w-fit"
          >
            ← Y2K Closet
          </Link>
        </header>

        {/* Outfit builder: drag items from closet here */}
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            🪩 My outfit
          </h2>
          <div
            onDrop={handleOutfitDrop}
            onDragOver={handleOutfitDragOver}
            onDragLeave={handleOutfitDragLeave}
            className={`
              min-h-[140px] rounded-3xl border-2 border-dashed border-y2k-pink/60
              bg-white/40 backdrop-blur-sm p-4 sm:p-6 transition-all duration-200 touch-manipulation
              ${outfitDropActive ? 'drag-over' : ''}
            `}
          >
            <p className="text-sm text-gray-600 mb-4">
              Drag items from your closet below to build an outfit.
            </p>
            <div className="flex flex-wrap gap-4">
              {outfit.length === 0 ? (
                <span className="text-y2k-pink/70 font-medium">Drop items here ✨</span>
              ) : (
                outfit.map((item) => (
                  <div key={item.id} className="w-24 sm:w-28 flex-shrink-0">
                    <ItemCard
                      item={item}
                      onRemove={removeFromOutfit}
                      isInOutfit
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="mb-10 max-w-md">
          <AddItemForm onAdd={addItem} />
        </section>

        <section className="mb-6">
          <Filters
            activeFilter={filter}
            onFilterChange={setFilter}
            activeSeasonFilter={seasonFilter}
            onSeasonFilterChange={setSeasonFilter}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-4">
            Your closet ({filteredItems.length})
          </h2>
          {filteredItems.length === 0 ? (
            <div className="rounded-3xl bg-white/50 border-2 border-dashed border-y2k-pink/40 p-12 text-center text-gray-600">
              <p className="text-lg">No items yet. Add something to get started! 👗</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onDragStart={() => { }}
                  onRemoveFromCloset={removeItem}
                  isInOutfit={outfitIds.has(item.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
