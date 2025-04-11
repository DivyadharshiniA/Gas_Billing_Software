import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({
    buyerName: '',
    invoiceNo: '',
    date: '',
    items: [{ description: '', quantity: '', rate: '', amount: 0 }],
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/invoices`)
      .then((res) => {
        const found = res.data.find(inv => inv._id === id);
        if (found) setInvoice(found);
        else alert("Invoice not found");
      })
      .catch((err) => console.error("Error loading invoice:", err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoice.items];
    updatedItems[index][field] =
      field === 'quantity' || field === 'rate' ? parseFloat(value) : value;

    const qty = parseFloat(updatedItems[index].quantity || 0);
    const rate = parseFloat(updatedItems[index].rate || 0);
    updatedItems[index].amount = qty * rate;

    setInvoice({ ...invoice, items: updatedItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: '', rate: '', amount: 0 }]
    });
  };

  const updateInvoice = async () => {
    try {
      console.log("Sending updated data:", invoice);
      const res = await axios.put(`http://localhost:5000/api/invoices/${id}`, invoice);
      alert("Invoice updated successfully!");
      navigate("/invoices");
    } catch (err) {
      console.error(" Update failed:", err.response?.data || err.message);
      alert("Failed to update invoice");
    }
  };

  return (
    <div className="edit-invoice">
      <h2>Edit Invoice</h2>
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
        <input
          type="date"
          name="date"
          value={invoice.date ? invoice.date.slice(0, 10) : ''}
          onChange={handleInputChange}
        />
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
      <button onClick={updateInvoice} style={{ marginTop: '1rem', background: 'green', color: 'white' }}>
         Update Invoice
      </button>
    </div>
  );
}

export default EditInvoice;
