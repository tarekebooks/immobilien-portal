import React, { useState } from 'react'
import './search.css'
import { FiChevronRight, FiHeart, FiHome, FiTag } from 'react-icons/fi'
import { HiOutlineChartBar } from 'react-icons/hi'
import { FaBath, FaBed, FaMapMarkerAlt, FaRulerCombined, FaSearch } from 'react-icons/fa'
import { useI18n } from '../../i18n/I18nProvider'

type SearchMode = 'buy' | 'rent' | 'auctions'

const Search: React.FC = () => {
    const { t } = useI18n()
    const [mode, setMode] = useState<SearchMode>('buy')
    const [showFilters, setShowFilters] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <main className="home">
            <section className="banner-search">
                <div className="banner-search-inner">
                    <h1>{t('bannerSearch.title')}</h1>
                    <p>{t('bannerSearch.subtitle')}</p>
                    <div className="search-card">
                        <div className="search-tabs">
                            <button
                                className={mode === 'buy' ? 'active' : ''}
                                type="button"
                                onClick={() => setMode('buy')}
                                aria-pressed={mode === 'buy'}
                            >
                                {t('bannerSearch.buy')}
                            </button>
                            <button
                                className={mode === 'rent' ? 'active' : ''}
                                type="button"
                                onClick={() => setMode('rent')}
                                aria-pressed={mode === 'rent'}
                            >
                                {t('bannerSearch.rent')}
                            </button>
                            <button
                                className={mode === 'auctions' ? 'active' : ''}
                                type="button"
                                onClick={() => setMode('auctions')}
                                aria-pressed={mode === 'auctions'}
                            >
                                {t('bannerSearch.auctions')}
                            </button>
                        </div>
                        <form
                            className={`search-form ${showFilters ? 'expanded' : 'compact'}`}
                            onSubmit={handleSubmit}
                        >
                            <div className="search-row">
                                <div className="field">
                                <FaSearch />
                                <input
                                    type="text"
                                    placeholder={t('bannerSearch.placeholder')}
                                    aria-label={t('bannerSearch.locationLabel')}
                                    required
                                />
                                </div>
                                <div className="field select">
                                    <select aria-label={t('bannerSearch.propertyTypeLabel')} required>
                                        <option value="">{t('bannerSearch.all')}</option>
                                        <option value="house">{t('bannerSearch.house')}</option>
                                        <option value="apartment">{t('bannerSearch.apartment')}</option>
                                        <option value="commercial">{t('bannerSearch.commercial')}</option>
                                    </select>
                                </div>
                                {!showFilters ? (
                                    <button className="primary" type="submit">
                                        {t('bannerSearch.search')} ({mode})
                                    </button>
                                ) : null}
                                <button
                                    className={`filter-toggle ${showFilters ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => setShowFilters((prev) => !prev)}
                                >
                                    {showFilters ? 'Less Filters' : 'More Filters'}
                                </button>
                            </div>

                            {showFilters ? (
                                <div className="search-extra">
                                    <div className="field">
                                        <input
                                            type="number"
                                            min={0}
                                            placeholder={t('bannerSearch.priceMin')}
                                            aria-label={t('bannerSearch.priceMin')}
                                            required
                                        />
                                    </div>
                                    <div className="field">
                                        <input
                                            type="number"
                                            min={0}
                                            placeholder={t('bannerSearch.priceMax')}
                                            aria-label={t('bannerSearch.priceMax')}
                                            required
                                        />
                                    </div>
                                    <div className="field">
                                        <input
                                            type="number"
                                            min={0}
                                            placeholder={t('bannerSearch.beds')}
                                            aria-label={t('bannerSearch.beds')}
                                            required
                                        />
                                    </div>
                                    <div className="field">
                                        <input
                                            type="number"
                                            min={0}
                                            placeholder={t('bannerSearch.baths')}
                                            aria-label={t('bannerSearch.baths')}
                                            required
                                        />
                                    </div>
                                    <div className="field">
                                        <input
                                            type="number"
                                            min={0}
                                            placeholder={t('bannerSearch.area')}
                                            aria-label={t('bannerSearch.area')}
                                            required
                                        />
                                    </div>
                                    <button className="primary" type="submit">
                                        {t('bannerSearch.search')} ({mode})
                                    </button>
                                </div>
                            ) : null}
                        </form>
                    </div>
                    <button className="promo" type="button">
                        <span className="promo-icon"><HiOutlineChartBar /></span>
                        <span className="promo-text">
                            <strong>{t('bannerSearch.promoTitle')}</strong>
                            <span>{t('bannerSearch.promoDesc')}</span>
                        </span>
                        <FiChevronRight />
                    </button>
                </div>
            </section>

            <section className="section">
                <div className="section-head">
                    <h2>{t('section.featured')}</h2>
                    <button className="text-link" type="button">{t('section.viewAll')} <FiChevronRight /></button>
                </div>
                <div className="cards">
                    <article className="property-card">
                        <div className="property-media">
                            <span className="badge">{t('cards.new')}</span>
                            <img src="https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=800&q=80" alt="Wohnzimmer" />
                            <button className="like" type="button"><FiHeart /></button>
                        </div>
                        <div className="property-body">
                            <h3>€ 745.000</h3>
                            <p><FaMapMarkerAlt /> Charlottenburg, Berlin</p>
                            <div className="meta">
                                <span><FaBed /> 3</span>
                                <span><FaBath /> 2</span>
                                <span><FaRulerCombined /> 112 m²</span>
                            </div>
                        </div>
                    </article>
                    <article className="property-card">
                        <div className="property-media">
                            <span className="badge">{t('cards.premium')}</span>
                            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80" alt="Portrait" />
                            <button className="like" type="button"><FiHeart /></button>
                        </div>
                        <div className="property-body">
                            <h3>€ 1.250.000</h3>
                            <p><FaMapMarkerAlt /> Grunewald, Berlin</p>
                            <div className="meta">
                                <span><FaBed /> 6</span>
                                <span><FaBath /> 4</span>
                                <span><FaRulerCombined /> 280 m²</span>
                            </div>
                        </div>
                    </article>
                    <article className="property-card">
                        <div className="property-media">
                            <span className="badge highlight">{t('cards.topDeal')}</span>
                            <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80" alt="Wohnung" />
                            <button className="like" type="button"><FiHeart /></button>
                        </div>
                        <div className="property-body">
                            <h3>€ 520.000</h3>
                            <p><FaMapMarkerAlt /> Prenzlauer Berg, Berlin</p>
                            <div className="meta">
                                <span><FaBed /> 2</span>
                                <span><FaBath /> 1</span>
                                <span><FaRulerCombined /> 85 m²</span>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <section className="section cta-grid">
                <article className="cta-card light">
                    <div className="cta-icon"><FiTag /></div>
                    <div>
                        <h3>{t('cta.sellTitle')}</h3>
                        <p>{t('cta.sellDesc')}</p>
                        <button className="primary" type="button">{t('cta.sellAction')}</button>
                    </div>
                </article>
                <article className="cta-card dark">
                    <div className="cta-icon"><FiHome /></div>
                    <div>
                        <h3>{t('cta.projectsTitle')}</h3>
                        <p>{t('cta.projectsDesc')}</p>
                        <button className="ghost" type="button">{t('cta.projectsAction')}</button>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Search
