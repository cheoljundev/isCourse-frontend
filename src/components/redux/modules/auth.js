import ky from "ky";

export const SIGNIN = 'auth/SIGNIN';
export const SIGNOUT = 'auth/SIGNOUT';
export const SET_MANAGER = 'auth/SET_MANAGER';
export const SET_ADMIN = 'auth/SET_ADMIN';
export const SET_LOADING = 'auth/SET_LOADING';

export const signin = (token) => (
  { type: SIGNIN, payload: { token } }
);

export const signout = () => (
  { type: SIGNOUT }
);

export const setManager = () => (
  { type: SET_MANAGER }
);

export const setAdmin = () => (
  { type: SET_ADMIN }
);

export const setLoading = (loading) => (
  { type: SET_LOADING, payload: { loading } }
);

export const checkAuthStatus = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setLoading(true));
      try {
        await ky.post('http://localhost:8080/api/check-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        dispatch(signin(token));

        try {
          await ky.post('http://localhost:8080/api/manager/check-token', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          dispatch(setManager());
        } catch {
          // 매니저가 아니면 아무 것도 하지 않음
        }

        try {
          await ky.post('http://localhost:8080/api/admin/check-token', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          dispatch(setAdmin());
        } catch {
          // 어드민이 아니면 아무 것도 하지 않음
        }
      } catch {
        dispatch(signout());
      } finally {
        dispatch(setLoading(false));
      }
    } else {
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
      return {
        ...state,
        isSignedIn: true,
      };
    case SIGNOUT:
      return {
        ...state,
        isSignedIn: false,
        isManager: false,
        isAdmin: false,
      };
    case SET_MANAGER:
      return {
        ...state,
        isManager: true,
      };
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: true,
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