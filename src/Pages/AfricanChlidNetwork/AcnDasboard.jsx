import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/ACN/Sidebar";
import Stats from "../../Components/ACN/Stats";
import DonationAndExpenseCard from "../../Components/ACN/DonationAndExpenseCard";
import { useState } from "react";
import TopDonations from "../../Components/ACN/TopDonations";
import TopExpense from "../../Components/ACN/TopExpense";
import { useFetchDonations, useFetchExpense } from "../../Helpers/acn/fetch.hooks";

function AcnDasboard() {
  const { data: donationData, isFetching: loadingDonations } = useFetchDonations()
  const { data: expenseData, isFetching: loadingExpense } = useFetchExpense()


  const topDonationsData = donationData?.data?.splice(0, 5) || [].splice(0, 5)
  const topExpenseData = expenseData?.data.splice(0, 6) || [].splice(0, 6)
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

              <DashBoardLinks name={'acn'} color={`text-acn-main-color border-acn-main-color`} />

                <h1 className="title">
                  Dashboard
                </h1>

                <div className="">
                  <Stats />
                </div>

            </div>

            <DonationAndExpenseCard setSelectedDate={setSelectedDate} selectedDate={selectedDate} />

            <div className="flex  items-start gap-[66px] justify-between">
                {/**fetch dat table two table */}
                <TopDonations data={topDonationsData} loading={loadingDonations}  />
                <TopExpense data={topExpenseData} loading={loadingExpense}  />
            </div>

        </div>


      </div>

    </div>
  );
}

export default AcnDasboard;
