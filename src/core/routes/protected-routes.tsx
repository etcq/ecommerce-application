import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../stores/use-auth-state';
import { ROUTES } from '@/constants/constants';

export function RedirectForAuthPerson(): React.JSX.Element {
  const { isLoggedIn } = useAuthStore();
  return !isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.MAIN} replace />;
}

export function RedirectForNotAuthPerson(): React.JSX.Element {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.CART} replace />;
}
