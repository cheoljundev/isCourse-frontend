import './App.css'
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Home from "./components/home/Home.jsx";
import {useRef} from "react";
import SignupTerms from "./components/signup/SignupTerms.jsx";

function App() {
  const modal = useRef();
  return (
    <div className="pb-16 lg:pb-0">
      <Header modal={modal} />
      {/*<Home modal={modal}/>*/}
      <SignupTerms/>
      <Footer modal={modal}/>
    </div>
  )
}

export default App
