import { useState } from "react";
import Axios from "axios";
import { URL_ADDRESS } from "../../components/Api";

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

  const handleSubmit = (evt) => {
    evt.preventDefault();

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
        setMatric("");
        setLoginId("");
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }
        setMatric("");
        setLoginId("");
      });
  };
  return (
    <form className="NomineeList" onSubmit={handleSubmit}>
      <div className="List">
        {nominees.map((val) => (
          <label key={val.id} id="vote" className="label">
            <input
              name="vote"
              id="vote"
              type="radio"
              value={val.id}
              onChange={(evt) => setUserId(evt.target.value)}
            />
            {val.name}({val.Category.name})
          </label>
        ))}
      </div>

      <div className="field">
        <input
          type="text"
          autoComplete="off"
          placeholder="Matric(FUO/16/BCH/1102)"
          onChange={(evt) => setMatric(evt.target.value)}
          value={matric}
        />

        <input
          type="text"
          autoComplete="off"
          placeholder="Votting Code"
          onChange={(evt) => setLoginId(evt.target.value)}
          value={loginId}
        />

        <div>
          <button type="submit" className="homeButton">
            Vote
          </button>
        </div>
      </div>
    </form>
  );
};