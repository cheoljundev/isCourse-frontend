import './App.css'
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Home from "./components/home/Home.jsx";

function App() {

  return (
    <div className="pb-16 lg:pb-0">
      <Header/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default App
