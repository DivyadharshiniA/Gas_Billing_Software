// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// function InvoiceList() {
//   const [invoices, setInvoices] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   const fetchInvoices = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/invoices');
//       setInvoices(res.data);
//     } catch (err) {
//       console.error('Failed to fetch invoices:', err);
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/edit/${id}`);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownloadPDF = () => {
//     const input = document.getElementById('invoice-table');
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'pt', 'a4');
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save('invoices.pdf');
//     });
//   };

//   const filteredInvoices = invoices.filter(inv =>
//     inv.buyerName.toLowerCase().includes(searchTerm)
//   );

//   return (
//     <div style={{ padding: '1.5rem' }}>
//       <h2>View Invoices</h2>

//       <input
//         type="text"
//         placeholder="Search by buyer name"
//         value={searchTerm}
//         onChange={handleSearchChange}
//         style={{
//           padding: '6px 10px',
//           borderRadius: '4px',
//           border: '1px solid #ccc',
//           marginBottom: '1rem',
//           width: '250px'
//         }}
//       />

//       {filteredInvoices.length === 0 ? (
//         <p>No matching invoices found.</p>
//       ) : (
//         <>
//           <div id="invoice-table" style={{ overflowX: 'auto' }}>
//             <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr>
//                   <th>Invoice No</th>
//                   <th>Buyer</th>
//                   <th>Date</th>
//                   <th>Total (₹)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredInvoices.map((inv) => {
//                   const total = inv.items.reduce((sum, item) => sum + item.amount, 0);
//                   return (
//                     <tr key={inv._id}>
//                       <td>{inv.invoiceNo}</td>
//                       <td>{inv.buyerName}</td>
//                       <td>{new Date(inv.date).toLocaleDateString()}</td>
//                       <td>₹{total.toFixed(2)}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//             <button onClick={handleDownloadPDF} style={buttonStyle('#28a745')}>
//               📄 Download PDF
//             </button>

//             <button onClick={handlePrint} style={buttonStyle('#6c757d')}>
//               🖨 Print Table
//             </button>

//             <button
//               onClick={() => navigate('/create')}
//               style={buttonStyle('#007bff')}
//             >
//               ➕ Create/Edit Invoice
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// const buttonStyle = (bg) => ({
//   background: bg,
//   color: '002E61',
//   padding: '8px 16px',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
//   fontSize: '14px'
// });

// export default InvoiceList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/invoices');
      setInvoices(res.data);
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('invoice-table');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoices.pdf');
    });
  };

  const filteredInvoices = invoices.filter(inv =>
    inv.buyerName.toLowerCase().includes(searchTerm)
  );

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>View Invoices</h2>

      <input
        type="text"
        placeholder="Search by buyer name"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: '6px 10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '1rem',
          width: '250px'
        }}
      />

      {filteredInvoices.length === 0 ? (
        <p>No matching invoices found.</p>
      ) : (
        <>
          <div id="invoice-table" style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Buyer</th>
                  <th>Date</th>
                  <th>Total (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => {
                  const total = inv.items.reduce((sum, item) => sum + item.amount, 0);
                  return (
                    <tr key={inv._id}>
                      <td>{inv.invoiceNo}</td>
                      <td>{inv.buyerName}</td>
                      <td>{new Date(inv.date).toLocaleDateString()}</td>
                      <td>₹{total.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(inv._id)}
                          style={buttonStyle('#002E61')}
                        >
                           Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleDownloadPDF} style={buttonStyle('#28a745')}>
               Download PDF
            </button>

            <button onClick={handlePrint} style={buttonStyle('#6c757d')}>
              🖨 Print Table
            </button>

            <button
              onClick={() => navigate('/create')}
              style={buttonStyle('#007bff')}
            >
               Create Invoice
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// 💠 Improved Table Styling
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '6px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

const buttonStyle = (bg) => ({
  background: bg,
  color: 'white',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px'
});

export default InvoiceList;
