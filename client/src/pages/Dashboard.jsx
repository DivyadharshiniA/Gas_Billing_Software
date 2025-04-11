// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';

// function Dashboard() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/invoices/dashboard/stats')
//       .then(res => setStats(res.data))
//       .catch(err => console.error("Dashboard error:", err));
//   }, []);

//   if (!stats) return <p>Loading dashboard...</p>;

//   // Prepare chart data
//   const barData = stats.recentInvoices.map(inv => ({
//     name: inv.invoiceNo,
//     amount: inv.items.reduce((sum, item) => sum + item.amount, 0)
//   }));

//   const pieMap = {};
//   stats.recentInvoices.forEach(inv => {
//     const amount = inv.items.reduce((sum, item) => sum + item.amount, 0);
//     pieMap[inv.buyerName] = (pieMap[inv.buyerName] || 0) + amount;
//   });

//   const pieData = Object.entries(pieMap).map(([buyer, amount]) => ({
//     name: buyer,
//     value: amount
//   }));

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA6FC5'];

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Dashboard</h2>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
//         <div style={cardStyle}>
//           <h3>Total Revenue</h3>
//           <p style={{ fontSize: '1.4rem' }}>₹ {stats.totalRevenue.toFixed(2)}</p>
//         </div>
//         <div style={cardStyle}>
//           <h3>Total Invoices</h3>
//           <p style={{ fontSize: '1.4rem' }}>{stats.totalInvoices}</p>
//         </div>
//         <div style={cardStyle}>
//           <h3>Unique Buyers</h3>
//           <p style={{ fontSize: '1.4rem' }}>{stats.totalBuyers}</p>
//         </div>
//       </div>

//       <h3>Recent Invoices</h3>
//       <table border="1" style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '2rem' }}>
//         <thead>
//           <tr>
//             <th>Invoice No</th>
//             <th>Buyer</th>
//             <th>Date</th>
//             <th>Amount (₹)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stats.recentInvoices.map(inv => (
//             <tr key={inv._id}>
//               <td>{inv.invoiceNo}</td>
//               <td>{inv.buyerName}</td>
//               <td>{new Date(inv.date).toLocaleDateString()}</td>
//               <td>{inv.items.reduce((a, i) => a + i.amount, 0).toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
//         {/* Bar Chart */}
//         <div style={{ flex: 1, minWidth: '300px' }}>
//           <h3>Revenue by Invoice</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="amount" fill="#007bff" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart */}
//         <div style={{ flex: 1, minWidth: '300px' }}>
//           <h3>Revenue by Buyer</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={100}
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// const cardStyle = {
//   background: '#f5f5f5',
//   padding: '1rem',
//   borderRadius: '8px',
//   flex: 1,
//   boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error("Dashboard error:", err));
  }, []);

  if (!stats) return <p style={{ padding: '2rem' }}>Loading dashboard...</p>;

  // Prepare chart data
  const barData = stats.recentInvoices.map(inv => ({
    name: inv.invoiceNo,
    amount: inv.items.reduce((sum, item) => sum + item.amount, 0)
  }));

  const pieMap = {};
  stats.recentInvoices.forEach(inv => {
    const amount = inv.items.reduce((sum, item) => sum + item.amount, 0);
    pieMap[inv.buyerName] = (pieMap[inv.buyerName] || 0) + amount;
  });

  const pieData = Object.entries(pieMap).map(([buyer, amount]) => ({
    name: buyer,
    value: amount
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA6FC5'];

  return (
    <div style={{ padding: '2rem', background: '#f9f9fc', minHeight: '100vh' }}>
      <style>{tableStyles}</style>

      <h2 style={{ marginBottom: '1.5rem' }}> Dashboard Overview</h2>

      {/* Summary Cards */}
      <div style={cardGrid}>
        <div style={{ ...card, borderLeft: '5px solid #28a745' }}>
          <h4>Total Revenue</h4>
          <p style={value}>₹ {stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div style={{ ...card, borderLeft: '5px solid #007bff' }}>
          <h4>Total Invoices</h4>
          <p style={value}>{stats.totalInvoices}</p>
        </div>
        <div style={{ ...card, borderLeft: '5px solid #ffc107' }}>
          <h4>Unique Buyers</h4>
          <p style={value}>{stats.totalBuyers}</p>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div style={{ marginTop: '2.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}> Recent Invoices</h3>
        <div style={tableWrapper}>
          <table style={styledTable}>
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Buyer</th>
                <th>Date</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentInvoices.map(inv => (
                <tr key={inv._id}>
                  <td>{inv.invoiceNo}</td>
                  <td>{inv.buyerName}</td>
                  <td>{new Date(inv.date).toLocaleDateString()}</td>
                  <td>₹{inv.items.reduce((a, i) => a + i.amount, 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '3rem' }}>
        {/* Bar Chart */}
        <div style={chartBox}>
          <h3 style={chartTitle}>Revenue by Invoice</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={chartBox}>
          <h3 style={chartTitle}>Revenue by Buyer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// 💡 UI Styles
const cardGrid = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap',
};

const card = {
  background: '#fff',
  padding: '1rem 1.5rem',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  flex: 1,
  minWidth: '220px'
};

const value = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#002E61',
  marginTop: '0.5rem'
};

const tableWrapper = {
  overflowX: 'auto',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  backgroundColor: '#fff',
};

const styledTable = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'Segoe UI, sans-serif',
};

const tableStyles = `
  table thead {
    background-color: #002E61;
    color: white;
  }
  table th, table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const chartBox = {
  flex: 1,
  minWidth: '300px',
  padding: '1rem',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
};

const chartTitle = {
  textAlign: 'center',
  marginBottom: '1rem',
  color: '#002E61'
};

export default Dashboard;
