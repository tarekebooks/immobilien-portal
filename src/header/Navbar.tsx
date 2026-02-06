import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { LuBuilding2 } from "react-icons/lu";

const Navbar: React.FC = () => {
  return (
    <header>
        <h1 className="logo"><LuBuilding2 className='logo-icon'/>immoprotal</h1>
        <ul className="nav-items">
            <li><Link to="/">Home</Link></li>
            <li><Link  to="/for-sale">For-Sale</Link></li>
            <li><Link  to="/for-rent">For-Rent</Link></li>
            <li><Link  to="/contact">Contact</Link></li>
        </ul>
        <div className="authentication">
            <button className="login-btn">Authenticate</button>
            <button className="register-btn">Create new Estate</button>
        </div>

    </header>
  )
}

export default Navbar;