import { useState } from "react";
import Axios from "axios";
import { URL_ADDRESS } from "./Api";

export const Profile = () => {
  const [files, setFiles] = useState(null);
  const [matric, setMatric] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    console.log(matric);

    evt.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("file", files[0]);
    form.append("upload_preset", "fuo_votting_img");

    try {
      const pix = await Axios.post(
        "https://api.cloudinary.com/v1_1/dd2ua3sf2/image/upload",
        form
      );

      if (pix.statusText === "OK") {
        const result = await Axios.post(`${URL_ADDRESS}/api/users/updateurl`, {
          matric: matric,
          url: pix.data.url,
        });

        console.log(result);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  if (loading) {
    return <h1>loading.....</h1>;
  }

  return (
    <>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column content">
            <h1>Update Picture</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="columns">
          <div className="column">
            <input
              type="text"
              className="input"
              onChange={(evt) => setMatric(evt.target.value)}
              placeholder="Matric(FUO/16/BCH/001)"
            />
          </div>

          <div className="column">
            <input
              className="input"
              type="file"
              onChange={(evt) => setFiles(evt.target.files)}
            />
          </div>

          <div className="column">
            <button className="button">Submit Form</button>
          </div>
        </form>
      </div>

      <div className="footer">
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <a href="https://fuotuoke.edu.ng">Federal Unv Otuoke</a>
              <a href="#"></a>.<a href="#">@ICT</a>.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
