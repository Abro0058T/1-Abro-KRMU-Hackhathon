import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllImageThunk,
  getAllMediaThunk,
  getAllReelThunk,
  getSingleImageThunk,
  getSingleMediaThunk,
  getSingleReelThunk,
} from "../redux/thunks/mediaThunk";

import UploadFile from "./UploadFile";
import { Bell, BellDot, Mic, Search } from "lucide-react";
function HomeDashboard() {
  const dispatch = useDispatch();
  const { mediaInfo } = useSelector((state) => state.media);
  console.log(mediaInfo);
  const activityItems = [
    {
      imgSrc: "https://via.placeholder.com/40",
      name: "Video Editor",
      description: "Sir I have added the video"
    },
    {
      imgSrc: "https://via.placeholder.com/40",
      name: "Content Creator",
      description: "video description edited sir"
    },
    {
      imgSrc: "https://via.placeholder.com/40",
      name: "Video Upload by Editor",
      description: "Gaming Setup"
    }
  ]
  useEffect(() => {
    dispatch(getAllMediaThunk());
    // dispatch(getAllImageThunk());
    // dispatch(getAllReelThunk());
    // dispatch(getSingleMediaThunk("65e81388b91158bf8b7108fb"));
    // dispatch(getSingleImageThunk("65e8140e565acd0c5fa6e6e5"));
  }, [dispatch]);
  return (
    <div className="  mt-4 ml-6 w-full flex">
      {/* <UploadFile/> */}
      <div className="  w-9/12 p-3">
        <div className="flex  flex-row">
          <div className="navbar  flex justify-between rounded-lg bg-[#272636]">
            <div className="dropdown flex gap-3   dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym95JTIwbW9kZWx8ZW58MHx8MHx8fDA%3D"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-zinc-200 text-sm"> Welcome back </h2>
                <span className="text-zinc-300 text-xs"> Abhishek</span>
              </div>
            </div>
            <div className="flex-none gap-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-customGray-light" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-10 py-1 rounded-lg text-customGray-light bg-customBlack"
                />
                <Mic className="absolute right-3 text-customGray-light" />
              </div>

              <div className="navbar-end">
            
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator text-customGray-light">
                  <Bell />
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <button className="btn bg-[#272636] hover:text-customBlack border-none text-zinc-200 h-auto w-30 ml-2">
            Upload Video
          </button>
        </div>
        <h4 className="text-white text-xl font-semibold  p-2">Pending Videos</h4>
        {/* crousal */}

        {/* crousal */}
        <div className="carousel carousel-center w-100 h-60 p-4 space-x-4  rounded-box">
          {mediaInfo.length > 0 &&
            mediaInfo.map((media) => (
              <div className="carousel-item w-100 " key={media.id}>
                <video
                  src={media.videos.streamUrl}
                  className="rounded-box"
                  autoPlay={true}
                />
              </div>
            ))}
        </div>
        {/* table */}

        <div className="overflow-y-scroll text-customGray-light h-60 bg-customBlack rounded-md mt-10">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-customGray-light" >
                <th>Video</th>
                <th>Name</th>
                <th>Duration</th>
                <th>type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              {mediaInfo.length > 0 &&
                mediaInfo.map((media) => (
                  <tr key={media.id}>
                    <th>
                      <video
                        src={media.videos.streamUrl}
                        autoPlay={false}
                        width="400px"
                        height="200"
                      ></video>
                    </th>
                    <td>{media.videos.title}</td>
                    <td>{media.videos.duration}</td>
                    <td>{media.videos.type}</td>
                    <td>{media.videos.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* table */}
      </div>
      <div className="w-3/12 right h-fit bg-customBlack text-customGray-light p-6">
        <h4 className="text-white text-xl font-semibold mb-4">Your Activity</h4>
        {activityItems.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <img
              src={item.imgSrc}
              alt="Activity"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h5 className="text-customGray-light text-sm font-semibold">{item.name}</h5>
              <p className="text-customGray-light text-xs">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeDashboard;
