import './App.css'
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Home from "./components/home/Home.jsx";
import {useRef} from "react";
import SignupTerms from "./components/signup/SignupTerms.jsx";
import SignupForm from "./components/signup/SignupForm.jsx";
import SignupComplete from "./components/signup/SignupComplete.jsx";
import DealDetail from "./components/deal/DealDetail.jsx";
import LoginModal from "./components/home/user/LoginModal.jsx";

function App() {
  const modal = useRef();
  return (
    <div className="pb-16 lg:pb-0">
      <LoginModal ref={modal}/>
      <Header modal={modal} />
      <Home modal={modal}/>
      {/*<SignupTerms/>*/}
      {/*<SignupForm/>*/}
      {/*<SignupComplete/>*/}
      <DealDetail/>
      <Footer modal={modal}/>
    </div>
  )
}

export default App
