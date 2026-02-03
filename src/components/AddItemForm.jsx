import { useState, useRef } from 'react'

const CATEGORIES = [
  { value: 'top', label: 'Top', emoji: '👕' },
  { value: 'bottom', label: 'Bottom', emoji: '👖' },
  { value: 'shoes', label: 'Shoes', emoji: '👟' },
  { value: 'accessory', label: 'Accessory', emoji: '✨' },
]

const PLACEHOLDER_IMAGE = 'https://placehold.co/400x400/e6e6fa/6b7280?text=No+Image'

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('top')
  const [imageUrl, setImageUrl] = useState('')
  const fileInputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      imageUrl: imageUrl.trim() || PLACEHOLDER_IMAGE,
    })
    setName('')
    setCategory('top')
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
