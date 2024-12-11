import { useState } from "react";
import Navbar from "../../Components/EduConnect/Navbar";
import Sidebar from "../../Components/EduConnect/Sidebar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import MenuList from "../../Components/Helpers/MenuList";
import MyDetails from "../../Components/EduConnect/MyDetails";
import Password from "../../Components/EduConnect/Password";

function EduconnectSettings() {
    const data = [
        {
            name: 'My details',
            slug: 'mydetails'
        },
        {
            name: 'Password',
            slug: 'password'
        }
    ]
    const [activeCard, setActiveCard] = useState(data[0].slug);

    const handleCardChange = (value) => {
      setActiveCard(value);
    };
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
            <div className="flex flex-col gap-[30px]">

              <DashBoardLinks name={'educonnect'} />

                <h1 className="title">
                  Settings
                </h1>

                <div className="">
                    <MenuList
                        data={data}
                        activeCard={activeCard}
                        onCLick={handleCardChange}
                    />

                    {
                        activeCard === 'mydetails' && (
                            <MyDetails />
                        )
                    }

                    {
                        activeCard === 'password' && (
                            <Password />
                        )
                    }


                </div>

            </div>
        </div>


      </div>

    </div>
  );
}

export default EduconnectSettings;
