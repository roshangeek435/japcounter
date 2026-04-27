import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from './components/ui/sonner';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import MantraCounterPage from './pages/MantraCounterPage';
import MantraLibrary from './pages/MantraLibrary';
import MeditationTimer from './pages/MeditationTimer';
import { About, Contact, Blog, BlogPost, Privacy, Terms, Disclaimer } from './pages/StaticPages';

const BlogPostRoute = () => {
  const { slug } = useParams();
  return <BlogPost slug={slug} />;
};

// Legacy slug redirects → new /counter/:slug
const LegacyRedirect = ({ to }) => <Navigate to={to} replace />;

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/counter/:slug" element={<MantraCounterPage />} />

              {/* Backward-compatible URL redirects */}
              <Route path="/ram-naam-japa-counter"     element={<LegacyRedirect to="/counter/ram-ram" />} />
              <Route path="/radha-naam-japa-counter"   element={<LegacyRedirect to="/counter/radhe-radhe" />} />
              <Route path="/om-namah-shivaya-counter"  element={<LegacyRedirect to="/counter/om-namah-shivaya" />} />
              <Route path="/hanuman-japa-counter"      element={<LegacyRedirect to="/counter/om-han-hanumate-namah" />} />
              <Route path="/freestyle-japa-counter"    element={<LegacyRedirect to="/counter/om" />} />

              <Route path="/mantra-library" element={<MantraLibrary />} />
              <Route path="/meditation-timer" element={<MeditationTimer />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostRoute />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
            </Routes>
          </Layout>
          <Toaster richColors position="top-center" />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
