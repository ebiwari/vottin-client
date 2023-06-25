import { useState } from "react";
import { RegisterData } from "../components/RegisterData";
import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { URL_ADDRESS } from "../components/Api";
import _ from "lodash";

import "./Login.css";

export const Register = () => {
  const [data, setData] = useState({});

  const [matric, setMatric] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("your click the submit button");
  };

  const validateButton = () => {
    Axios.get(`${URL_ADDRESS}/api/login?matric=${Number(matric)}`)

      .then((resp) => {
        if (resp.statusText === "OK") {
          console.log(resp.data);
          setData(resp.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }

        setData({});
      });
  };

  return (
    <>
      <div className="container is-fluid">
        <div className="columns">
          <form onSubmit={handleSubmit} className="column login">
            <div className="columns">
              <div className="column">
                <input
                  type="text"
                  onChange={(evt) => setMatric(evt.target.value)}
                  value={matric}
                  className="input is-primary"
                  placeholder="FUO/16/BCH/001"
                />
              </div>

              <div className="column">
                <button
                  type="button"
                  className="button is-primary"
                  onClick={validateButton}
                >
                  Validate
                </button>
              </div>
            </div>

            {!_.isEmpty(data) && <RegisterData data={data} />}

            <ToastContainer />
          </form>

          <div className="column login content main-content">
            <div className="right-content"></div>

            <div className="reg-content">
              <p>Student that did not recieve SMS</p>
              <p>Can Click the Link below</p>
              <h1>Get Vottin Code</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <a href="https://fuotuoke.edu.ng">Federal Unv Otuoke</a>
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
              The website content is licensed{" "}
              <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                @ICT
              </a>
              .
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
