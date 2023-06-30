import { useState } from "react";
import Axios from "axios";
import { URL_ADDRESS } from "../../components/Api";
import { toTitleCase } from "../util/Helper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FacultyNominees = ({
  nominees,
  CategoryId,
  FacultyId,
  handleNominees,
}) => {
  const [loginId, setLoginId] = useState("");
  const [matric, setMatric] = useState("");
  const [userId, setUserId] = useState("");

  const [button, setButton] = useState(true);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButton(false);

    console.log(CategoryId, FacultyId, userId, loginId);

    Axios.post(`${URL_ADDRESS}/api/vote`, {
      categoryId: Number(CategoryId),
      facultyId: Number(FacultyId),
      userId: userId,
      loginId: loginId,
      matric: matric,
    })
      .then((resp) => {
        toast("You have voted Successfully");
        // setMatric("");
        // setLoginId("");

        setButton(true);
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }
        // setMatric("");
        // setLoginId("");
        setButton(true);
      });
  };
  return (
    <form className="NomineeList" onSubmit={handleSubmit}>
      {nominees.map((val) => (
        <div className="list" key={val.id}>
          <label id="vote" className="radio">
            <input
              name="vote"
              id="vote"
              type="radio"
              value={val.id}
              onChange={(evt) => setUserId(evt.target.value)}
            />
            {toTitleCase(val.name)}({toTitleCase(val.Category.name)})
          </label>
        </div>
      ))}

      <div className="columns">
        <div className="column">
          <input
            type="text"
            autoComplete="off"
            placeholder="Matric(FUO/16/BCH/1102)"
            className="input is-primary"
            onChange={(evt) => setMatric(evt.target.value)}
            value={matric}
          />
        </div>

        <div className="column">
          <input
            type="text"
            autoComplete="off"
            placeholder="Votting Code"
            className="input is-primary"
            onChange={(evt) => setLoginId(evt.target.value)}
            value={loginId}
          />
        </div>

        <div className="column">
          {button ? (
            <button type="submit" className="button is-primary">
              Vote
            </button>
          ) : (
            <button type="submit" className="button is-primary is-loading">
              Vote
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
