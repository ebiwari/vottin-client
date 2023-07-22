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
            <div className="content vote-result is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
              <h2>Totals Votes:{result.total}</h2>
              <p>{result.name.toUpperCase()}</p>
              <p>({result.matric.toUpperCase()})</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
