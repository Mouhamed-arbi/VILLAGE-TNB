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


function moncovoiturage() {
  const [Location, setLocation] = useState("");
  const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in yyyy-MM-dd format
  const [DateAjou, setDateAjou] = useState(currentDate);
  const [Data, setData] = useState([]);
  const [name, setname] = useState("");
  const [Filee, setFilee] = useState("");

  const [DataUser, setDataUser] = useState([]);
  const [User, setUser] = useState();
  const [error, setError] = useState("");

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

  const handlePostConv = async () => {
    const Fileee = await uploadFile(Filee);
    const conv = {
      File: Fileee,
      Ajout_Name: name,
      Date_Ajout: DateAjou,
      User_ID: User,
    };
    axios
      .post("http://localhost:5000/conv", conv)
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
      .get(`http://localhost:5000/oneconv?User_ID=${iduser}`)
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
          const updatedConv = Data.filter((item) => item.Id_Convention_TNB !== id);
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
            <Card.Title as="h4">Mes Annonces Des Conventions</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <h5>
                  <small> Publier un Conventions</small>
                </h5>
                {/* Conventions Post Form */}
                <div
                  className="mb-3"
                  style={{
                    maxWidth: "400px", // Adjust the width as needed
                    margin: "0 auto", // Center the ul horizontally
                  }}
                >
                  <label htmlFor="carpoolInput" className="form-label">
                    --
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    value={Location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Date"
                    value={DateAjou}
                    onChange={(e) => setDateAjou(e.target.value)}
                  />
                  <input
                    type="file"
                    name="file"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setFilee(event.target.files[0]);
                    }}
                  />

                  <button
                    className="btn btn-primary mt-3"
                    onClick={handlePostConv}
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
                  {Data.map((Convv, index) => (
                    <li key={index} className="list-group-item">
                      <img
                        src="https://img-ccmbg-1.lefigaro.fr/Gmbfy9_tqNTrTfZAWcr4pbn-Ahc=/1500x/smart/7ac888fc1b6046bba6e2789cd5d9cda6/ccmcms-figaroemploi/32526696.jpg"
                        alt="Car"
                        width="100"
                        height="100"
                      />{" "}
                      <br></br>
                      <strong>Name :</strong> {Convv.Ajout_Name}
                      <br />
                      <strong>Date :</strong> {Convv.Date_Ajout}
                      <br />
                      <strong>File :</strong>
                      <img
                        src={iconFile}
                        alt="File Icon"
                        style={{ width: "30px", height: "30px" }}
                      />{" "}
                      <br />
                      <Button onClick={() => handleDelete(Convv.Id_Convention_TNB)}>
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

export default moncovoiturage;
