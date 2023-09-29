import React, { useState, useEffect } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import iconFile from "../assets/img/fileicon.png";

function mongalerie() {
  const [Data, setData] = useState([]);
  const [Filee, setFilee] = useState("");
  const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in yyyy-MM-dd format
  const [DateAjou, setDateAjou] = useState(currentDate);
  const [DataUser, setDataUser] = useState([]);
  const [User, setUser] = useState();
  const [error, setError] = useState("");
  const [TypeSit, setTypeSit] = useState("");
  

  const userEmail = localStorage.getItem("userEmail");

  const uploadFile = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "yfi7hny5");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dttizflmi/upload",
      form
    );
    return response.data.secure_url;
  };

  const handleGetUser = () => {
    axios
      .get(`http://localhost:5000/getuser/getuser?email=${userEmail}`)
      .then((res) => {
        setDataUser(res.data);
        handleGet(res.data[0].User_ID);
        setUser(res.data[0].User_ID);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePostGal = async () => {
    console.log(TypeSit)

    const Fileee = await uploadFile(Filee);
    const conv = {
      FileVdImg: Fileee,
      Date_Ajout: DateAjou,
      User_ID: User,
      Type_fich:TypeSit
    };
    axios
      .post("http://localhost:5000/gal", conv)
      .then((suc) => {
        setError("CREATED");
        Swal.fire({
          icon: "success",
          title: "CREATED",
        });
      })

      .catch((err) => {
        console.log("this err ", err.response.data);
        setError(err.response.data);
        Swal.fire({
          icon: "error",
          title: "Somthing Wrong ",
          text: "Oops...",
        });
      });
  };

  const handleGet = (iduser) => {
    axios
      .get(`http://localhost:5000/onegal?User_ID=${iduser}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    handleGet();
  }, []);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce post de covoiturage ?"
      )
    ) {
      axios
        .delete(`http://localhost:5000/delconv?Id_Convention_TNB=${id}`)
        .then(() => {
          const updatedConv = Data.filter(
            (item) => item.Id_Convention_TNB !== id
          );
          setData(updatedConv);
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Mes photos et videos</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <h5>
                  <small> Publier des photos et videos</small>
                </h5>
                {/* Conventions Post Form */}
                <div
                  className="mb-3"
                  style={{
                    maxWidth: "400px", // Adjust the width as needed
                    margin: "0 auto", // Center the ul horizontally
                  }}
                >
                
                  <input
                    type="file"
                    name="file"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setFilee(event.target.files[0]);
                    }}
                  />
                   <input
                    type="text"
                    className="form-control"
                    placeholder="Date"
                    value={DateAjou}
                    onChange={(e) => setDateAjou(e.target.value)}
                  />
<br></br>
<p>Type de fichier:</p>
              <input
                type="radio"
                id="image"
                name="image"
                value="image"
                checked={TypeSit === "image"}
                onChange={(e) => setTypeSit(e.target.value)}
              />
              <label htmlFor="image">image</label>
              <br />
              <input
                type="radio"
                id="video"
                name="video"
                value="video"
                checked={TypeSit === "video"}
                onChange={(e) => setTypeSit(e.target.value)}
              />
                            <label htmlFor="video">video</label>
                            <br></br>

                  <button
                    className="btn btn-primary mt-3"
                    onClick={handlePostGal}
                  >
                    Poste
                  </button>
                </div>
              </Col>
              <Col md="6">
                <h5>
                  <small>Mon Poste</small>
                </h5>

                <ul
                  className="list-group"
                  style={{
                    maxWidth: "400px", // Adjust the width as needed
                    margin: "0 auto", // Center the ul horizontally
                  }}
                >
                  {Data.map((gal, index) => (
                    <li key={index} className="list-group-item">
                      <img
                        src="data:image/png;base64,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"
                        alt="Car"
                        width="100"
                        height="100"
                      />{" "}
                      <br></br>
                      {gal.Date_Ajout}
                      <br />
                      
                      <br />
                      <Button
                        onClick={() => handleDelete(gal.Id_Convention_TNB)}
                      >
                        Supprimer
                      </Button>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default mongalerie;
