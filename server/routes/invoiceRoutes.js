const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// ➕ Create new invoice
router.post('/', async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    const saved = await invoice.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📥 Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get single invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update invoice by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(updatedInvoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📊 Get Dashboard Stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const invoices = await Invoice.find();

    const totalRevenue = invoices.reduce((acc, inv) => {
      const sum = inv.items.reduce((s, item) => s + item.amount, 0);
      return acc + sum;
    }, 0);

    const uniqueBuyers = new Set(invoices.map(inv => inv.buyerName));
    const recentInvoices = invoices
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.status(200).json({
      totalRevenue,
      totalInvoices: invoices.length,
      totalBuyers: uniqueBuyers.size,
      recentInvoices
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
