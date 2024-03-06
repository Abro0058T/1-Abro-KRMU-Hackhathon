import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { uploadMediaThunk } from "../redux/thunks/mediaThunk";

const UploadFile = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.file[0]);

    await dispatch(uploadMediaThunk(formData));

    const res = await fetch("http://localhost:3000/video/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />

        <input type="submit" />
      </form>
    </div>
  );
};

export default UploadFile;
