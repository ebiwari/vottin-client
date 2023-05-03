import { useState } from "react";

export const NomineeList = ({ nominees, hanldeNomineesSubmit }) => {
  const [loginId, setLoginId] = useState("");
  const [userId, setUserId] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(loginId, userId);
    if (loginId.length > 0) {
      hanldeNomineesSubmit({ loginId, userId: Number(userId) });
    }
  };
  return (
    <form className="NomineeList" onSubmit={handleSubmit}>
      <div className="List">
        {nominees.map((val) => (
          <label key={val.id} id="vote" className="label">
            <input
              name="vote"
              id="vote"
              type="radio"
              value={val.id}
              onChange={(evt) => setUserId(evt.target.value)}
            />
            {val.name}({val.department})
          </label>
        ))}
      </div>

      <div className="field">
        <input
          type="text"
          autoComplete="off"
          placeholder="Votting Code"
          onChange={(evt) => setLoginId(evt.target.value)}
          value={loginId}
        />

        <button type="submit" className="homeButton">
          Vote
        </button>
      </div>
    </form>
  );
};
