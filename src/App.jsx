import './App.css'
import SiteRouter from "./components/route/SiteRouter.jsx";
import {BrowserRouter} from "react-router-dom";
import {ModalProvider} from "./store/ModalContext.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkAuthStatus} from "./components/redux/modules/auth.js";
import Loading from "./components/util/Loading.jsx";
function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (loading) {
    return <Loading/>;
  }

  return (
    <BrowserRouter>
      <ModalProvider>
        <div className="pb-16 lg:pb-0">
          <SiteRouter/>
        </div>
      </ModalProvider>
    </BrowserRouter>
)
}


export default App
