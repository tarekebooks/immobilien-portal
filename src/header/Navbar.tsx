import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { LuBuilding2 } from "react-icons/lu";
import { useI18n, languageOptions } from '../i18n/I18nProvider';

const Navbar: React.FC = () => {
  const { t, lang, setLang } = useI18n()

  return (
    <header>
        <h1 className="logo"><LuBuilding2 className='logo-icon'/>IMMOPORTAL</h1>
        <ul className="nav-items">
            <li><Link to="/">{t('nav.search')}</Link></li>
            <li><Link  to="/for-sale">{t('nav.prices')}</Link></li>
            <li><Link  to="/for-rent">{t('nav.agencies')}</Link></li>
            <li><Link  to="/contact">{t('nav.news')}</Link></li>
        </ul>
        <div className="authentication">
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value as typeof lang)}
              aria-label="Language"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <button className="login-btn">{t('nav.login')}</button>
            <button className="register-btn">{t('nav.post')}</button>
        </div>

    </header>
  )
}

export default Navbar;
