import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { URL_ADDRESS } from "./Api";

import Axios from "axios";

export const RegisterData = ({ data }) => {
  const [verifyType, setVerifyType] = useState(null);
  const [button, setButton] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButton(false);
    Axios.get(`${URL_ADDRESS}/api/login/mail?matric=${data.matric}`)
      .then((resp) => {
        console.log(resp);
        setButton(true);
        toast("Check Your Email for Votting Code");
      })
      .catch((err) => {
        setButton(true);
        toast(err.message);
      });
  };

  const handleRadio = (evt) => {
    setVerifyType(evt.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" value={data.name} className="input" readOnly />
      </div>

      <div className="input-margin">
        <input
          type="text"
          value={data.phone ? data.phone.replace(/(?<=\d{7})\d/g, "*") : ""}
          className="input"
          readOnly
        />
      </div>

      <div className="input-margin">
        <input
          type="text"
          value={data.email ?? ""}
          className="input"
          readOnly
        />
      </div>

      {/* <div>
        <label>Password</label>
        <input type="text" />
      </div>

      <div>
        <label>Choose Method of Verification</label>
        <input
          type="radio"
          name="verifyType"
          value="phone"
          onChange={handleRadio}
        />{" "}
        Phone
        <input
          type="radio"
          name="verifyType"
          value="email"
          onChange={handleRadio}
        />{" "}
        Email
      </div>

      {verifyType && (
        <div>
          <button type="button" onClick={handleCode}>
            Get Validation Code
          </button>

          <label>{verifyType}</label>
          <input type="text" />
        </div>
      )} */}

      <div className="input-margin">
        {button ? (
          <button className="button is-primary">Send Code to EMail</button>
        ) : (
          <button className="button is-primary is-loading">
            Send Code to EMail
          </button>
        )}
      </div>

      <ToastContainer />
    </form>
  );
};
