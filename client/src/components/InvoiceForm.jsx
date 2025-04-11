import React, { useState } from 'react';
import axios from 'axios';

function InvoiceForm() {
  const [invoice, setInvoice] = useState({
    buyerName: '',
    invoiceNo: '',
    date: '',
    items: [
      { description: '', quantity: '', rate: '', amount: 0 }
    ]
  });

  const handleItemChange = (index, field, value) => {
    const items = [...invoice.items];
    items[index][field] = value;

    if (field === 'quantity' || field === 'rate') {
      const qty = parseFloat(items[index].quantity || 0);
      const rate = parseFloat(items[index].rate || 0);
      items[index].amount = qty * rate;
    }

    setInvoice({ ...invoice, items });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: '', rate: '', amount: 0 }]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const saveInvoice = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/invoices', invoice);
      alert(' Invoice saved successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(' Error saving invoice:', err);
      alert('Failed to save invoice');
    }
  };

  return (
    <div className="invoice-form">
      <h2>Create Invoice</h2>
      <div className="form-group">
        <label>Buyer Name:</label>
        <input type="text" name="buyerName" value={invoice.buyerName} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Invoice No:</label>
        <input type="text" name="invoiceNo" value={invoice.invoiceNo} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input type="date" name="date" value={invoice.date} onChange={handleInputChange} />
      </div>

      <h3>Items</h3>
      {invoice.items.map((item, idx) => (
        <div className="item-row" key={idx}>
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
          />
          <input
            type="number"
            placeholder="Rate"
            value={item.rate}
            onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
          />
          <span>₹ {item.amount.toFixed(2)}</span>
        </div>
      ))}

      <button onClick={addItem}>+ Add Item</button>
      <br />
      <button onClick={saveInvoice} style={{ marginTop: '1rem', background: 'green', color: 'white' }}>
         Save Invoice
      </button>
    </div>
  );
}

export default InvoiceForm;
