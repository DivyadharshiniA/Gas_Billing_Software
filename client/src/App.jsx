// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// import Home from './pages/Home';
// import InvoiceForm from './components/InvoiceForm';
// import InvoiceList from './pages/InvoiceList';
// import EditInvoice from './pages/EditInvoice';
// import Dashboard from './pages/Dashboard';

// import './styles/style.css';

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <nav style={navStyle}>
//           <h2 style={{ color: 'white', margin: 0 }}>Billing Software</h2>
//           <ul style={ulStyle}>
//             <li><Link to="/" style={linkStyle}>Home</Link></li>
//             <li><Link to="/create" style={linkStyle}>Create Invoice</Link></li>
//             <li><Link to="/invoices" style={linkStyle}>View Invoices</Link></li>
//             <li><Link to="/dashboard" style={linkStyle}>Dashboard</Link></li>
//           </ul>
//         </nav>

//         <div style={{ padding: '2rem' }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/create" element={<InvoiceForm />} />
//             <Route path="/invoices" element={<InvoiceList />} />
//             <Route path="/edit/:id" element={<EditInvoice />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// const navStyle = {
//   background: '#002E61',
//   padding: '1rem 2rem',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center'
// };

// const ulStyle = {
//   display: 'flex',
//   gap: '1.5rem',
//   listStyle: 'none',
//   margin: 0,
//   padding: 0
// };

// const linkStyle = {
//   color: 'white',
//   textDecoration: 'none',
//   fontWeight: 'bold',
//   fontSize: '16px'
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './pages/InvoiceList';
import EditInvoice from './pages/EditInvoice';
import Dashboard from './pages/Dashboard';

import './styles/style.css'; // if you have any CSS

function App() {
  return (
    <Router>
      <div className="app">
        <nav style={navStyle}>
          <h2 style={{ color: 'white' }}>Agnee Gas Distributors</h2>
          <ul style={ulStyle}>
            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/create" style={linkStyle}>  Create Invoice</Link></li>
            <li><Link to="/invoices" style={linkStyle}>  View Invoices</Link></li>
            <li><Link to="/dashboard" style={linkStyle}>  Dashboard</Link></li>
          </ul>
        </nav>

        <div style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<InvoiceForm />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/edit/:id" element={<EditInvoice />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Basic styling
const navStyle = {
  background: '#002E61',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const ulStyle = {
  display: 'flex',
  gap: '1rem',
  listStyle: 'none',
  margin: 0,
  padding: 0
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default App;
