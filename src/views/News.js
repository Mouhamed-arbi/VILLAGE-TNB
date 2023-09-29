import React, { useState, useEffect } from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { CardBody } from "reactstrap";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function News() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in yyyy-MM-dd format
  const [DateAjou, setDateAjou] = useState(currentDate);
  const [selectedImage, setSelectedImage] = useState("");
  const [Data, setData] = useState([]);
  const [error, setError] = useState("");
  const [User, setUser] = useState();

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
        setUser(res.data[0].User_ID);
        handleGet(res.data[0].User_ID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePostNews = async () => {
    const img = await uploadFile(selectedImage);
    console.log(img);
    const currentDate = new Date().toISOString().split("T")[0];
    const tit = await uploadFile(title);
    const newss = {
      Description: description,
      image: img,
      Title: tit,
      Date_Ajout: currentDate,
      User_ID: User,
    };
    console.log("hh ", newss);
    axios
      .post("http://localhost:5000/news", newss)
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
          title: error,
          text: "Oops...",
        });
      });
  };

  const handleGet = (id) => {
    axios
      .get(`http://localhost:5000/onenew?User_ID=${id}`)
      .then((res) => {
        setData(res.data); //
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer ce post de News ?")
    ) {
      axios
        .delete(`http://localhost:5000/delnew?Id_News=${id}`)
        .then(() => {
          const updatedNew = Data.filter((item) => item.User_ID !== id);
          setData(updatedNew);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  useEffect(() => {
    handleGet();
  }, [Data]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Ajouter des nouvelles</Card.Title>
              </Card.Header>

              {/* <Card.Body>
                <div className="typography-line">
                  <span>Primary Text</span>
                  <p className="text-primary">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Info Text</span>
                  <p className="text-info">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Success Text</span>
                  <p className="text-success">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Warning Text</span>
                  <p className="text-warning">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Danger Text</span>
                  <p className="text-danger">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                
              </Card.Body> */}
              <div className="news-form">
                <CardBody>
                  <Row>
                    <Col md="6">
                      {/* New Post Form */}
                      <h5>
                        <small> Remplissez les espaces</small>
                      </h5>
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
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
<small>target file</small>
                        <input
                          type="file"
                          name="Title"
                          onChange={(event) => {
                            console.log(event.target.files[0]);
                            setTitle(event.target.files[0]);
                          }}
                        />

                        {selectedImage && (
                          <div>
                            <img
                              alt="not found"
                              width={"250px"}
                              src={URL.createObjectURL(title)}
                            />
                            <br />
                            <button onClick={() => setTitle(null)}>
                              Supprimer
                            </button>
                          </div>
                        )}

                        <br />
                        <br />
                        <small>image new</small>

                        <input
                          type="file"
                          name="myImage"
                          onChange={(event) => {
                            console.log(event.target.files[0]);
                            setSelectedImage(event.target.files[0]);
                          }}
                        />

                        {selectedImage && (
                          <div>
                            <img
                              alt="not found"
                              width={"250px"}
                              src={URL.createObjectURL(selectedImage)}
                            />
                            <br />
                            <button onClick={() => setSelectedImage(null)}>
                              Supprimer
                            </button>
                          </div>
                        )}

                        <br />
                        <br />
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Gouvernorat"
                          value={DateAjou}
                          onChange={(e) => setDateAjou(e.target.value)}
                        />
                        <button
                          className="btn btn-primary mt-3"
                          onClick={handlePostNews}
                        >
                          Poste
                        </button>
                      </div>
                    </Col>
                    <Col md="6">
                      <h5>
                        <small>Mes actualités Poster</small>
                      </h5>
                      {Data.map((PoNews, index) => (
                        <MDBCarousel
                          showIndicators
                          showControls
                          fade
                          key={index}
                        >
                          <MDBCarouselItem
                            className="w-100 d-block"
                            itemId={1}
                            src={PoNews.image}
                            alt="..."
                          >
                            <h3>{PoNews.Description}</h3>
                            <Button
                              onClick={() => handleDelete(PoNews.Id_News)}
                            >
                              Supprimer
                            </Button>
                          </MDBCarouselItem>
                        </MDBCarousel>
                      ))}
                    </Col>
                  </Row>
                </CardBody>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default News;
