import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1>Agnee Gas Distributors</h1>
      <nav>
        <Link to="/">Create Invoice</Link> | <Link to="/invoices">View Invoices</Link>
        <Link to="/dashboard" className="nav-link"> Dashboard</Link>

      </nav>
    </header>
  );
}

export default Header;
