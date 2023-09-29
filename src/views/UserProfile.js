import React, { useState, useEffect } from "react";
import axios from "axios";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";


function User() {
  const userEmail = localStorage.getItem("userEmail");
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [User, setUser] = useState();
  const [Name, setName] = useState("");
  const [Matr, setMatr] = useState("");
  const [Pass, setPass] = useState("");
  const [Mail, setMail] = useState("");

  console.log("Name  ", Name);
  console.log("Matricule  ", Matr);
  console.log("Mail  ", Mail);
  console.log("Password  ", Pass);

  localStorage.setItem("Full_Name", data.Full_Name);
  

  localStorage.setItem("User_ID", User);
  console.log("user id  ", User);

  const handleGet = () => {
    axios
      .get(`http://localhost:5000/getuser/getuser?email=${userEmail}`)
      .then((res) => {
        setData(res.data[0]);
        setUser(res.data[0].User_ID);
        setName(res.data[0].Full_Name)
        setMatr(res.data[0].Matricule)
        setPass(res.data[0].Password)
        setMail(res.data[0].E_Mail)

        console.log("picture", res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  

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

  const apiUpdate = async (email) => {
    let img;
    
    if (selectedImage) {
      img = await uploadFile(selectedImage);
    } else {
      img = data.Picture; // Assuming `data` is defined elsewhere
    }
  
    console.log(Pass);
  
    const user = {
      Full_Name: Name,
      Matricule: Matr,
      Password: Pass,
      Picture: img,
      E_Mail: Mail,
    };
  
    console.log("userNew ", user);
  
    try {
      const res = await axios.put(`http://localhost:5000/update/${email}`, user);
  console.log(res)
      if (res) {
        Swal.fire({
          icon: 'success',
          title: 'Authentication successful',
        });
      } 
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error updating user',
      });
    }
  };
  useEffect(() => {
    handleGet();
  }, [data]);
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company (disabled)</label>
                        <Form.Control
                          defaultValue="Spring Travel Services"
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Matricule</label>
                        <Form.Control
                          defaultValue={data.Matricule}
                          placeholder="Matricule"
                          type="text"
                          onChange={(event) => setMatr(event.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <Form.Control
                          placeholder="Password"
                          type="password"
                          defaultValue={data.Password}
                          onChange={(event) => setPass(event.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Full Name</label>
                        <Form.Control
                          placeholder="Full Name"
                          defaultValue={data.Full_Name}
                          onChange={(event) => setName(event.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Email address</label>
                        <Form.Control
                          placeholder="Email"
                          defaultValue={data.E_Mail}
                          onChange={(event) => setMail(event.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <input
                  className="btn-fill center-button"
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
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                        onClick={() => setSelectedImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <div className="clearfix center">
                  <br></br>

                    <Button
                      className="btn-fill center-button"
                      onClick={() => apiUpdate(data.E_Mail)}
                      type ="submit"
                    >
                      Update Profile
                    </Button>
                  </div>
                </Form>
                <br></br>
                <br></br>

                <Card.Title as="h8">Pour vérifier plus, déconnectez-vous et revenez </Card.Title>

              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={data.Picture}
                    ></img>
                    <h5 className="title"> {data.Full_Name}</h5>
                  </a>
                  <p className="description">{data.Matricule}</p>
                </div>
                <p className="description text-center">
                  "Agence de voyage le N°1 D'Hôtel Tunisie" <br></br>
                  <br></br>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </>
  );
}

export default User;
