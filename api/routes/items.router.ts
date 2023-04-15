import express, { Router } from 'express';
const itemController = require('../controllers/item.controller');
const router: Router = express.Router();

router.post('/viewItems', itemController.view_items);
router.post('/viewId', itemController.view_item_id);
router.post('/update', itemController.update_item);
router.post('/delete', itemController.delete_item); 
router.post('/create', itemController.create_item);
module.exports = router;
