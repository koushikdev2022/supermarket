import { useEffect, useState } from "react";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../layout/header";
import Sidebar from "../layout/Sidebar";
import HeaderIner from "../layout/HeaderIner";

const InsideLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("videoToken");
  const parseToken = JSON.parse(token);
  const userToken = parseToken?.token
  const navigate = useNavigate();
  useEffect(() => {
    if (!userToken) {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <div>
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-100">
            {/* <!-- ===== Header Start ===== --> */}
            <HeaderIner
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </div>
  );
};

export default InsideLayout;
