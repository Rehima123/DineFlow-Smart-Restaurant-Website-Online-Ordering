import MenuItem from '../models/MenuItem.js'

// GET /api/menu
export async function getMenuItems(req, res) {
  try {
    const { category, search } = req.query
    const filter = {}

    if (category && category !== 'all') {
      filter.category = category
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    const items = await MenuItem.find(filter).sort({ popular: -1, createdAt: -1 })
    res.json({ items })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/menu/:id
export async function getMenuItem(req, res) {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Menu item not found' })
    res.json({ item })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/menu (admin only)
export async function createMenuItem(req, res) {
  try {
    const item = await MenuItem.create(req.body)
    res.status(201).json({ item, message: 'Menu item created' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// PUT /api/menu/:id (admin only)
export async function updateMenuItem(req, res) {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!item) return res.status(404).json({ message: 'Menu item not found' })
    res.json({ item, message: 'Menu item updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE /api/menu/:id (admin only)
export async function deleteMenuItem(req, res) {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Menu item not found' })
    res.json({ message: 'Menu item deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
