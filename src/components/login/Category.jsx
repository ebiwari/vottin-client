import { useEffect, useState } from "react";
import Axios from "axios";

export const Category = ({ category, handleLoginCategory }) => {
  const handleCategory = (evt) => {
    handleLoginCategory(evt.target.value);
  };
  return (
    <>
      <select onChange={handleCategory}>
        <option value="">Select Category</option>
        {category.map((val) => (
          <option key={val.id} value={val.id}>
            {val.name}
          </option>
        ))}
      </select>
    </>
  );
};
