import { useState, useRef } from "react";

import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { URL_ADDRESS } from "../components/Api";
import _ from "lodash";
import { Faculty } from "../components/login/Faculty";

import { FacultyNominees } from "../components/login/FacultyNominees";

export const Category = () => {
  const [category, setCategory] = useState("");
  const FacultyId = useRef("");

  const handleFaculty = (payload) => {
    FacultyId.current = payload;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    Axios.post(`${URL_ADDRESS}/api/category`, {
      FacultyId: Number(FacultyId.current),
      name: category,
    })

      .then((resp) => {
        toast("You have voted Successfully");
        setCategory("");
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }
        //   setNominees([]);
        //   setCategory([]);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Faculty handleFaculty={handleFaculty} />
      </div>

      <div>
        <input
          type="text"
          onChange={(evt) => setCategory(evt.target.value)}
          value={category}
          placeholder="Category Name"
        />
      </div>

      <div>
        <button>Create Category</button>
      </div>

      <ToastContainer />
    </form>
  );
};
