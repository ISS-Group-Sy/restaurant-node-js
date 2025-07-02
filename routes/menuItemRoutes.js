const express = require('express');
const menuItemRouter = express.Router();
const menuItemController = require('../controllers/menuItemController');
const isAuth = require('../middleware/auth');
const upload = require('../middleware/upload');

menuItemRouter.get('/api/get-menu-items', menuItemController.getAllMenuItems_get);
menuItemRouter.post('/api/create-menu-item', upload.single('image'), isAuth, menuItemController.createMenuItem_post);
menuItemRouter.patch('/api/update-menu-item/:id', upload.single('image'), isAuth, menuItemController.updateMenuItem_patch);
menuItemRouter.delete('/api/delete-menu-item/:id', isAuth, menuItemController.deleteMenuItem_delete);

module.exports = menuItemRouter;
