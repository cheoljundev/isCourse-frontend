import {createContext, useContext, useEffect, useState} from "react";
import ky from "ky";

const AuthContext = createContext(
  {
    isSignedIn: false,
    signin: () => {},
    signout: () => {}
  }
);


// Context Provider
export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      ky.post('http://localhost:8080/api/check-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          setIsSignedIn(true);
        })
        .catch(() => {
          setIsSignedIn(false);
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false); // 로딩 완료
        });
    } else {
      setLoading(false); // 토큰이 없는 경우에도 로딩 완료
    }
  }, []);

  const signin = (token) => {
    localStorage.setItem("token", token);
    setIsSignedIn(true);
  };
  const signout = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }

  return (
    <AuthContext.Provider value={{isSignedIn, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Context를 사용하는 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}