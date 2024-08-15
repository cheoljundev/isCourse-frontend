import {BrowserRouter} from "react-router-dom";
import MainRoute from "./MainRoute.jsx";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <MainRoute/>
      </BrowserRouter>
    </>
  )
}