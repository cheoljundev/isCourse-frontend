import {createContext, useContext, useEffect, useState} from "react";
import ky from "ky";

const AuthContext = createContext(
  {
    isSignedIn: false,
    isManager: false,
    isAdmin: false,
    signin: () => {},
    signout: () => {}
  }
);


// Context Provider
export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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
          // 매니저 체크
          return ky.post('http://localhost:8080/api/manager/check-token', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        })
        .then(() => {
          setIsManager(true);
        })
        .catch(() => {
          setIsManager(false);
        })
        .finally(() => {
          // 관리자 체크
          ky.post('http://localhost:8080/api/admin/check-token', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(() => {
              setIsAdmin(true);
            })
            .catch(() => {
              setIsAdmin(false);
            })
            .finally(() => {
              setLoading(false);
            });
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
    <AuthContext.Provider value={{isSignedIn, isManager, isAdmin, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Context를 사용하는 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}