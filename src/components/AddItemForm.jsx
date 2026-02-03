import { useState, useRef } from 'react'

const CATEGORIES = [
  { value: 'top', label: 'Top', emoji: '👕' },
  { value: 'bottom', label: 'Bottom', emoji: '👖' },
  { value: 'shoes', label: 'Shoes', emoji: '👟' },
  { value: 'accessory', label: 'Accessory', emoji: '✨' },
]

const SEASONS = [
  { value: 'spring', label: 'Spring', emoji: '🌸' },
  { value: 'summer', label: 'Summer', emoji: '☀️' },
  { value: 'fall', label: 'Fall', emoji: '🍂' },
  { value: 'winter', label: 'Winter', emoji: '❄️' },
]

const PLACEHOLDER_IMAGE = 'https://placehold.co/400x400/e6e6fa/6b7280?text=No+Image'

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('top')
  const [season, setSeason] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [removingBg, setRemovingBg] = useState(false)
  const fileInputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      season: season || null,
      imageUrl: imageUrl.trim() || PLACEHOLDER_IMAGE,
    })
    setName('')
    setCategory('top')
    setSeason('')
    setImageUrl('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => setImageUrl(reader.result)
    reader.readAsDataURL(file)
  }

  async function handleRemoveBackground() {
    if (!imageUrl || !imageUrl.startsWith('data:')) return
    setRemovingBg(true)
    try {
      const mod = await import('@imgly/background-removal')
      const removeBackground = mod.default ?? mod.removeBackground
      const blob = await removeBackground(imageUrl)
      const reader = new FileReader()
      reader.onload = () => setImageUrl(reader.result)
      reader.readAsDataURL(blob)
    } catch (err) {
      console.error('Background removal failed:', err)
      alert('Could not remove background. Try a different image or use the image as-is.')
    } finally {
      setRemovingBg(false)
    }
  }

  const canRemoveBg = imageUrl && imageUrl.startsWith('data:') && !removingBg

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl p-6 bg-gradient-to-br from-y2k-lavender/50 to-y2k-pink/30 border-2 border-y2k-pink/40 shadow-y2k"
    >
      <h3 className="font-display text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span>➕</span> Add to closet
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="item-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Butterfly crop top"
            className="w-full px-4 py-2.5 rounded-xl border-2 border-y2k-pink/40 focus:border-y2k-pink focus:ring-2 focus:ring-y2k-pink/30 outline-none transition"
            required
          />
        </div>

        <div>
          <label htmlFor="item-category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="item-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-y2k-pink/40 focus:border-y2k-pink focus:ring-2 focus:ring-y2k-pink/30 outline-none transition bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="item-season" className="block text-sm font-medium text-gray-700 mb-1">
            Season
          </label>
          <select
            id="item-season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-y2k-pink/40 focus:border-y2k-pink focus:ring-2 focus:ring-y2k-pink/30 outline-none transition bg-white"
          >
            <option value="">Any season</option>
            {SEASONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.emoji} {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image (URL or upload)
          </label>
          <input
            id="item-image-url"
            type="url"
            value={imageUrl.startsWith('data:') ? '' : imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://... or upload below"
            className="w-full px-4 py-2.5 rounded-xl border-2 border-y2k-pink/40 focus:border-y2k-pink focus:ring-2 focus:ring-y2k-pink/30 outline-none transition mb-2"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="item-image-file"
            />
            <label
              htmlFor="item-image-file"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-y2k-pink/40 bg-white cursor-pointer hover:bg-y2k-lavender/30 transition text-sm font-medium text-gray-700"
            >
              📷 Upload image
            </label>
            {canRemoveBg && (
              <button
                type="button"
                onClick={handleRemoveBackground}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-y2k-mint bg-y2k-mint/40 hover:bg-y2k-mint/60 transition text-sm font-medium text-gray-800"
              >
                ✂️ Make transparent PNG
              </button>
            )}
            {removingBg && (
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-y2k-pink border-t-transparent rounded-full animate-spin" />
                Removing background…
              </span>
            )}
            {imageUrl && (
              <button
                type="button"
                onClick={() => { setImageUrl(''); if (fileInputRef.current) fileInputRef.current.value = '' }}
                className="text-sm text-gray-500 hover:text-red-500"
              >
                Clear image
              </button>
            )}
          </div>
          {imageUrl && (imageUrl.startsWith('data:') || imageUrl.startsWith('http')) && (
            <div className="mt-2 w-20 h-20 rounded-xl overflow-hidden border-2 border-y2k-pink/30 bg-y2k-butter/30">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <button type="submit" className="btn-y2k w-full text-center text-y2k-pink">
          Add item ✨
        </button>
      </div>
    </form>
  )
}
