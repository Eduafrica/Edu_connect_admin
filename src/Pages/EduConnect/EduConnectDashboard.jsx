import Navbar from "../../Components/EduConnect/Navbar";
import Sidebar from "../../Components/EduConnect/Sidebar";

function EduConnectDashboard() {
  return (
    <div className="page flex-row">

      {/* Sidebar */}
      <div className="fixed w-[280px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="relative ml-[280px] w-[calc(100vw-280px)]">
        <div className=" w-full h-[60px] top-0 left-0 bg-white">
          <Navbar />
        </div>

        <div className="bg-bgColor">

        </div>


      </div>

    </div>
  );
}

export default EduConnectDashboard;
