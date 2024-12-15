import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/ACN/Sidebar";
import Stats from "../../Components/ACN/Stats";
import DonationsCard from "../../Components/ACN/DonationsCard";
import { useFetchDonations } from "../../Helpers/acn/fetch.hooks";

function AcnDonations() {
    const { data, isFetching } = useFetchDonations()
  const donationsData = data?.data || []

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
                  Donations
                </h1>

                <div className="">
                  <Stats />
                </div>

            </div>

            <DonationsCard donationData={donationsData} loading={isFetching} showFilter={true} showPagination={true} showSearch={true} />

        </div>


      </div>

    </div>
  );
}

export default AcnDonations;
