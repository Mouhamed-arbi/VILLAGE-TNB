import React, { useState, useEffect } from 'react';
import axios from 'axios';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Sinformer() {
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

  useEffect(() => {
    handleGet(); // Fetch data
  }, []); // Empty dependency array, runs once on component mount

  
 



  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">CDI</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                    <th className="border-0">ID</th>
                      <th className="border-0">Full NAME</th>
                      <th className="border-0">SITUATION</th>
                    </tr>
                  </thead>
                  <tbody>
  {data.map((employee,index) => {
    if (employee.Type_Contract === "TITULAIRE") {
      return (
        <tr key={employee.Emp_Id}>
          <td>{index}</td>
          <td>{employee.Full_Name}</td>
          <td>{employee.Type_Contract}</td>
        </tr>
      );
    }
    return null; // Return null for employees with a different contract type
  })}
</tbody>

                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">CDD</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Full NAME</th>
                      <th className="border-0">SITUATION</th>
                    </tr>
                  </thead>
                  <tbody>
  {data.map((employee,index) => {
    if (employee.Type_Contract === "CONTRACTUEL") {
      return (
        <tr key={employee.Emp_Id}>
          <td>{index+1}</td>
          <td>{employee.Full_Name}</td>
          <td>{employee.Type_Contract}</td>
        </tr>
      );
    }
    return null; // Return null for employees with a different contract type
  })}
</tbody>

                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">C.I.V.P</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                    <th className="border-0">ID</th>
                      <th className="border-0">Full NAME</th>
                      <th className="border-0">SITUATION</th>
                    </tr>
                  </thead>
                  <tbody>
  {data.map((employee) => {
    if (employee.Type_Contract === "S.I.V.P") {
      return (
        <tr key={employee.Emp_Id}>
          <td>{employee.Emp_Id}</td>
          <td>{employee.Full_Name}</td>
          <td>{employee.Type_Contract}</td>
        </tr>
      );
    }
    return null; // Return null for employees with a different contract type
  })}
</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Les STAGIAIRES</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                  <tr>
                    <th className="border-0">ID</th>
                      <th className="border-0">Full NAME</th>
                      <th className="border-0">SITUATION</th>
                    </tr>
                  </thead>
                  <tbody>
  {data.map((employee,index) => {
    if (employee.Type_Contract === "stagiaire") {
      return (
        <tr key={employee.Emp_Id}>
          <td>{index+1}</td>
          <td>{employee.Full_Name}</td>
          <td>{employee.Type_Contract}</td>
        </tr>
      );
    }
    return null; // Return null for employees with a different contract type
  })}
</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sinformer;
