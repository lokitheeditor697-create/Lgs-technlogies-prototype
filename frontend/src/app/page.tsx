import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Domains from '@/components/home/Domains';
import FeaturedInternships from '@/components/home/FeaturedInternships';
import Commitment from '@/components/home/Commitment';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <Domains />
        <FeaturedInternships />
        <Commitment />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
