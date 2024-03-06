// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import {
//   uploadMediaThunk,
//   uploadImageThunk,
//   uploadReelThunk,
// } from "../redux/thunks/mediaThunk";

// const UploadFile = () => {
//   const { register, handleSubmit } = useForm();

//   const dispatch = useDispatch();

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("image", data.file[0]);

//     //  dispatch(uploadMediaThunk(formData));
//     //  dispatch(uploadImageThunk(formData));
//     dispatch(uploadReelThunk(formData));
//     console.log(formData);

//     const res = await fetch("http://localhost:3000/video/upload", {
//       method: "POST",
//       body: formData,
//     }).then((res) => res.json());
//     alert(JSON.stringify(`${res.message}, status: ${res.status}`));
//   };

//   return (
//     <div className="App ml-5 ">
//       <h1 className="text-lg font-medium text-sky-500 mt-5 ml-5">Upload</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h2 className="m-2 text-orange-700 text-xl">Title: </h2>
//         <textarea
//           className="textarea textarea-error textarea-bordered textarea-md w-full text-lg text-yellow-500"
//           placeholder="Title"
//         ></textarea>

//         <h2 className="m-2 text-orange-700 text-xl">Tags: </h2>
//         <textarea
//           className="textarea textarea-error textarea-bordered textarea-md w-full text-lg text-yellow-500"
//           placeholder="Tags"
//         ></textarea>

//         <h2 className="m-2 text-orange-700 text-xl">Description: </h2>
//         <textarea
//           className="textarea textarea-error textarea-lg textarea-bordered textarea-md w-full text-lg text-yellow-500"
//           placeholder="Description w-full text-lg text-yellow-500"
//         ></textarea>

//         <input
//           type="file"
//           {...register("file")}
//           className="file-input mt-10 file-input-bordered file-input-error w-full"
//         />
//         <button type="submit" className="btn btn-outline btn-error mt-5">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadFile;

import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { uploadImageThunk } from '../redux/thunks/mediaThunk';
function UploadFile() {
  const dispatch=useDispatch();
  const {register,handleSubmit,reset}=useForm();
  const onSubmit=async (data)=>{
   try{ const formData=new FormData()
    console.log(data.title)
    if(data.tag!=""){
      const tagsArray=data.tag.split(" ");
      for(let i=0;tagsArray.length;i++){
        formData.append("tag[]",tagsArray[i])
      }
    }
    
    formData.append("title",data.name);
    formData.append("description",data.description)
    formData.append("status",data.status)
    formData.append("type",data.type)
    formData.append("image",data.image)

    console.log(...formData)
    dispatch(uploadImageThunk(formData))}
    catch(error){
      console.log(error)
      throw new Error("File not uploaded")
    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)} className='w-full p-2 relative'>
      <div className='p-2 mb-2'>
        <label htmlFor="title" className='text-white text-xl mr-2'>Title:</label>
        <br/>
        <input
          type="text"
          id="title"
          {...register('title')}
          className='border-none rounded-md bg-purple-800 '
        />
      </div>
      <div className='flex p-2'>
        <label htmlFor="description"  className='text-white text-xl mr-2 block'>Description:</label>
        <br/>
        <textarea id="description" {...register('description')}   className='border-none rounded-md bg-purple-800  w-1/2 h-40'/>
      </div>
      <div className='flex p-2'>
        <label htmlFor="tag"  className='text-white text-xl mr-2'>Tags (space-separated):</label>
        <br/>
        <input
          type="text"
          id="tag"
          {...register('tag')}
          className='border-none rounded-md bg-purple-800 '
        />
      </div>
      <div className='flex p-2'>
        <label htmlFor="status"  className='text-white text-xl mr-2'>Status:</label>
        <br/>
        <select id="status" {...register('status')}  className='border-none rounded-md bg-purple-800  '>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div className='flex p-2'>
        <label htmlFor="file"  className='text-white text-xl mr-2'>File:</label>
        <input type="file" id="file"  className='border-none rounded-md bg-purple-800  '   {...register("image", { required: true })}  />
      </div>
      <button className='border-none rounded-md py-2 px-4 bg-purple-800 text-xl text-white absolute bottom-10 right-10' type="submit">Upload</button>
    </form>
    // <div className=' ml-6 mt-6 w-full'>
    //     <h1 className='text-2xl text-white text-700'>Upload</h1>
    //      <div className=' h-full flex flex-row '>
    //         <div className="left   w-9/12 p-2 mb-10">
    //             <div className='text-white relative'>
    //                Title
    //                <button className='absolute right-2 bg-purple-800 p-2 border-none rounded-lg'> Update</button>
    //             </div>
    //        <div className='mt-4'>
    //         <label htmlFor="Tags " className='text-white text-xl '>Tags</label> 
    //         <br />
    //         <textarea type="text-area"  className='border-none rounded-md pl-1 bg-purple-800 w-full mt-4 ' placeholder='Video Title'/>
    //         <br />
    //         <label htmlFor=""  className='text-white text-xl'>Description</label>
    //         <br />
    //         <textarea  type="text" className='border-none rounded-md pl-1 bg-purple-800 w-full h-60 mt-4' placeholder='Description'/>
    //         <br />
    //        </div>
    //         <label htmlFor=""  className='text-white text-xl'>Thumbnail
    //         </label>
    //         <div className='flex gap-2'>
    //         <div className="border h-10 h-100 w-1/4"></div>
    //         <div className="border h-10 h-100 w-1/4"></div>
    //         <div className="border h-10 h-100 w-1/4"></div>
    //         <div className="border  w-1/4"></div>
    //         </div>
    //         </div>
    //         <div className='right  h-4/6 w-4/12'>
    //             <div className=' h-1/2'>
    //                 Video </div>
    //             <div className=' bg-purple-800 h-1/2 text-white p-2 -mb-2'>
    //                 <p>Video Link</p>
    //                 <a>Link</a>
    //                 <p className='pt-4'>FileName</p>
    //                 <p>Title</p>
    //                 <p className='pt-4'>Status</p>
    //                 <p>Currently Working</p>
    //                  </div>
    //         </div>
    //         <button className='absolute bottom-0 right-0 p-2 mb-6 border-none rounded-lg bg-purple-800 text-white text-xl ' >Upload</button>
    //      </div>
    // </div>
  )
}

export default UploadFile