import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/Arewahub/Sidebar";
import TestimoniesCard from "../../Components/Arewahub/TestimoniesCard";
import { useFetchTestimonials } from "../../Helpers/fetch.hooks";
import Stats from "../../Components/Arewahub/Stats";

function ArewaHubTestimonies() {
    const { data: testimoniesData, isFetching } = useFetchTestimonials({ all: false, website: true, id: 'arewahub' })
    const data = testimoniesData?.data || []

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
                  Testimonies
                </h1>

                <div className="">
                  <Stats />
                </div>

            </div>

            <div className="">
                {/**ADD HERE */}
                <TestimoniesCard testimonytData={data} loading={isFetching} showFilter={true} showMenuList={false} showPagination={true} showSearch={true} />
            </div>

        </div>


      </div>

    </div>
  );
}

export default ArewaHubTestimonies;
