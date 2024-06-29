import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  Film, 
  Headset, 
  Images, 
  Inbox, 
  LayoutGrid, 
  LogOut, 
  SquarePen, 
  Upload, 
  UserRoundCog, 
  Video 
} from "lucide-react";
import logo from "../../public/logo.svg"
function Dashboard() {
  const user = useSelector(state => state.user);
  console.log(user);

  const mainMenuItems = [
    { name: 'DashBoard', icon: <LayoutGrid />, link: 'videoDashboard' },
    { name: 'AddMember', icon: <Inbox />, link: "manageteams"},
    { name: 'Upload', icon: <Upload />, link: 'upload' },
    { name: 'Manage Project', icon: <Video />, link: 'videos' },
    { name: 'Intialise Project', icon: <Video />, link: 'intialiseproject' },
    { name: 'Reels', icon: <Film />, link: '#' },
    { name: 'Posts', icon: <Images />, link: '#' },
    { name: 'Blogs', icon: <SquarePen />, link: '#' },
  ];

  const helpMenuItems = [
    { name: 'Setting', icon: <UserRoundCog />, link: '#' },
    { name: 'Support', icon: <Headset />, link: '#' },
    { name: 'Logout', icon: <LogOut />, link: '#' },
  ];

  const renderMenuItems = (items) => {
    return items.map((item, index) => (
      <div key={index} className="pl-4">
        <Link to={item.link}>
          <h3 className= {`text-zinc-400 ${item.name === "Logout" ? "text-red-600" :""} py-1 hover:bg-customPurple-darker hover:text-customPurple duration-100 flex items-center gap-2`} >
            {item.icon} {item.name}
          </h3>
        </Link>
      </div>
    ));
  };

  return (
    <div className="flex flex-row bg-customPurple-darker min-h-screen">
      <div className="commandmenu h-fit flex flex-col bg-customBlack  w-[256px] pl-4 pt-3 pb-4 mt-5 rounded-xl">
        <div className="logo ">
          <img className="h-16" src={logo} alt="" />
         </div>
        
        <div className="main flex flex-col pt-9 text-customGray-light gap-3">
          <h2 className="text-lg font-semibold">Main</h2>
          {renderMenuItems(mainMenuItems)}
        </div>

        <div className="main flex flex-col pt-8 text-customGray-light gap-3">
          <h2 className="text-lg font-semibold">Help</h2>
          {renderMenuItems(helpMenuItems)}
        </div>
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
