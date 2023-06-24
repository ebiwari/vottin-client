import { useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "./Category";
import Axios from "axios";
import { URL_ADDRESS } from "./Api";

export const RegistrationForm = ({ withCategory }) => {
  const [categoryId, setCategoryId] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    if (withCategory) {
      data = { ...data, CategoryId: categoryId };
    }

    Axios.post(`${URL_ADDRESS}/api/users`, data)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryId = (id) => {
    setCategoryId(id);
    console.log(id, categoryId);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input type="text" {...register("name", { required: true })} />
        {errors.name?.type === "required" && (
          <p role="alert">Full Name is required</p>
        )}
      </div>

      <div>
        <label>Matric</label>
        <input type="text" {...register("matric", { required: true })} />
        {errors.matric?.type === "required" && (
          <p role="alert">Matric is required</p>
        )}
      </div>

      <div>
        <label>faculty</label>
        <input type="text" {...register("faculty", { required: true })} />
        {errors.faculty?.type === "required" && (
          <p role="alert">Faculty is required</p>
        )}
      </div>

      <div>
        <label>Department</label>
        <input type="text" {...register("department", { required: true })} />
        {errors.department?.type === "required" && (
          <p role="alert">Department is required</p>
        )}
      </div>

      {withCategory && (
        <Category title="Assign Nominees" handleCategoryId={handleCategoryId} />
      )}

      <div>
        <button>Nominate Candidate</button>
      </div>
    </form>
  );
};
