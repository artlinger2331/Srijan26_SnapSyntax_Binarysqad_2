import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import HowItWorks from '../sections/HowItWorks';
import CTA from '../sections/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
