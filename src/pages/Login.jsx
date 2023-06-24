import { useState, useRef } from "react";

import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { URL_ADDRESS } from "../components/Api";
import _ from "lodash";
import { Faculty } from "../components/login/Faculty";

import { Category } from "../components/login/Category";

import { FacultyNominees } from "../components/login/FacultyNominees";

export const Login = () => {
  const [category, setCategory] = useState([]);
  const [nominees, setNominees] = useState([]);

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
    Axios.get(
      `${URL_ADDRESS}/api/users/candidate?CategoryId=${Number(
        payload
      )}&FacultyId=${Number(FacultyId.current)}`
    )
      .then((resp) => {
        setNominees(resp.data);
        console.log(nominees);
        CategoryId.current = payload;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNominees = (payload) => {
    console.log(payload);
  };

  return (
    <div>
      <div>
        <Faculty handleFaculty={handleFaculty} />
      </div>

      <div>
        {category.length > 0 && (
          <Category
            category={category}
            handleLoginCategory={handleLoginCategory}
          />
        )}
      </div>

      {nominees.length > 0 && (
        <div>
          <FacultyNominees
            nominees={nominees}
            CategoryId={CategoryId.current}
            FacultyId={FacultyId.current}
            handleNominees={handleNominees}
          />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};
