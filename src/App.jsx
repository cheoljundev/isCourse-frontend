import './App.css'
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Home from "./components/home/Home.jsx";
import {useRef} from "react";
import SignupTerms from "./components/signup/SignupTerms.jsx";
import SignupForm from "./components/signup/SignupForm.jsx";
import SignupComplete from "./components/signup/SignupComplete.jsx";

function App() {
  const modal = useRef();
  return (
    <div className="pb-16 lg:pb-0">
      <Header modal={modal} />
      <Home modal={modal}/>
      {/*<SignupTerms/>*/}
      {/*<SignupForm/>*/}
      {/*<SignupComplete/>*/}
      <Footer modal={modal}/>
    </div>
  )
}

export default App
