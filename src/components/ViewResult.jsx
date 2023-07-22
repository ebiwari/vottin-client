import URLIMAGE from "../assets/nourl.png";
export const ViewResult = ({ results }) => {
  return (
    <>
      {results.map((result, index) => (
        <div
          key={index}
          className="column is-6 resultContent is-justify-content-center"
        >
          <div className="resultTotal is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <figure className="is-1by1">
              <img
                className="is-rounded"
                src={result.url ? result.url : URLIMAGE}
              />
            </figure>
            <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
              <p className="voteText">Totals Votes:{result.total}</p>
              <p className="voteText">{result.name.toUpperCase()}</p>
              <p>({result.matric.toUpperCase()})</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
