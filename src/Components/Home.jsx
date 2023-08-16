import React, { useState } from "react";
import file from "../images/file-upload1.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState([]);

  let text;

  const fileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setTitle(file.name);
      text = reader.result.split("\n");
      console.log(text);
      setResult(reader.result.split("\n"));
    };
    reader.onerror = () => {
      alert("Choose The File!!");
    };
  };

  return (
    <div>
      {/* <input type='file' onChange={fileChange} /> */}
      <div class="container-fluid myClass py-3 d-flex justify-content-center ">
        <form
          action=""
          onClick={() => document.querySelector(".form-control").click()}
        >
          <img src={file} height={120} width={150} alt="file_uploader" />
          <h3>Browse Files to Upload</h3>
          <div className="input-group custom-file-button">
            {/* <label className="input-group-text" for="inputGroupFile">Your Custom Text</label> */}
            <input
              type="file"
              className="form-control"
              id="inputGroupFile"
              onChange={fileChange}
              hidden
            />
          </div>
          <h6 className="text-white">{title}</h6>
        </form>
        <Link to="/chat" className="btn btn-dark my-3" state={result}>
          Get the Chat
        </Link>
      </div>
    </div>
  );
};

export default Home;
