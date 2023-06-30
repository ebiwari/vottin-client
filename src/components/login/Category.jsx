import { useEffect, useState } from "react";
import Axios from "axios";
import { toTitleCase } from "../util/Helper";

export const Category = ({ category, handleLoginCategory }) => {
  const handleCategory = (evt) => {
    handleLoginCategory(evt.target.value);
  };
  return (
    <>
      <div className="control has-icons-left select-margin">
        <div className="select is-success has-icons-left">
          <select onChange={handleCategory}>
            <option value="">Select Category</option>
            {category.map((val) => (
              <option key={val.id} value={val.id}>
                {toTitleCase(val.name)}
              </option>
            ))}
          </select>
        </div>

        <div className="icon is-small is-left">
          <i className="fas fa-home"></i>
        </div>
      </div>
    </>
  );
};
