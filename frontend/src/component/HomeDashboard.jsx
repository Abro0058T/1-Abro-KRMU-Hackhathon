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
function HomeDashboard() {
  const dispatch = useDispatch();
const {mediaInfo}=useSelector(state=>state.media)
console.log(mediaInfo)
  useEffect(() => {
    dispatch(getAllMediaThunk())
    // dispatch(getAllImageThunk());
    // dispatch(getAllReelThunk());
    // dispatch(getSingleMediaThunk("65e81388b91158bf8b7108fb"));
    // dispatch(getSingleImageThunk("65e8140e565acd0c5fa6e6e5"));
  }, [dispatch]);
  return (
    <div className="  mt-4 ml-6 w-full flex">
      {/* <UploadFile/> */}
      <div className=" w-9/12 p-3">
        <div className="flex flex-row">
          <div className="navbar bg-base-100 flex justify-between rounded-lg background-color:#272636">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                />
              </div>
              <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <button className="btn background-color:#272636 h-auto w-30 ml-2">
            Upload Video
          </button>
        </div>
        <h4 className="text-white text-xl p-2">Pending Videos</h4>
        {/* crousal */}
       
        {/* crousal */}
        <div className="carousel carousel-center w-100 h-60 p-4 space-x-4  rounded-box">
          {
            mediaInfo.length>0 && mediaInfo.map((media)=>(
  <div className="carousel-item w-100 " key={media.id}>
    <video src={media.videos.streamUrl} className="rounded-box" autoPlay={true}/>
  </div> 
            ))
          }

</div>
        {/* table */}

        <div className="overflow-y-scroll h-60 bg-purple-800 rounded-md mt-10">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
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
              {mediaInfo.length>0 && mediaInfo.map((media)=>(

              <tr key={media.id}>
                <th>
                  <video src={media.videos.streamUrl} autoPlay={false} width="400px" height="200"></video>
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
      <div className=" w-3/12">Right</div>
    </div>
  );
}

export default HomeDashboard;
