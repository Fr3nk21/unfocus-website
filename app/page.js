import Nav from './components/Nav';
import HeroNew from './components/HeroNew';
import Stats from './components/Stats';
import Services from './components/Services';
import About from './components/About';
import PhotoGallery from './components/PhotoGallery';
import SocialProof from './components/SocialProof';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <HeroNew />
        <Stats />
        <Services />
        <About />
        <PhotoGallery />
        <SocialProof />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
