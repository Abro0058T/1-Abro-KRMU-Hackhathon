import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from "react-redux";
import { uploadImageThunk, uploadVideoAssestsThunk } from '../redux/thunks/mediaThunk';

const UploadMediaVideo = ({type,projectId}) => {
  const dispatch=useDispatch()
  const {userData}=useSelector(state=>state.user)
  // const dispatch=
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [multipleImages, setMultipleImages] = useState([]);
  const onSubmit = (data) => {
    console.log(data.image[0]);
    const formData=new FormData()
    formData.append("video",data.image[0])
    formData.append("projectId",projectId)
    formData.append("userId",userData._id)
    console.log(...formData)
    dispatch(uploadVideoAssestsThunk(formData))
  };
  
 
  
  return (  <div>
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>File</label>
          <input  type="file" multiple  name="image" {...register("image")} />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UploadMediaVideo