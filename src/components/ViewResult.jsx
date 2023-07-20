import URLIMAGE from "../assets/nourl.png";
export const ViewResult = ({ results }) => {
  return (
    <>
      {results.map((result, index) => (
        <div
          key={index}
          style={{ textAlign: "center" }}
          className="column is-4 resultContent"
        >
          <figure>
            <img src={result.url ? result.url : URLIMAGE} />
          </figure>
          <div className="resultTotal">
            <p className="voteText">Totals Votes:{result.total}</p>
            <p className="voteText">{result.name.toUpperCase()}</p>
            <p>({result.matric.toUpperCase()})</p>
          </div>
        </div>
      ))}
    </>
  );
};
