import { useState } from "react";
import { toTitleCase } from "./util/Helper";
export const SearchInput = ({
  handleSearchInputSubmit,
  defaultTitle,
  title,
  category,
}) => {
  const [categoryId, setCategoryId] = useState(null);

  const handleCategorySubmit = (evt) => {
    evt.preventDefault();
    if (categoryId) {
      handleSearchInputSubmit(Number(categoryId));
    }
  };

  return (
    <form onSubmit={handleCategorySubmit} className="columns">
      <div className="column  is-5">
        <div className="control has-icons-left">
          <div className="select is-large">
            <select onChange={(evt) => setCategoryId(evt.target.value)}>
              <option>{defaultTitle}</option>
              {category.map((val) => (
                <option key={val.id} value={val.id}>
                  {toTitleCase(val.name)}
                </option>
              ))}
            </select>
          </div>
          <span className="icon is-large is-left">
            <i className="fas fa-globe"></i>
          </span>
        </div>
      </div>

      <div className="column is-2">
        <button type="submit" className="button ">
          {title}
        </button>
      </div>
    </form>
  );
};
