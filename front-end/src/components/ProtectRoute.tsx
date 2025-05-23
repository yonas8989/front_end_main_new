/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../features/auth/authHooks';
import { PulseLoader } from 'react-spinners';

const ProtectedRoute = () => {
  const location = useLocation(); // Proper way to get current location
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      `}>
        <PulseLoader color="#315659" size={15} />
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate 
      to="/login" 
      replace 
      state={{ from: location.pathname }} // Now using the hook-provided location
    />
  );
};

export default ProtectedRoute;