import React from 'react';
import './footer.css';
import { LuBuilding2 } from "react-icons/lu";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { useI18n } from '../i18n/I18nProvider';

const Footer: React.FC = () => {
    const { t } = useI18n()

    return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <h2><LuBuilding2 /> IMMOPORTAL</h2>
          <p>{t('footer.tagline')}</p>
          <div className="socials">
            <button aria-label="Facebook"><FiFacebook /></button>
            <button aria-label="Instagram"><FiInstagram /></button>
            <button aria-label="Twitter"><FiTwitter /></button>
          </div>
        </div>
        <div className="footer-columns">
          <div>
            <h4>{t('footer.services')}</h4>
            <a href="#">{t('footer.listing')}</a>
            <a href="#">{t('footer.valuation')}</a>
            <a href="#">{t('footer.finance')}</a>
            <a href="#">{t('footer.market')}</a>
          </div>
          <div>
            <h4>{t('footer.properties')}</h4>
            <a href="#">{t('footer.buy')}</a>
            <a href="#">{t('footer.rent')}</a>
            <a href="#">{t('footer.newBuild')}</a>
            <a href="#">{t('footer.commercial')}</a>
          </div>
          <div>
            <h4>{t('footer.about')}</h4>
            <a href="#">{t('footer.contact')}</a>
            <a href="#">{t('footer.careers')}</a>
            <a href="#">{t('footer.imprint')}</a>
            <a href="#">{t('footer.press')}</a>
          </div>
          <div>
            <h4>{t('footer.app')}</h4>
            <div className="app-badges">
              <button>{t('footer.appStore')}</button>
              <button>{t('footer.googlePlay')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t('footer.rights')}</span>
        <span>{t('footer.legal')}</span>
      </div>
    </footer>
  );
};

export default Footer;
