import DashboardPage from '@/components/Dashboard';
import LoginRequired from '@/components/loginAndAuth/LoginRequired';

export default function Dashboard() {
  return (
    <LoginRequired>
      <DashboardPage />
    </LoginRequired>
  );
}
