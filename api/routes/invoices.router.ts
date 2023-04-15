import express, { Router } from 'express';
const invoiceController = require('../controllers/invoice.controller');
const router: Router = express.Router();

router.post('/viewInvoices', invoiceController.view_invoices);
router.post('/viewId', invoiceController.view_invoice_id);
router.post('/update', invoiceController.update_invoice);
router.post('/delete', invoiceController.delete_invoice); 
router.post('/create', invoiceController.create_invoice);
module.exports = router;
