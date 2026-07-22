import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageTransition from './components/PageTransition';

// Ленивая загрузка страниц — только загружаются, когда навигатор до них дойдет
const Landing = lazy(() => import('./pages/Landing/Landing'));
const Books = lazy(() => import('./pages/Books/Books'));
const BookDetail = lazy(() => import('./pages/BookDetail/BookDetail'));
const Games = lazy(() => import('./pages/Games/Games'));
const Lore = lazy(() => import('./pages/Lore/Lore'));
const News = lazy(() => import('./pages/News/News'));
const About = lazy(() => import('./pages/About/About'));
const Search = lazy(() => import('./pages/Search/Search'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <Header />
        <main className="main-content">
          <Suspense fallback={null}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageTransition name="landing"><Landing /></PageTransition>} />
                <Route path="/books" element={<PageTransition name="books"><Books /></PageTransition>} />
                <Route path="/books/:id" element={<PageTransition name="book-detail"><BookDetail /></PageTransition>} />
                <Route path="/games" element={<PageTransition name="games"><Games /></PageTransition>} />
                <Route path="/lore" element={<PageTransition name="lore"><Lore /></PageTransition>} />
                <Route path="/news" element={<PageTransition name="news"><News /></PageTransition>} />
                <Route path="/about" element={<PageTransition name="about"><About /></PageTransition>} />
                <Route path="/search" element={<PageTransition name="search"><Search /></PageTransition>} />
                <Route path="*" element={<PageTransition name="not-found"><NotFound /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
