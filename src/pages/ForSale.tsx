import React from 'react';
import { useI18n } from '../i18n/I18nProvider';

const ForSale: React.FC = () => {
  const { t } = useI18n()
  return (
    <div>
      <h1>{t('pages.forSale')}</h1>
      <p>{t('pages.placeholder')}</p>
    </div>
  );
};

export default ForSale;
