import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/Arewahub/Sidebar";
import Stats from "../../Components/Arewahub/Stats";
import { useState } from "react";
import RevenueCard from "../../Components/Arewahub/RevenueCard";
import TopSellingBooks from "../../Components/Arewahub/TopSellingBooks";
import TopSellingProducts from "../../Components/Arewahub/TopSellingProducts";
import { useFetchRevenuesAndOrders, useFetchTopSellingCourse } from "../../Helpers/arewahub/fetch.hooks";

function ArewaHubDashboard() {
  const { data: topSellingData, isFetching: loadingTopSales } = useFetchTopSellingCourse()


  const topSellingBooks = topSellingData?.data?.topSellingBooks?.splice(0, 5) || [].splice(0, 5)
  const topSellingProduct = topSellingData?.data?.topSellingProducts?.splice(0, 5) || [].splice(0, 6)

  const [ selectedDate, setSelectedDate ] = useState()

  const { data: RevenueAndOrderData, isFetching: loadingRevenueAndOrderData } = useFetchRevenuesAndOrders(selectedDate || '30days')
  const revenueData = RevenueAndOrderData?.data

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

        <div className="bg-bgColor pad1 flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[30px]">

              <DashBoardLinks name={'arewahub'} color={`text-arewahub-main-color border-arewahub-main-color`} />

                <h1 className="title">
                  Dashboard
                </h1>

                <div className="">
                  <Stats data={revenueData} loading={loadingRevenueAndOrderData} />
                </div>

            </div>

            <RevenueCard setSelectedDate={setSelectedDate} selectedDate={selectedDate} />

            <div className="flex  items-start gap-[66px] justify-between">
                {/**fetch dat table two table */}
                <TopSellingBooks data={topSellingBooks} loading={loadingTopSales}  />
                <TopSellingProducts data={topSellingProduct} loading={loadingTopSales}  />
            </div>

        </div>


      </div>

    </div>
  );
}

export default ArewaHubDashboard;
