import { useState } from "react";
import { RegisterData } from "../components/RegisterData";
import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { URL_ADDRESS } from "../components/Api";
import _ from "lodash";

import "./Login.css";

import { Link } from "react-router-dom";

export const Register = () => {
  const [data, setData] = useState({});

  const [matric, setMatric] = useState("");
  const [button, setButton] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("your click the submit button");
  };

  const validateButton = () => {
    setButton(false);
    Axios.get(`${URL_ADDRESS}/api/login?matric=${matric}`)

      .then((resp) => {
        setButton(true);
        setData(resp.data);
        // if (resp.statusText === "OK") {
        //   setData(resp.data);
        // }
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }
        setButton(true);
        setData({});
      });
  };

  return (
    <>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column login">
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

              {/* <div className="column">
                <button
                  type="button"
                  className="button is-primary"
                  onClick={validateButton}
                >
                  Validate
                </button>
              </div> */}

              <div className="column">
                {button ? (
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={validateButton}
                  >
                    Validate
                  </button>
                ) : (
                  <button className="button is-primary is-loading">
                    Validate
                  </button>
                )}
              </div>
            </div>

            {!_.isEmpty(data) && <RegisterData data={data} />}

            <ToastContainer />
          </div>

          <div className="column login content main-content">
            {/* <div className="right-content"></div> */}

            <div className="reg-content">
              <p>Student that did not recieve SMS</p>
              <p>Can Click the Link below</p>
              <Link to="/">
                <h1>Votting Page</h1>
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
              <a href="http://opensource.org/licenses/mit-license.php"></a>.
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
