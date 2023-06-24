import { useState } from "react";
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
    <form onSubmit={handleCategorySubmit}>
      <select onChange={(evt) => setCategoryId(evt.target.value)}>
        <option>{defaultTitle}</option>
        {category.map((val) => (
          <option key={val.id} value={val.id}>
            {val.name}
          </option>
        ))}
      </select>

      <button type="submit">{title}</button>
    </form>
  );
};
