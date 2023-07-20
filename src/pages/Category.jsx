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
        console.log(err);
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
            <h1>FU Otuoke Election Portal</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="columns">
          <div className="column">
            <Faculty handleFaculty={handleFaculty} />
          </div>

          <div className="column">
            <input
              type="text"
              onChange={(evt) => setCategory(evt.target.value)}
              value={category}
              placeholder="Category Name"
              className="input"
            />
          </div>

          <div className="column">
            <button className="button">Create Category</button>
          </div>

          <ToastContainer />
        </form>
      </div>

      <div className="footer">
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <a href="https://fuotuoke.edu.ng">Federal Unv Otuoke</a>
              <a href="#"></a>.<a href="#">@ICT</a>.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
