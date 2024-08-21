import './App.css'
import SiteRouter from "./components/route/SiteRouter.jsx";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./store/AuthContext.jsx";
import {ModalProvider} from "./store/ModalContext.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <div className="pb-16 lg:pb-0">
            <SiteRouter/>
          </div>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
)
}


export default App
