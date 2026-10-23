import { MotionConfig } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import LotusMark from './components/LotusMark';
import MobileDock from './components/MobileDock';
import Navbar from './components/Navbar';
import { SaathiProvider } from './components/Saathi';
import ScrollToTop from './components/ScrollToTop';
import { LangProvider } from './lib/i18n';
import Home from './pages/Home';

const Courses = lazy(() => import('./pages/Courses'));
const CoursePage = lazy(() => import('./pages/CoursePage'));
const Finder = lazy(() => import('./pages/Finder'));
const Fix = lazy(() => import('./pages/Fix'));
const About = lazy(() => import('./pages/About'));
const Partner = lazy(() => import('./pages/Partner'));
const Enroll = lazy(() => import('./pages/Enroll'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <LotusMark className="h-14 w-14 animate-pulse text-ink/30" />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <SaathiProvider>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col pb-16 md:pb-0">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:slug" element={<CoursePage />} />
                    <Route path="/find" element={<Finder />} />
                    <Route path="/fix" element={<Fix />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/partner" element={<Partner />} />
                    <Route path="/enroll" element={<Enroll />} />
                    {/* Old site paths */}
                    <Route path="/contact" element={<Navigate to="/enroll" replace />} />
                    <Route path="/partners" element={<Navigate to="/partner" replace />} />
                    <Route path="/success-stories" element={<Navigate to="/about" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
            <MobileDock />
          </SaathiProvider>
        </BrowserRouter>
      </MotionConfig>
    </LangProvider>
  );
}
