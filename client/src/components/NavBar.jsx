import { useState } from 'react';
import logo from "../assets/cod-logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="nav">
        <div className="nav-left">
          <div className="logo-container">
            <Link to="/" className="link">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
        </div>
        <div className="nav-right">
          <div className="menu-toggle" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="menu-icon" />
          </div>
          <ul className={`list nav-list ${isMenuOpen ? 'open' : ''}`}>
            <li className="list-item">
              <Link to="/heroes" className="link">Heroes</Link>
            </li>
            <li className="list-item">
              <a href="/" className="link">About</a>
            </li>
            <li className="list-item">
              <a href="/" className="link">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;