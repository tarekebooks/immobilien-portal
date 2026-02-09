import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './header/Navbar'
import Footer from './footer/Footer'
import { I18nProvider } from './i18n/I18nProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import ForSale from './pages/ForSale.tsx'
import ForRent from './pages/ForRent.tsx'
import Contact from './pages/Contact.tsx'
import PostListing from './pages/PostListing.tsx'
import PhotosMediaStep from './components/post-ad/PhotosMediaStep.tsx'
import { PostAdProvider } from './components/post-ad/PostAdContext.tsx'
import NotFound from './components/exceptions/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <Navbar />
        <PostAdProvider>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/for-sale" element={<ForSale />} />
              <Route path="/for-rent" element={<ForRent />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/create-new-property" element={<PostListing />} />
              <Route
                path="/create-new-property/photos"
                element={<PhotosMediaStep />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </PostAdProvider>
        <Footer />
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
)
