import ky from "ky";

export const SIGNIN = 'auth/SIGNIN';
export const SIGNOUT = 'auth/SIGNOUT';
export const SET_SIGNED_IN = 'auth/SET_SIGNED_IN';
export const SET_MANAGER = 'auth/SET_MANAGER';
export const SET_ADMIN = 'auth/SET_ADMIN';
export const SET_LOADING = 'auth/SET_LOADING';

export const signin = ({jwt, checkResponse}) => (
  { type: SIGNIN, payload:
      {
        token:jwt,
        isSignIn: checkResponse.isSignIn,
        isManager: checkResponse.isManager,
        isAdmin: checkResponse.isAdmin
    }
  }
);

export const signout = () => (
  { type: SIGNOUT }
);

export const setIsSignedIn = (isSignIn) => (
  { type: SET_SIGNED_IN, payload: { isSignIn }}
);

export const setManager = (isManager) => (
  { type: SET_MANAGER, payload: { isManager }}
);

export const setAdmin = (isAdmin) => (
  { type: SET_ADMIN, payload: { isAdmin }}
);

export const setLoading = (loading) => (
  { type: SET_LOADING, payload: { loading } }
);

export const checkAuthStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    dispatch(setLoading(true));

    if (token) {
      ky.get('http://localhost:8080/api/check-token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .json()
        .then((response) => {
          if (response) {
            dispatch(setIsSignedIn(response.isSignIn));
            dispatch(setManager(response.isManager));
            dispatch(setAdmin(response.isAdmin));
          } else {
            dispatch(setIsSignedIn(false));
            dispatch(setManager(false));
            dispatch(setAdmin(false));
          }
        })
        .catch((error) => {
          console.error("Error checking authentication status:", error);
          dispatch(setIsSignedIn(false));
          dispatch(setManager(false));
          dispatch(setAdmin(false));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      dispatch(setIsSignedIn(false));
      dispatch(setManager(false));
      dispatch(setAdmin(false));
      dispatch(setLoading(false));
    }
  };
};

const initState = {
  isSignedIn: false,
  isManager: false,
  isAdmin: false,
  loading: true,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNIN:
      action.payload.token && localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isSignedIn: action.payload.isSignIn,
        isManager: action.payload.isManager,
        isAdmin: action.payload.isAdmin,
      };
    case SIGNOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isSignedIn: false,
        isManager: false,
        isAdmin: false,
      };
    case SET_SIGNED_IN:
      return {
        ...state,
        isSignedIn: action.payload.isSignIn,
      };
    case SET_MANAGER:
      return {
        ...state,
        isManager: action.payload.isManager,
      };
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default authReducer;