import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../stores/use-auth-state';
import { ROUTES } from '@/constants/constants';

export function ProtectedRoutesForAuth(): React.JSX.Element {
  const { isLoggedIn } = useAuthStore();
  console.log('ProtectedRoutesForAuth', isLoggedIn);
  return !isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.MAIN} />;
}
