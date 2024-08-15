import AdminHeader from "../admin/AdminHeader.jsx";
import {Outlet} from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader/>
      <Outlet/>
    </>
  )
}