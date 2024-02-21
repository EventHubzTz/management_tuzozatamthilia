import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/use-auth';
import dashboard from '../menu-items/dashboard';

export const AuthGuard = (props) => {
  const { children } = props;
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('authenticated') === 'true'
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(
    () => {
      if (ignore.current) {
        return;
      }

      ignore.current = true;

      if (!isAuthenticated) {
        navigate(`/login`);
      } else {
        const path = dashboard.children.find(item => item.url === location.pathname);
        if (path !== undefined) {
          if (!path.roles.includes(auth?.user?.role)) {
            auth.signOut();
            navigate(`/login`);
            return;
          }
        }
        setChecked(true);
      }
    },
    [isAuthenticated, location.pathname, navigate, auth]
  );

  if (!checked) {
    return null;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
