import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Nominees } from "../components/Nominees";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchInput } from "../components/SearchInput";
import { ViewResult } from "../components/ViewResult";

import { Faculty } from "../components/login/Faculty";

import { URL_ADDRESS } from "../components/Api";

export const Result = () => {
  const [category, setCategory] = useState([]);
  const [results, setResults] = useState([]);

  const FacultyId = useRef("");

  // useEffect(() => {
  //   Axios.get(`${URL_ADDRESS}/api/category`)
  //     .then((resp) => {
  //       if (resp.statusText === "OK") {
  //         setCategory(resp.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleSearchInputSubmit = (categoryId) => {
    Axios.get(
      `${URL_ADDRESS}/api/result?categoryId=${categoryId}&facultyId=${FacultyId.current}`
    )

      .then((resp) => {
        if (resp.statusText === "OK") {
          setResults(resp.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }
      });
  };

  const handleFaculty = (payload) => {
    Axios.get(
      `${URL_ADDRESS}/api/category/faculty?FacultyId=${Number(payload)}`
    )
      .then((resp) => {
        setCategory(resp.data);
        FacultyId.current = Number(payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Result">
      <h1 className="logoText">FU Otuoke Election Portal</h1>

      <div>
        <Faculty handleFaculty={handleFaculty} />
      </div>

      {category.length > 0 && (
        <SearchInput
          handleSearchInputSubmit={handleSearchInputSubmit}
          category={category}
          defaultTitle="Select Result"
          title="Get Results"
        />
      )}

      <div className="content">
        {results.length > 0 && <ViewResult results={results} />}

        <ToastContainer />
      </div>
    </div>
  );
};
