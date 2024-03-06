import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  uploadMediaThunk,
  uploadImageThunk,
  uploadReelThunk,
} from "../redux/thunks/mediaThunk";

const UploadFile = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.file[0]);

    //  dispatch(uploadMediaThunk(formData));
    //  dispatch(uploadImageThunk(formData));
    dispatch(uploadReelThunk(formData));
    console.log(formData);

    const res = await fetch("http://localhost:3000/video/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };

  return (
    <div className="App ml-5 ">
      <h1 className="text-lg font-medium text-sky-500 mt-5 ml-5">Upload</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="m-2 text-orange-700 text-xl">Title: </h2>
        <textarea
          className="textarea textarea-error textarea-bordered textarea-md w-full text-lg text-yellow-500"
          placeholder="Title"
        ></textarea>

        <h2 className="m-2 text-orange-700 text-xl">Tags: </h2>
        <textarea
          className="textarea textarea-error textarea-bordered textarea-md w-full text-lg text-yellow-500"
          placeholder="Tags"
        ></textarea>

        <h2 className="m-2 text-orange-700 text-xl">Description: </h2>
        <textarea
          className="textarea textarea-error textarea-lg textarea-bordered textarea-md w-full text-lg text-yellow-500"
          placeholder="Description w-full text-lg text-yellow-500"
        ></textarea>

        <input
          type="file"
          {...register("file")}
          className="file-input mt-10 file-input-bordered file-input-error w-full"
        />
        <button type="submit" className="btn btn-outline btn-error mt-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadFile;
