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

function moncovoiturage() {
  const [worksite, setWorksite] = useState("");
  const [delegation, setDelegation] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [Data, setData] = useState([]);
  const [name, setname] = useState("");
  const [DataUser, setDataUser] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [User, setUser] = useState();



  const [error, setError] = useState("");


  const userEmail = localStorage.getItem("userEmail");

  const ParticipationGet = () => {
    axios
      .get(`http://localhost:5000/par`)
      .then((res) => {
        setParticipants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetUser = () => {
    axios
      .get(`http://localhost:5000/getuser/getuser?email=${userEmail}`)
      .then((res) => {
        setDataUser(res.data);
        handleGet(res.data[0].User_ID);
        setUser(res.data[0].User_ID)

      })
      .catch((err) => {
        console.log(err);
      });
  };

console.log('hh ',User)
  const handleGet = (iduser) => {
    axios
      .get(`http://localhost:5000/onecar/onecar?User_ID=${iduser}`)
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
    ParticipationGet()
  }, []);
  useEffect(() => {
    handleGet();
  }, []);
console.log(Data)
  const handlePostCarpool = async () => {
    const carp = {
      Work_site: worksite,
      Delegation: delegation,
      Governorate: governorate,
      User_ID: User,
      Name: name,
    };
    axios
      .post("http://localhost:5000/car", carp)
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

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post de covoiturage ?")) {
    axios
      .delete(`http://localhost:5000/delcar/delcar?Id_Carpooling=${id}`)
      .then(() => {
        const updatedCar = Data.filter((item) => item.Id_Carpooling !== id);
        setData(updatedCar);
      })
      .catch((error) => console.error(error));

      axios
      .delete(`http://localhost:5000/delpar/delpar?Id_Carpooling=${id}`)
      .then(() => {
        const updatedPar = Data.filter((item) => item.Id_Carpooling !== id);
        setData(updatedPar);
      })
      .catch((error) => console.error(error));

    }
  };
  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Mes Annonces De Covoiturage</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <h5>
                  <small>          Publier un covoiturage
</small>
                </h5>
                {/* Carpool Post Form */}
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
          placeholder="chantier"
          value={worksite}
          onChange={(e) => setWorksite(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Délégation"
          value={delegation}
          onChange={(e) => setDelegation(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Gouvernorat"
          value={governorate}
          onChange={(e) => setGovernorate(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={handlePostCarpool}>
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
                  {Data.map((carpool, index) => (
                    <li key={index} className="list-group-item">
                      Publier par {carpool.Name}
                      <br></br>
                      <img
                        src="https://www.mobilitemutuelle.fr/content/uploads/2021/12/Covoit.jpg"
                        alt="Car"
                        width="100"
                        height="100"
                      />{" "}
                      <br></br>
                      <strong>chantier :</strong> {carpool.Work_site}
                      <br />
                      <strong>Délégation :</strong> {carpool.Delegation}
                      <br />
                      <strong>Gouvernorat :</strong> {carpool.Governorate}
                      <br />
                      <Button onClick={() => handleDelete(carpool.Id_Carpooling)}>Supprimer</Button>
 {/* Display Participants */}
 {participants.length > 0 && (
              <div>
                <strong>Participantes :</strong>
                <ul>
                  {participants.map((participant, i) => {
                    if (participant.Id_Carpooling === carpool.Id_Carpooling) {
                      return (
                        <li key={i}>
                          {participant.Name} ( téléphone : {participant.Num_Tel}{" "}
                          )
                        </li>
                      );
                    }
                  })}
                </ul>
                <br></br>
              </div>
            )}
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
