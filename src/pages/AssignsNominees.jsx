import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL_ADDRESS, FacultyId } from "../components/Api";
import _ from "lodash";
import { Faculty } from "../components/login/Faculty";
import { Category } from "../components/login/Category";

import { FacultyNominees } from "../components/login/FacultyNominees";

export const AssignsNominees = () => {
  const [category, setCategory] = useState([]);

  const [matric, setMatric] = useState("");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const CategoryId = useRef("");

  useEffect(() => {
    Axios.get(`${URL_ADDRESS}/api/category/faculty?FacultyId=${FacultyId}`)
      .then((resp) => {
        setCategory(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLoginCategory = (payload) => {
    CategoryId.current = payload;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    Axios.post(`${URL_ADDRESS}/api/users`, {
      FacultyId: FacultyId,
      CategoryId: Number(CategoryId.current),
      name: fullName,
      matric: matric,
      department: department,
    })

      .then((resp) => {
        toast("Nominees Creation is Successful");
        setMatric("");
        setDepartment("");
        setFullName("");
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
    <>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column content">
            <h1>Assigns Nominees to Category</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="columns">
            {category.length > 0 ? (
              <div className="column">
                <Category
                  category={category}
                  handleLoginCategory={handleLoginCategory}
                />
              </div>
            ) : (
              <h1 className="column content">Loading...</h1>
            )}
          </div>

          <div className="columns">
            <div className="column is-5">
              <input
                className="input"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(evt) => setFullName(evt.target.value)}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column is-5">
              <input
                type="text"
                className="input"
                placeholder="Matric(FUO/16/bch/0001)"
                value={matric}
                onChange={(evt) => setMatric(evt.target.value)}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column is-5">
              <input
                type="text"
                className="input"
                placeholder="Department Name"
                value={department}
                onChange={(evt) => setDepartment(evt.target.value)}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <button className="button">Create Nominees</button>
            </div>
          </div>

          <ToastContainer />
        </form>
      </div>
    </>
  );
};
