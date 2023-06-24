import URLIMAGE from "../assets/nourl.png";
export const ViewResult = ({ results }) => {
  return (
    <>
      {results.map((result, index) => (
        <div key={index} className="resultContent">
          <figure>
            <img src={result.url ? result.url : URLIMAGE} />
          </figure>
          <div className="resultTotal">
            <p className="voteText">Totals Votes:{result.total}</p>
            <p className="voteText">{result.name}</p>
            <p>({result.matric})</p>
          </div>
        </div>
      ))}
    </>
  );
};
