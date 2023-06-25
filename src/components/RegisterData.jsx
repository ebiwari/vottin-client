import { useState } from "react";

export const RegisterData = ({ data }) => {
  const [verifyType, setVerifyType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("your click the submit button");
  };

  const handleRadio = (evt) => {
    setVerifyType(evt.target.value);
  };

  const handleCode = (evt) => {
    main(data.email, data.passcode).catch((err) => {
      console.log(err);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" value={data.name} className="input" readOnly />
      </div>

      <div className="input-margin">
        <input
          type="text"
          value={data.phone ?? ""}
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
        <button className="button is-primary">Send Code to EMail</button>
      </div>
    </form>
  );
};
