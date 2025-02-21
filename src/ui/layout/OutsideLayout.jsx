/* eslint-disable react/prop-types */
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { Suspense, useEffect } from "react";

const OutsideLayout = ({ children }) => {
  const token = localStorage.getItem("videoToken");
  const parseToken = token ? JSON.parse(token)?.token : null;
  const nevigate = useNavigate();
  useEffect(() => {
    if (parseToken) {
      nevigate("/home");
    }
  }, [])
  return (
    <div className="container-fluid overflow-hidden p-0">
      <Header />
      <div className="wrapper_section py-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="w-full">
            <Suspense fallback={"loading.."}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default OutsideLayout;
