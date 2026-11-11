import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react'
import { menuAPI, categoryAPI } from '../../services/endpoints'
import { menuItems as sampleMenu, categories as sampleCats } from '../../data/menuData'
import toast from 'react-hot-toast'

export default function AdminMenu() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const blankItem = { name: '', description: '', price: '', category: 'mains', image: '', popular: false, vegetarian: false, tags: [], rating: 4.5, reviews: 0 }

  useEffect(() => {
    const load = async () => {
      try {
        const [menuRes, catRes] = await Promise.all([menuAPI.getAll(), categoryAPI.getAll()])
        setItems(menuRes.items || [])
        setCategories(catRes.categories?.filter((c) => c.id !== 'all') || [])
      } catch {
        setItems(sampleMenu)
        setCategories(sampleCats.filter((c) => c.id !== 'all'))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSave = async (item) => {
    try {
      if (item.id || item._id) {
        await menuAPI.update(item.id || item._id, item)
        setItems(items.map((i) => (i.id === item.id ? item : i)))
        toast.success('Item updated successfully')
      } else {
        try { await menuAPI.create(item) } catch { /* offline */ }
        const newItem = { ...item, id: Date.now() }
        setItems([...items, newItem])
        toast.success('Item created successfully')
      }
    } catch {
      // Offline fallback
      if (item.id) {
        setItems(items.map((i) => (i.id === item.id ? item : i)))
      } else {
        setItems([...items, { ...item, id: Date.now() }])
      }
      toast.success('Item saved (demo mode)')
    }
    setShowForm(false)
    setEditing(null)
  }

  const handleDelete = async (id) => {
    try { await menuAPI.remove(id) } catch { /* offline */ }
    setItems(items.filter((i) => i.id !== id && i._id !== id))
    toast.success('Item deleted')
    setConfirmDelete(null)
  }

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))

  if (loading) return <div className="flex justify-center py-20"><div className="spinner w-12 h-12" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Menu Management</h1>
          <p className="text-gray-500 text-sm">Add, edit, and manage your dishes</p>
        </div>
        <button
          onClick={() => { setEditing(blankItem); setShowForm(true) }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Item
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div key={item.id || item._id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-display text-base font-semibold text-gray-900">{item.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-1 mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-orange-500">${Number(item.price).toFixed(2)}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => { setEditing(item); setShowForm(true) }}
                    className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                    aria-label="Edit"
                  >
                    <Pencil className="w-4 h-4 text-blue-500" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(item)}
                    className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form modal */}
      {showForm && editing && (
        <MenuItemForm
          item={editing}
          categories={categories}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null) }}
        />
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">Delete this item?</h3>
            <p className="text-sm text-gray-500 mb-6">"{confirmDelete.name}" will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete.id || confirmDelete._id)} className="flex-1 px-4 py-2.5 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MenuItemForm({ item, categories, onSave, onClose }) {
  const [form, setForm] = useState({
    ...item,
    price: item.price ? String(item.price) : '',
    tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      price: parseFloat(form.price) || 0,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
      image: form.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    }
    onSave(payload)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-xl font-bold text-gray-900">{item.id || item._id ? 'Edit Item' : 'Add New Item'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input name="name" type="text" value={form.name} onChange={handleChange} className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows="2" value={form.description} onChange={handleChange} className="input-field" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field cursor-pointer">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image" type="url" value={form.image} onChange={handleChange} className="input-field" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input name="tags" type="text" value={form.tags} onChange={handleChange} className="input-field" placeholder="Best Seller, Vegetarian" />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input type="checkbox" name="popular" checked={form.popular} onChange={handleChange} className="w-4 h-4 rounded accent-orange-500" />
              Popular
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input type="checkbox" name="vegetarian" checked={form.vegetarian} onChange={handleChange} className="w-4 h-4 rounded accent-orange-500" />
              Vegetarian
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 btn-primary">Save Item</button>
          </div>
        </form>
      </div>
    </div>
  )
}
