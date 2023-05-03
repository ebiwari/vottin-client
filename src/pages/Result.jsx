import { useEffect, useState } from "react";
import Axios from "axios";
import { Nominees } from "../components/Nominees";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchInput } from "../components/SearchInput";
import { ViewResult } from "../components/ViewResult";

import { URL_ADDRESS } from "../App";

export const Result = () => {
  const [category, setCategory] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    Axios.get(`${URL_ADDRESS}/api/category`)
      .then((resp) => {
        if (resp.statusText === "OK") {
          setCategory(resp.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearchInputSubmit = (categoryId) => {
    Axios.get(`${URL_ADDRESS}/api/result?categoryId=${categoryId}`)

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

  return (
    <div className="Result">
      <h1 className="logoText">FU Otuoke Election Portal</h1>

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
