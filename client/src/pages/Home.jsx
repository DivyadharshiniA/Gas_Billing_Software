// import React from 'react';
// import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <div style={container}>
//       <h1>Welcome to Billing Software</h1>
//       <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
//         Easily create and manage professional invoices.
//       </p>

//       <div style={btnGroup}>
//         <Link to="/create" style={btnStyle('#002E61')}> Create Invoice</Link>
//         <Link to="/invoices" style={btnStyle('#002E61')}> View Invoices</Link>
//         <Link to="/dashboard" style={btnStyle('#002E61')}> Dashboard</Link>
//       </div>
//     </div>
//   );
// }

// const container = {
//   textAlign: 'center',
//   padding: '3rem',
// };

// const btnGroup = {
//   display: 'flex',
//   justifyContent: 'center',
//   gap: '1rem',
//   flexWrap: 'wrap'
// };

// const btnStyle = (bg) => ({
//   background: bg,
//   color: 'white',
//   padding: '12px 24px',
//   borderRadius: '6px',
//   textDecoration: 'none',
//   fontSize: '16px',
//   fontWeight: 'bold',
//   transition: '0.2s ease',
// });

// export default Home;

import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Agnee Gas Distributor Billing Software</h1>
          <p>Create invoices, manage customers, and grow your business easily and professionally.</p>
          <button className="hero-btn">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-box">
          <h3>Easy Invoicing</h3>
          <p>Create professional GST-compliant invoices instantly with print & PDF support.</p>
        </div>
        <div className="feature-box">
          <h3>Customer Management</h3>
          <p>Track customer data, invoice history, and automate reminders effortlessly.</p>
        </div>
        <div className="feature-box">
          <h3>GST & Reports</h3>
          <p>Auto-calculate GST and generate reports for accounting and audits.</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-box">
          <h4>Contact</h4>
          <p>📞 8072991484</p>
          <p>📧 sathishp@gmail.com</p>
          <p>📍 3/168B Irrukur, Paramathi Velur, Namakkal - 637204</p>
        </div>
        <div className="footer-box">
          <h4>Company</h4>
          <p>Agnee Gas Distributor</p>
          <p>CEO: Mr. Sathish P</p>
          <p>GSTIN/UIN: 33HVVPS5257L1ZH</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
