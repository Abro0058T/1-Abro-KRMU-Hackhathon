import { Mic, Search } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProjectThunk } from "../redux/thunks/mediaThunk";

function Video() {
  const {allProjectDetails}=useSelector(state=>state.media)
  const {userData}=useSelector(state=>state.user)
  console.log(allProjectDetails)
  const dispatch=useDispatch()
  useEffect(()=>{
    const getAllProject=()=>{
      dispatch(getAllProjectThunk({adminId:userData._id}))
    }
    getAllProject()
  },[])
  return (
    <div className="mt-5 ml-6 w-10/12 rounded-lg ">
     <div className="flex mb-2 justify-between" >
     <h1 className="text-600 text-xl text-white p-2">Videos</h1>
     <div className="relative flex items-center">
                <Search className="absolute left-3 text-customGray-light" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-10 py-1 rounded-lg text-customGray-light bg-[#212120]"
                />
                <Mic className="absolute right-3 text-customGray-light" />
              </div>
     </div>
      <div>
        <div className="w-14/15 text-customGray-light flex justify-between text-center">
          <div className="p-2 bg-[#212120] w-72 h-24 border-none rounded-lg">
            <h3>Total Video</h3>
            <h1 className="text-green-500 text-3xl mt-2 font-bold  ">100</h1>
          </div>
          <div className="p-2 bg-[#212120] w-72 h-24 border-none rounded-lg">
            <h3>Pending Videos</h3>
            <h1 className="text-red-500 text-3xl mt-2 font-bold " >23</h1>
          </div>
          <div className="p-2 bg-[#212120] w-72 h-24 border-none rounded-lg">
            <h3>Watched Videos</h3>
            <h1 className="text-customPurple text-3xl mt-2 font-bold "  >77</h1>
          </div>
        </div>
        <div>
          <div className="overflow-y-scroll h-80 bg-[#212120] text-customGray-light rounded-md mt-10">
            <table className="table ">
              {/* head */}
              <thead>
                <tr className="text-customGray-light" >
                  <th>Video</th>
                  <th>Name</th>
                  <th>Descriptoi</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                {/* row 1 */}
                {
                  allProjectDetails.map((project,index)=>{
                    return(
                      <tr key={index}>
                        <th>{index+1}</th>
                        <td>{project.title}</td>
                        <td>{project.description}</td>
                        <td>{project.createdAt}</td>
                        <td>{project.status}</td>
                        <td>
                        <Link to={`/dashboard/project/${project._id}`}>
                          Edit
                          </Link>
                        </td>
                      </tr>
                    )
                  
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
