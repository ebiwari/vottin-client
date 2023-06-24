import { useState } from "react";
import { RegisterData } from "../components/RegisterData";
import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { URL_ADDRESS } from "../components/Api";
import _ from "lodash";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Matric Number</label>
        <input
          type="text"
          onChange={(evt) => setMatric(evt.target.value)}
          value={matric}
        />
      </div>

      <div>
        <button type="button" onClick={validateButton}>
          Validate
        </button>
      </div>

      {!_.isEmpty(data) && <RegisterData data={data} />}

      <ToastContainer />
    </form>
  );
};
