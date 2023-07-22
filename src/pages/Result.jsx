import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Nominees } from "../components/Nominees";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchInput } from "../components/SearchInput";
import { ViewResult } from "../components/ViewResult";

import { Faculty } from "../components/login/Faculty";

import { URL_ADDRESS, FacultyId } from "../components/Api";

export const Result = () => {
  const [category, setCategory] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    Axios.get(`${URL_ADDRESS}/api/category/faculty?FacultyId=${FacultyId}`)
      .then((resp) => {
        console.log(resp.data);
        setCategory(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearchInputSubmit = (categoryId) => {
    Axios.get(
      `${URL_ADDRESS}/api/result?categoryId=${categoryId}&facultyId=${FacultyId}`
    )

      .then((resp) => {
        setResults(resp.data);
        // if (resp.statusText === "OK") {
        //   console.log(resp.data);
        //   setResults(resp.data);
        // }
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
    <>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column content">
            <h1>FU Otuoke Election Portal</h1>
          </div>
        </div>

        {category.length > 0 ? (
          <SearchInput
            handleSearchInputSubmit={handleSearchInputSubmit}
            category={category}
            defaultTitle="Select Result"
            title="Get Results"
          />
        ) : (
          <h1 className="content">Loading...</h1>
        )}

        <div className="columns">
          {results.length > 0 && <ViewResult results={results} />}
        </div>

        <ToastContainer />
      </div>

      <div className="footer">
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <a href="https://fuotuoke.edu.ng">Federal Unv Otuoke</a>
              <a href="#"></a>.<a href="#">@ICT</a>.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
