import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import AdminSideMenu from "./UI/AdminSideMenu";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <>
      <AdminSideMenu>
        <Outlet />
      </AdminSideMenu>
    </>
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default AdminRoute;
