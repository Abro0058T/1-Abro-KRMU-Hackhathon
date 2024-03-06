/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const getAllUsersByAdmin = async () => {
  const response = await axios.get(${BASE_URL}/getall/user, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllProductsByAdmin = async () => {
  const response = await axios.get(${BASE_URL}/admin/products, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllOrdersByAdmin = async () => {
  const response = await axios.get(${BASE_URL}/getall/orders, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteOrderById = async (orderId: string) => {
  const response = await axios.delete(${BASE_URL}/delete/order/${orderId}, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteProductById = async (productId: string) => {
  const response = await axios.delete(
    ${BASE_URL}/delete/product/${productId},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await axios.post(${BASE_URL}/create/product, productData, {
    withCredentials: true,
  });
  return response.data;
};
[4:54 PM, 3/6/2024] Abhishek Naula Jss: https://medium.com/@mindsurfingclub/redux-toolkit-extra-reducer-explained-createasyncthunk-1480c54e8b58
[11:57 PM, 3/6/2024] Abhishek Naula Jss: /* eslint-disable @typescript-eslint/no-explicit-any */
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { resetAppErr, selectVendor } from "@/state/slices/vendorSlice";
import { vendorCreateProductThunk } from "@/state/thunks/vendorThunks";
import { useSnackbar } from "notistack";
import { ProductFormTypes } from "@/types/FormTypes";
import { getCategories, getSubCategories } from "@/fetch-api/categoryApi";

const VendorCreateProduct = () => {
  const dispatch = useAppDispatch();
  const { productCreated, appErr, loading } = useAppSelector(selectVendor);
  const { enqueueSnackbar } = useSnackbar();
  const [multipleImages, setMultipleImages] = useState<File[]>([]);

  const [categories, setCategories] = useState<any[] | null>();
  const [subCategories, setSubCategories] = useState<any[] | null>();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Functions to preview multiple images
  const changeMultipleFiles = (e: any) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setMultipleImages((prevImages) =>
        prevImages.concat(fileArray as unknown as File[])
      );
    }
  };

  const removeImage = (index: number) => {
    const newImages = multipleImages.filter((_, i) => i !== index);
    setMultipleImages(newImages);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<ProductFormTypes> = async (data) => {
    const tagsArray = data.tag.split(" ");
    const sizesArray = data.size.split(" ");
    const formData = new FormData();
    for (let i = 0; i < multipleImages.length; i++) {
      formData.append("images", multipleImages[i]);
    }

    for(let j=0;j<tagsArray.length;j++){
      formData.append("tags[]",tagsArray[j])
    }
    for(let k=0;k<sizesArray.length;k++){
      formData.append("sizes[]",sizesArray[k])
    }
    formData.append("name", data.name);
    formData.append("stock", data.stock as unknown as any);
    formData.append("condition", data.condition);
    formData.append("price", data.price as unknown as any);
    formData.append("discountedPrice", data.discountedPrice as unknown as any);
    formData.append("estShippingTime", data.estShippingTime as unknown as any);
    formData.append("preOrder", data.preOrder);
    formData.append("allowWholesale", data.allowWholesale as unknown as any);
    formData.append("productMeasurement", data.productMeasurement);
    formData.append("sku", data.sku);
    formData.append("minOrderQty", data.minOrderQty as unknown as any);
    formData.append("videoUrl", data.videoUrl);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log(...formData);
    console.log(data);
    console.log(multipleImages);
    await dispatch(vendorCreateProductThunk(formData));
    reset();
    setMultipleImages([]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategory) {
        const data = await getSubCategories(selectedCategory);
        setSubCategories(data);
      }
    };
    fetchSubCategories();
  }, [selectedCategory]);

  useEffect(() => {
    console.log(productCreated);
    if (productCreated) {
      enqueueSnackbar("Product created successfully", { variant: "success" });
    }
    if (appErr) {
      enqueueSnackbar(appErr.message, { variant: "error" });
    }
  }, [productCreated, appErr, enqueueSnackbar]);

  useEffect(() => {
    return () => {
      dispatch(resetAppErr());
    };
  }, [dispatch]);

  return (
    <div className="w-full">
      {loading ? (
        <div className=" w-full">
          <Backdrop sx={{ color: "#fff" }} open={true}>
            <div className=" flex flex-col items-center justify-center gap-2">
              <span className=" text-lg text-center">Please Wait....</span>
              <CircularProgress color="inherit" />
            </div>
          </Backdrop>
        </div>
      ) : (
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit as any)}
          className=" rounded border-2 w-full flex flex-col"
        >
          {/* <!-- Heading> */}
          <div className=" flex justify-between items-center ml-4 mt-2 ">
            <h1 className=" text-2xl font-medium">Create Product</h1>
         
          </div>
          {/* <!-- Heading> */}

          <div className="flex flex-col md:flex-row  w-full gap-4">
            {/* <!-- Left Container> */}
              
              {/* <!-- description box> */}
              <div className=" bg-white p-6 flex w-full lg:w-1/2 shadow rounded flex-col gap-5">
                <h1 className=" text-xl font-medium">1. General Info</h1>
                <TextField
                  type="text"
                  label="Product Name*"
                  size="small"
                  fullWidth
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className=" text-red-500">This field is required</span>
                )}

                <div className="w-full flex gap-5">
                  <div className="w-full">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-1">
                      <select
                        id="category"
                        {...register("category", { required: true })}
                        autoComplete="category"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="">Select Category</option>
                        {categories?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.category && (
                      <span className=" text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="subCategory"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Sub Category
                    </label>
                    <div className="mt-1">
                      <select
                        id="subCategory"
                        {...register("subCategory", { required: true })}
                        autoComplete="subCategory"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="">Select Sub Category</option>
                        {subCategories?.map((subCategory) => (
                          <option key={subCategory._id} value={subCategory._id}>
                            {subCategory.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.subCategory && (
                      <span className=" text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  </div>

                  <div className="w-full flex gap-5">
                    <div className="w-full">
                    <TextField
                      label="Stock"
                      size="small"
                      type="number"
                      {...register("stock", { required: true })}
                      className="w-full"
                    />
                    {errors.stock && (
                      <span className=" text-red-500">
                        This field is required
                      </span>
                    )}
                    </div>
                    <div className="w-full">
                    <TextField
                      type="text"
                      label="Condition"
                      size="small"
                      {...register("condition")}
                      className="w-full"
                    />
                    {errors.condition && (
                      <span className=" text-red-500">
                        This field is required
                      </span>
                    )}

                    </div>

                  </div>
                <div className="flex w-full items-center gap-5">
                  
                  <div className="w-full">

                  <TextField
                    label="Price"
                    size="small"
                    type="number"
                    {...register("price", { required: true })}
                    className="w-full"
                    />
                  {errors.price && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                  </div>
                  <div className="w-full">

                  <TextField
                    label="Discount"
                    size="small"
                    type="number"
                    {...register("discountedPrice")}
                    className="w-full"
                    />
                  {errors.discountedPrice && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                  </div>
                </div>

                <div className="flex w-full text-xs justify-center gap-4">

                <div className="w-full items-center gap-2">
                  <label> Expected Shipping</label>
                  <input type="date" {...register("estShippingTime")} className="p-2 px-1 border w-full rounded-lg"/>
                  {errors.estShippingTime && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 w-full">
                  <label>Pre Order ? </label>
                  <select {...register("preOrder", { required: true })}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {errors.preOrder && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 w-full">
                  <label>Allow Whole Sale ? </label>
                  <select {...register("allowWholesale", { required: true })}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {errors.allowWholesale && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                </div>

                </div>

                <div className="flex w-full items-center gap-5">
                  <div className="w-full">

                  <TextField
                    type="text"
                    label="Tags"
                    size="small"
                    {...register("tag", { required: true })}
                    className="w-full"
                    />
                  {errors.tag && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                  </div>
                  <div className="w-full">
                    
                  <TextField
                    label="Sizes"
                    size="small"
                    type="text"
                    {...register("size")}
                    className="w-full"
                  />
                  {errors.size && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                  </div>
                  
                </div>
                <div className="flex w-full items-center gap-5">
                  <div className="w-full">

                  <TextField
                    label="Measurement"
                    size="small"
                    type="text"
                    {...register("productMeasurement")}
                    className="w-full"
                    />
                  {errors.productMeasurement && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                  </div>
                  <div className="w-full">

                  <TextField
                    type="text"
                    label="SKU"
                    size="small"
                    {...register("sku", { required: true })}
                    className="w-full"
                    />
                  {errors.sku && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                  </div>

                </div>

                <div className="flex w-full items-center gap-5">
                <TextField
                    label="Minimum Quantity"
                    size="small"
                    type="number"
                    {...register("minOrderQty", { required: true })}
                    className="w-full"
                  />
                  {errors.minOrderQty && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                  <TextField
                    label="Video Link"
                    size="small"
                    type="text"
                    {...register("videoUrl")}
                    className="w-full"
                  />
                  {errors.videoUrl && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full lg:w-1/2 gap-2 ">
             
                <div className="bg-white p-6 flex w-full rounded flex-col gap-4">
                <h1 className=" text-xl font-medium ">2. Description</h1>
                  <TextField
                    rows={5}
                    multiline
                    label="Full Description"
                    size={"small"}
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <span className=" text-red-500">
                      This field is required
                    </span>
                  )}
           
                  <h1 className=" text-xl font-medium h-1/5 ">3. Images</h1>
                  <div className="flex items-center  p-2  border rounded-sm justify-start h-4/5  border-slate-500">
                    <input
                      type="file"
                      multiple
                      {...register("image", { required: true })}
                      onChange={changeMultipleFiles}
                  
                      accept="image/*"
                    />
                    {errors.image && (
                      <span className=" text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-2 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  
                  {multipleImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={Image ${index}}
                        className="w-full h-full lg:object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="font-bold text-xl"
                      >
                        &#x2715;
                      </button>
                    </div>
                  ))}
                </div>
                {/* <div className="bg-white p-6 flex w-full rounded flex-col gap-4">
                 
                  
                </div> */}
                <button
              type="submit"
              className={
                " bg-primary self-center text-white py-2 w-fit px-10 font-bold rounded-sm "
              }
            >
            Send product for approval
            </button>
              </div>
              {/* <!-- description box> */}
              {/* general info ( name , category , stock , waranty , brand , price , cuted price ) */}
            
              {/* general info */}

          </div>
        </form>
      )}

      <div className="flex flex-col items-center justify-center">
        {productCreated ? (
          <div className="text-green-500 text-xl mt-2">
            Product Added Successfully
          </div>
        ) : null}
        {appErr ? (
          <div className="text-red-400 text-xl mt-2">{appErr.message}</div>
        ) : null}
      </div>
    </div>
  );
};

export default VendorCreateProduct;