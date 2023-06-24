import HeroSection from '../components/HeroSection';
import NotLoggedInRequired from '@/components/loginAndAuth/NotLoggedInRequired';

export default function Home() {
  return (
    <NotLoggedInRequired>
      <HeroSection />
    </NotLoggedInRequired>
  );
}
