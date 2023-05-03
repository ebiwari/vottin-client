import { useEffect, useState } from "react";
import Axios from "axios";
import { Nominees } from "../components/Nominees";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL_ADDRESS } from "../App";

export const Home = () => {
  const [category, setCategory] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    Axios.get(`${URL_ADDRESS}/api/category`)
      .then((resp) => {
        console.log(resp);
        if (resp.statusText === "OK") {
          setCategory(resp.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCategorySubmit = (evt) => {
    evt.preventDefault();
    if (select.length > 0) {
      Axios.get(`${URL_ADDRESS}/api/users?CategoryId=${select}`)
        .then((resp) => {
          console.log(resp);
          setNominees(resp.data);
        })
        .catch((err) => {
          if (err.response) {
            toast(err.response.data.error);
          } else {
            toast(err.message);
          }
        });
    }
  };

  const hanldeNomineesSubmit = (payload) => {
    Axios.post(`${URL_ADDRESS}/api/vote`, {
      ...payload,
      categoryId: Number(select),
    })

      .then((resp) => {
        console.log(resp);
        toast("You have voted Successfully");
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }
      });
  };

  return (
    <div className="Home">
      <h1 className="logoText">FU Otuoke Election Portal</h1>
      <form onSubmit={handleCategorySubmit}>
        {category.length > 0 ? (
          <>
            <select onChange={(evt) => setSelect(evt.target.value)}>
              <option>Select a Categry</option>
              {category.map((val) => (
                <option key={val.id} value={val.id}>
                  {val.name}
                </option>
              ))}
            </select>

            <button type="submit">Get Nominees</button>
          </>
        ) : (
          <select>
            <option>Select a Categry</option>
          </select>
        )}
      </form>

      <div className="content">
        {nominees.length > 0 && (
          <Nominees
            nominees={nominees}
            hanldeNomineesSubmit={hanldeNomineesSubmit}
          />
        )}

        <ToastContainer />
      </div>
    </div>
  );
};
