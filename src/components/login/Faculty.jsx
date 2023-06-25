import { useEffect, useState } from "react";
import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL_ADDRESS } from "../Api";

export const Faculty = ({ handleFaculty }) => {
  const [faculty, setFaculty] = useState([]);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    Axios.get(`${URL_ADDRESS}/api/faculty`)
      .then((resp) => {
        setStatus(false);
        setFaculty(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelect = (evt) => {
    handleFaculty(evt.target.value);
  };

  return (
    <>
      {status ? (
        <h1>Loading...</h1>
      ) : (
        <div className="control has-icons-left select-margin">
          <div className="select is-success has-icons-left">
            <select onChange={handleSelect}>
              <option>Select Faculty</option>
              {faculty.map((val) => (
                <option key={val.id} value={val.id}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          <div className="icon is-small is-left">
            <i className="fas fa-globe"></i>
          </div>
        </div>
      )}
    </>
  );
};
