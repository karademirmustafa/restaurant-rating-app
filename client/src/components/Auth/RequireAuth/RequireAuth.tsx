import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthService from '../../../services/AuthService';

type Props = {}

const RequireAuth = (props: Props) => {
    const location = useLocation();
    const token = AuthService.getJwtCookie();
    if (location.pathname === '/login' || location.pathname === "/register") {
        return token ? <Navigate to="/" replace /> : <Outlet />;
    }

    return (
        !token
            ? <Navigate to="/login" state={{ from: location }} replace />
            : <Outlet />
    );
};

export default RequireAuth