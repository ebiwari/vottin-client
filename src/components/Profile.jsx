import { useState } from "react";
import Axios from "axios";
import { URL_ADDRESS } from "../App";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Matric No</label>
        <input type="text" onChange={(evt) => setMatric(evt.target.value)} />
      </div>

      <div>
        <input type="file" onChange={(evt) => setFiles(evt.target.files)} />
      </div>

      <button>Submit Form</button>
    </form>
  );
};
