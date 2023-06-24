import { useState, useRef } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL_ADDRESS } from "../components/Api";
import _ from "lodash";
import { Faculty } from "../components/login/Faculty";
import { Category } from "../components/login/Category";

import { FacultyNominees } from "../components/login/FacultyNominees";

export const AssignsNominees = () => {
  const [category, setCategory] = useState([]);

  const [matric, setMatric] = useState("");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");

  const FacultyId = useRef("");
  const CategoryId = useRef("");

  const handleFaculty = (payload) => {
    Axios.get(
      `${URL_ADDRESS}/api/category/faculty?FacultyId=${Number(payload)}`
    )
      .then((resp) => {
        setCategory(resp.data);
        FacultyId.current = payload;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoginCategory = (payload) => {
    CategoryId.current = payload;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    Axios.post(`${URL_ADDRESS}/api/users`, {
      FacultyId: Number(FacultyId.current),
      CategoryId: Number(CategoryId.current),
      name: fullName,
      matric: matric,
      department: department,
    })

      .then((resp) => {
        toast("You have voted Successfully");
        setCategory([]);
        setMatric("");
        setDepartment("");
        setFullName("");
        handleFaculty(Number(FacultyId.current));
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
        {category.length > 0 && (
          <Category
            category={category}
            handleLoginCategory={handleLoginCategory}
          />
        )}{" "}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(evt) => setFullName(evt.target.value)}
          />
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Matric(FUO/16/bch/0001)"
          value={matric}
          onChange={(evt) => setMatric(evt.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Department Name"
          value={department}
          onChange={(evt) => setDepartment(evt.target.value)}
        />
      </div>

      <div>
        <button>Create Nominees</button>
      </div>

      <ToastContainer />
    </form>
  );
};
