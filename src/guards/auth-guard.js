import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AuthGuard = (props) => {
  const { children } = props;
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
        // navigate(`/auth/login?continueUrl=${location.pathname}`);
        navigate(`/login`);
      } else {
        setChecked(true);
      }
    },
    [isAuthenticated, location.pathname, navigate]
  );

  if (!checked) {
    return null;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
