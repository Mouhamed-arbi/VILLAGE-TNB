import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import iconFile from "./assets/img/fileicon.png";

const Conventions = () => {
  const [Data, setData] = useState([]);

  const handleGet = () => {
    axios
      .get("http://localhost:5000/conv")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadFile = (fileUrl) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "downloaded-file.xls"; // You can set the desired file name here
    link.target = "_blank";

    // Trigger the click event on the anchor to start the download
    document.body.appendChild(link);
    link.click();

    // Clean up the temporary anchor element
    document.body.removeChild(link);
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Les Conventions Disponibles</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((convention, index) => (
            <tr key={index}>
              <td>{convention.Ajout_Name}</td>
              <td>{convention.Date_Ajout}</td>
              <td onClick={() => downloadFile(convention.File)}>
                <img
                  src={iconFile}
                  alt="File Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Conventions;
