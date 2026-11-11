import Category from '../models/Category.js'

// GET /api/categories
export async function getCategories(req, res) {
  try {
    const categories = await Category.find().sort({ createdAt: 1 })
    res.json({ categories })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/categories (admin)
export async function createCategory(req, res) {
  try {
    const cat = await Category.create(req.body)
    res.status(201).json({ category: cat, message: 'Category created' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// PUT /api/categories/:id (admin)
export async function updateCategory(req, res) {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!cat) return res.status(404).json({ message: 'Category not found' })
    res.json({ category: cat, message: 'Category updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE /api/categories/:id (admin)
export async function deleteCategory(req, res) {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id)
    if (!cat) return res.status(404).json({ message: 'Category not found' })
    res.json({ message: 'Category deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
