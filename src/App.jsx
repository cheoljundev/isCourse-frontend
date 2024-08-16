import './App.css'
import {useEffect, useState} from "react";
import SiteRouter from "./components/route/SiteRouter.jsx";
function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log("mapX: " + position.coords.latitude)
      console.log("mapY: " + position.coords.longitude)
    });
  }, []);
  return (
    <div className="pb-16 lg:pb-0">
      <SiteRouter/>
    </div>
)
}


export default App
