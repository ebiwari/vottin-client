import { useEffect, useState } from "react";
import Axios from "axios";
import { URL_ADDRESS } from "./Api";

export const Category = ({ title, handleCategoryId }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    Axios.get(`${URL_ADDRESS}/api/category`)
      .then((resp) => {
        setCategory(resp.data);
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {category.length > 0 && (
        <>
          <label>{title}</label>
          <select onChange={(evt) => handleCategoryId(evt.target.value)}>
            <option value="">{title}</option>
            {category.map((val) => (
              <option key={val.id} value={val.id}>
                {val.name}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
};
