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
  const [status, setStatus] = useState(true);

  useEffect(() => {
    setStatus(true);
    Axios.get(`${URL_ADDRESS}/api/category`)
      .then((resp) => {
        setStatus(false);
        setCategory(resp.data);
      })
      .catch((err) => {
        setStatus(false);
        if (err.response) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }
      });
  }, [nominees]);

  const handleCategorySubmit = (evt) => {
    evt.preventDefault();
    toast("Enter your Voting Code");
    if (select.length > 0) {
      setStatus(true);
      Axios.get(`${URL_ADDRESS}/api/users?CategoryId=${select}`)
        .then((resp) => {
          setStatus(false);
          setNominees(resp.data);
        })
        .catch((err) => {
          if (err.response) {
            toast(err.response.data.error);
          } else {
            toast(err.message);
          }
        });
    } else {
      toast("Enter your Voting Code");
    }
  };

  const hanldeNomineesSubmit = (payload) => {
    Axios.post(`${URL_ADDRESS}/api/vote`, {
      ...payload,
      categoryId: Number(select),
    })

      .then((resp) => {
        toast("You have voted Successfully");
        setNominees([]);
        setCategory([]);
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }
        setNominees([]);
        setCategory([]);
      });
  };

  return (
    <div className="Home">
      {status ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <h1 className="logoText">FU Otuoke Election Portal</h1>
          <form onSubmit={handleCategorySubmit}>
            {category.length > 0 && (
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
            )}
          </form>

          <div className="content">
            {nominees.length > 0 && (
              <Nominees
                nominees={nominees}
                hanldeNomineesSubmit={hanldeNomineesSubmit}
              />
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};
