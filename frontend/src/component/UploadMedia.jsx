import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from "react-redux";
import { uploadImageThunk } from '../redux/thunks/mediaThunk';

const UploadMedia = ({type,proejectId}) => {
  const dispatch=useDispatch()
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
    formData.append("image",data.image[0])
    formData.append("projectId",proejectId)
    console.log(...formData)
    dispatch(uploadImageThunk(formData))
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

export default UploadMedia