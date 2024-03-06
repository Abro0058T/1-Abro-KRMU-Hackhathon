import React from 'react'

function Upload() {
  return (
    <div className=' ml-6 mt-6 w-full'>
        <h1 className='text-2xl text-white text-700'>Upload</h1>
         <div className=' h-full flex flex-row '>
            <div className="left   w-9/12 p-2 mb-10">
                <div className='text-white relative'>
                   Title
                   <button className='absolute right-2 bg-purple-800 p-2 border-none rounded-lg'> Update</button>
                </div>
           <div className='mt-4'>
            <label htmlFor="Tags " className='text-white text-xl '>Tags</label> 
            <br />
            <textarea type="text-area"  className='border-none rounded-md pl-1 bg-purple-800 w-full mt-4 ' placeholder='Video Title'/>
            <br />
            <label htmlFor=""  className='text-white text-xl'>Description</label>
            <br />
            <textarea  type="text" className='border-none rounded-md pl-1 bg-purple-800 w-full h-60 mt-4' placeholder='Description'/>
            <br />
           </div>
            <label htmlFor=""  className='text-white text-xl'>Thumbnail
            </label>
            <div className='flex gap-2'>
            <div className="border h-10 h-100 w-1/4"></div>
            <div className="border h-10 h-100 w-1/4"></div>
            <div className="border h-10 h-100 w-1/4"></div>
            <div className="border  w-1/4"></div>
            </div>
            </div>
            <div className='right  h-4/6 w-4/12'>
                <div className=' h-1/2'>
                    Video </div>
                <div className=' bg-purple-800 h-1/2 text-white p-2 -mb-2'>
                    <p>Video Link</p>
                    <a>Link</a>
                    <p className='pt-4'>FileName</p>
                    <p>Title</p>
                    <p className='pt-4'>Status</p>
                    <p>Currently Working</p>
                     </div>
            </div>
            <button className='absolute bottom-0 right-0 p-2 mb-6 border-none rounded-lg bg-purple-800 text-white text-xl ' >Upload</button>
         </div>
    </div>
  )
}

export default Upload