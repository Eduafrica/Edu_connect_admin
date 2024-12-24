import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/ACN/Sidebar";
import { useFetchStories } from "../../Helpers/acn/fetch.hooks";
import Stats from "../../Components/ACN/Stats";
import { newsandupdates } from "../../Data/newsandupdates";
import StoriesCard from "../../Components/ACN/StoriesCard";

function AcnStories() {
  const { data: storiesData, isFetching } = useFetchStories()
  const data = storiesData?.data || newsandupdates || []
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

        <div className="bg-bgColor pad1 flex flex-col gap-[39px]">
            {/**TOP */}
            <div className="flex flex-col gap-[30px]">

                <DashBoardLinks name={'acn'} color={`text-acn-main-color border-acn-main-color`} />

                <h1 className="title">
                  Stories
                </h1>

                <div className="">
                    <Stats />
                </div>

            </div>

            {/**BOTTOM */}
            <div className="">
                 <StoriesCard newsData={data} loading={isFetching} showFilter={true} showMenuList={false} showPagination={true} showSearch={true}  />
            </div>

        </div>


      </div>

    </div>
  );
}

export default AcnStories;
