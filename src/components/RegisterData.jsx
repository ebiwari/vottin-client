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
    <>
      <div>
        <label>Full Name</label>
        <input type="text" value={data.name} readOnly />
      </div>

      <div>
        <label>Phone</label>
        <input type="text" value={data.phone ?? ""} readOnly />
      </div>

      <div>
        <label>Email</label>
        <input type="text" value={data.email ?? ""} readOnly />
      </div>

      <div>
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
      )}

      <div>
        <button>Register</button>
      </div>
    </>
  );
};
