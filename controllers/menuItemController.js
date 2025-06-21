const express = require('express');
const MenuItem = require('../models/menu_item');

// Get all menu items مع pagination
module.exports.getAllMenuItems_get = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const menuItems = await MenuItem.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalMenuItems = await MenuItem.countDocuments();

    res.status(200).json({
      message: 'Menu items fetched successfully',
      data: menuItems,
      pagination: {
        totalMenuItems,
        currentPage: page,
        totalPages: Math.ceil(totalMenuItems / limit),
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error while fetching menu items',
      error: err.message,
    });
  }
};

// Create a new menu item مع تحقق دقيق
module.exports.createMenuItem_post = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageFile = req.file;

    // تحقق من وجود كل الحقول
    if (!name || !description || !price || !category || !imageFile) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // تحقق من نوع الحقول

    // name: ليس فارغ وطوله ≤ 50
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Name must not be empty' });
    }
    if (name.length > 50) {
      return res.status(400).json({ message: 'Name cannot exceed 50 characters' });
    }

    // description: نص وليس فارغ
    if (typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({ message: 'Description must not be empty' });
    }

    // price: يجب أن يكون رقم موجب
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
      return res.status(400).json({ message: 'Price must be a valid number' });
    }
    if (priceNum < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    // category: نص وليس فارغ
    if (typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ message: 'Category must not be empty' });
    }

    // صورة واحدة فقط
    if (!imageFile) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const imagePath = `/images/${imageFile.filename}`;

    const newMenuItem = await MenuItem.create({
      image: imagePath,
      name: name.trim(),
      description: description.trim(),
      price: priceNum,
      category: category.trim(),
    });

    res.status(201).json({
      message: 'Menu item created successfully',
      item: newMenuItem,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error while creating menu item',
      error: err.message,
    });
  }
};

// Update menu item مع تحقق مشابه
module.exports.updateMenuItem_patch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    const imageFile = req.file;

    const item = await MenuItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // تحقق الحقول المرسلة فقط (اختياري)
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Name must not be empty if provided' });
      }
      if (name.length > 50) {
        return res.status(400).json({ message: 'Name cannot exceed 50 characters' });
      }
      item.name = name.trim();
    }

    if (description !== undefined) {
      if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ message: 'Description must not be empty if provided' });
      }
      item.description = description.trim();
    }

    if (price !== undefined) {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum)) {
        return res.status(400).json({ message: 'Price must be a valid number if provided' });
      }
      if (priceNum < 0) {
        return res.status(400).json({ message: 'Price cannot be negative' });
      }
      item.price = priceNum;
    }

    if (category !== undefined) {
      if (typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({ message: 'Category must not be empty if provided' });
      }
      item.category = category.trim();
    }

    if (imageFile) {
      item.image = `/images/${imageFile.filename}`;
    }

    await item.save();

    res.status(200).json({
      message: 'Menu item updated successfully',
      item,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error while updating menu item',
      error: err.message,
    });
  }
};

// Delete menu item
module.exports.deleteMenuItem_delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Server error while deleting menu item',
      error: err.message,
    });
  }
};
