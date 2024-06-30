
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { initializeProjectThunk } from '../redux/thunks/mediaThunk';
function IntialiseProject() {
  const dispatch=useDispatch();
  const {userData}=useSelector(state=>state.user)
  const projectData=useSelector(state=>state.media)
  console.log(projectData,"projectData")
  const {register,handleSubmit,errors}=useForm();
  const onSubmit=async (data)=>{
    console.log(data)
    let tagsArray
    if(data.tag!=""){
       tagsArray=data.tags.split(",");
  
    }
    console.log(tagsArray)
    dispatch(initializeProjectThunk({
  userId:userData._id,
  title:data.title,
  description:data.description,
  tags:tagsArray,
    }))
    // formData.append("title",data.name);
    // formData.append("description",data.description)
    // formData.append("status",data.status)
    // formData.append("type",data.type)
    // // formData.append("image",data.image)

    // console.log(...formData)
    // // await dispatch(uploadImage(formData))
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          {...register('title')}
        
          className='text-white'
        />
        {/* {errors.title && <p className="error">{errors.title.message}</p>} */}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea  id="description" {...register('description')} 
        
        className='text-white'/>
      </div>
      <div>
        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          {...register('tags')}
          className='text-white'
        />
        {/* {errors.tags && <p className="error">{errors.tags.message}</p>} */}
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select id="status" {...register('status')}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div>
        </div>
      <button className='bg-black text-customGray-light' type="submit">Upload</button>
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

export default IntialiseProject