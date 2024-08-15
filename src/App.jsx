import './App.css'
import {useEffect} from "react";
import Router from "./components/route/Router.jsx";

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log("mapX: " + position.coords.latitude)
      console.log("mapY: " + position.coords.longitude)
    });
  }, []);
  return (
    <div className="pb-16 lg:pb-0">
      <Router/>
    </div>
  )
}

export default App
