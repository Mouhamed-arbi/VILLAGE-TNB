import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Table, Container, Col } from 'react-bootstrap';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Annuaire() {
  const [data, setData] = useState([]);

  const handleGet = () => {
    axios
      .get('http://localhost:5000/getallemp/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (empID) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const findEmployeeById = () =>{
        for (let i = 0; i < data.length; i++) {
          if (data[i].Emp_Id === empID) {
            return data[i];
          }
          else return null
      } }
      var newData=findEmployeeById()
      console.log("kifehh ",newData)     
      axios
      .post(`http://localhost:5000/archv`,newData)
      .then((suc) => {
        console.log('archived',suc)

      })
      .catch((error) => console.error(error));
     


    axios
      .delete(`http://localhost:5000/delete?Emp_Id=${empID}`)
      .then(() => {
        const updatedEmp = data.filter((item) => item.Emp_Id !== empID);
        setData(updatedEmp);
      })
      .catch((error) => console.error(error))
    }
  };

  

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <Container className="mt-4">
      <Col md="12">
        <Card className="strpied-tabled-with-hover">
          <Card.Header>
            <Card.Title as="h4">Les informations des employés</Card.Title>
            <p className="card-category">Voici les employés de TNB</p>
          </Card.Header>
          <Card.Body className="table-full-width table-responsive px-0">
            <Table className="table-hover table-striped">
              <thead>
                <tr>
                  <th className="border-0">Image</th>
                  <th className="border-0">NOM ET PRÉNOM</th>
                  <th className="border-0">Titre d'emploi</th>
                  <th className="border-0">E-mail</th>
                  <th className="border-0">Matricule</th>
                </tr>
              </thead>
              <tbody>
                {data.map((employee, index) => (
                  <tr key={index}>
                   <td className="card-user" md="md"> 
                   <Link to={`/EmpInfo?email=${employee.E_Mail}`} className='w-100 mb-4 text-center'>
                   <img
                   className="card-image"
                  alt="..."
                  src={employee.image}
                  
                ></img>
                </Link>
                </td>
                
                    <td>{employee.Full_Name}</td>
                    <td className="text-success">{employee.Job_Title}</td>
                    <td>{employee.E_Mail}</td>
                    <td>{employee.Matricule}</td>
                    <td><MDBBtn
                    className='w-100 mb-4' size='md'
                    onClick={() => handleDelete(employee.Emp_Id)}
                  >
                    Supprimer
                  </MDBBtn></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card.Title as="h4"> Pour ajouter des coordonnées d'un nouvel employé</Card.Title>

         <Link to='/CreateEmp' className='w-100 mb-4 text-center'>
         <MDBBtn >
                    Ajouter
                  </MDBBtn>
         
         </Link>
      </Col>
    </Container>
  );
}

export default Annuaire;
