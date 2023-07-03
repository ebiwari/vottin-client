import { useState, useRef } from "react";

import Axios from "axios";

import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { URL_ADDRESS } from "../components/Api";
import _ from "lodash";
import { Faculty } from "../components/login/Faculty";

import { Category } from "../components/login/Category";

import { FacultyNominees } from "../components/login/FacultyNominees";
import "./Login.css";

export const Login = () => {
  const [category, setCategory] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [end, setEnd] = useState(false);

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
        // console.log(nominees);
        CategoryId.current = payload;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNominees = (payload) => {};

  const handleEndVote = () => {
    setEnd(true);
  };

  if (end) {
    return (
      <>
        <div className="container is-fluid">
          <div className="columns">
            <div className="column content login">
              <h1>Votting has Endend..</h1>
            </div>

            <div className="column login content main-content">
              <div className="reg-content">
                <p>Student that did not recieve SMS</p>
                <p>Can Click the Link below</p>
                <Link to="/register">
                  <h1>Get Vottin Code</h1>
                </Link>
              </div>
            </div>
          </div>
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
  }

  return (
    <>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column login">
            <Faculty handleFaculty={handleFaculty} />

            {category.length > 0 && (
              <Category
                category={category}
                handleLoginCategory={handleLoginCategory}
              />
            )}

            {nominees.length > 0 && (
              <div>
                <FacultyNominees
                  nominees={nominees}
                  CategoryId={CategoryId.current}
                  FacultyId={FacultyId.current}
                  handleNominees={handleNominees}
                  handleEndVote={handleEndVote}
                />
              </div>
            )}

            <ToastContainer />
          </div>

          <div className="column login content main-content">
            {/* <div className="right-content"></div> */}
            <div className="reg-content">
              <p>Student that did not recieve SMS</p>
              <p>Can Click the Link below</p>
              <Link to="/register">
                <h1>Get Vottin Code</h1>
              </Link>
            </div>
          </div>
        </div>
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
