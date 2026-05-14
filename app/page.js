import Nav from './components/Nav';
import HeroPortfolio from './components/HeroPortfolio';
import Ticker from './components/Ticker';
import About from './components/About';
import Stats from './components/Stats';
import Services from './components/Services';
import Testimonial from './components/Testimonial';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <HeroPortfolio />
        <Ticker />
        <Stats />
        <Services />
        <About />
        <Testimonial />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
