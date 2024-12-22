import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/Arewahub/Sidebar";
import Stats from "../../Components/Arewahub/Stats";
import { useState } from "react";
import TopDonations from "../../Components/ACN/TopDonations";
import TopExpense from "../../Components/ACN/TopExpense";
import { useFetchDonations, useFetchExpense } from "../../Helpers/acn/fetch.hooks";
import RevenueCard from "../../Components/Arewahub/RevenueCard";
import TopSellingBooks from "../../Components/Arewahub/TopSellingBooks";
import TopSellingProducts from "../../Components/Arewahub/TopSellingProducts";

function ArewaHubDashboard() {
  const { data: donationData, isFetching: loadingBookSales } = useFetchDonations()
  const { data: expenseData, isFetching: loadingProductSales } = useFetchExpense()


  const topSellingBooks = donationData?.data?.splice(0, 5) || [].splice(0, 5)
  const topSellingProduct = expenseData?.data.splice(0, 5) || [].splice(0, 6)
  const [ selectedDate, setSelectedDate ] = useState()

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
                  <Stats />
                </div>

            </div>

            <RevenueCard setSelectedDate={setSelectedDate} selectedDate={selectedDate} />

            <div className="flex  items-start gap-[66px] justify-between">
                {/**fetch dat table two table */}
                <TopSellingBooks data={topSellingBooks} loading={loadingBookSales}  />
                <TopSellingProducts data={topSellingProduct} loading={loadingProductSales}  />
            </div>

        </div>


      </div>

    </div>
  );
}

export default ArewaHubDashboard;
