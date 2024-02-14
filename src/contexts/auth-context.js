import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { getUserUrl, loginByEmailPhoneUrl } from '../seed/url';
import { authGetRequest, postRequest } from '../services/api-service';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = localStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      authGetRequest(
        getUserUrl,
        (data) => {
          if (data.error) {
            signOut()
            return;
          }
          dispatch({
            type: HANDLERS.INITIALIZE,
            payload: data
          });
        },
        () => {
          signOut()
        }
      )
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (emailPhone, password, navigate, helpers) => {
    postRequest(
      loginByEmailPhoneUrl,
      {
        "email_phone": emailPhone,
        "password": password
      },
      (data) => {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('authenticated', 'true');
        authGetRequest(
          getUserUrl,
          (userData) => {
            if (userData.error) {
              helpers.setErrors({ submit: userData.message })
              helpers.setStatus({ sucess: false })
              helpers.setSubmitting(false)
              return;
            }
            dispatch({
              type: HANDLERS.SIGN_IN,
              payload: userData
            });
            helpers.setStatus({ sucess: true })
            helpers.setSubmitting(false)
            navigate("/")
          },
          () => {
            signOut()
          }
        )
      },
      (error) => {
        if (error?.response?.data?.message) {
          helpers.setErrors({ submit: error.response.data.message[0] })
        } else if (error?.response?.data) {
          helpers.setErrors(error?.response?.data)
        }
        helpers.setStatus({ sucess: false })
        helpers.setSubmitting(false)
      },
    )
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
    localStorage.removeItem("authenticated")
    localStorage.removeItem("token")
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
