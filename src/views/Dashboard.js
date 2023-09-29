import React from "react";
import ChartistGraph from "react-chartist";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import SlideShow from "../components/SlideShow/SlideShow";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
  return (
    
    <>
      <Container fluid>
        <Row>
          <Col>
            <SlideShow />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col lg="4" sm="7" >
            <Card className="card-stats">
              <Card.Body>
                <Link to="/Carpooling" className="w-100 mb-4 text-center">
                  <Row >
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        {/* <i className="nc-icon nc-bus-front-12"></i> */}
                        <img
                                                                      style={{ width: "60px", height: "60px" }}

                          src="https://previews.123rf.com/images/imagevectors/imagevectors1601/imagevectors160100027/50598590-plat-vert-ic%C3%B4ne-de-voiture-et-le-cercle-vert.jpg"
                          className="card-image "
                        ></img>
                      </div>
                    </Col>

                    <Col xs="7">
                      <div className="numbers ">
                        <p className="card-category text-center">Covoiturage</p>
                        <Card.Title as="h4"></Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
              <Card.Footer>
                {/* <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="7">
            <Card className="card-stats">
              <Card.Body>
              <Link to="/Galerie" className="w-100 mb-4 text-center">

                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      {/* <i className="nc-icon nc-album-2"></i>                    */}
                      <img
                                                                    style={{ width: "60px", height: "60px" }}

                        src="https://previews.123rf.com/images/imagevectors/imagevectors1601/imagevectors160100505/50599747-flat-ic%C3%B4ne-cam%C3%A9ra-verte-et-cercle-vert.jpg"
                        className="card-image"
                      ></img>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category text-center">Galerie</p>
                      <Card.Title as="h4"></Card.Title>
                    </div>
                  </Col>
                </Row>
                </Link>
              </Card.Body>
              <Card.Footer>
                {/* <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  
                </div> */}
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="4" sm="7">
            <Card className="card-stats">
              <Card.Body>
              <Link to="/conventions" className="w-100 mb-4 text-center">
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      {/* <i className="nc-icon nc-tag-content"></i> */}
                      <img
                                              style={{ width: "60px", height: "60px" }}

                        src="https://previews.123rf.com/images/imagevectors/imagevectors1601/imagevectors160100653/50599931-plat-vert-ic%C3%B4ne-accord-de-handshake-et-cercle-vert.jpg"
                        className="card-image"
                      ></img>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category text-center">Conventions</p>
                      <Card.Title as="h4"></Card.Title>
                    </div>
                  </Col>
                </Row>
                </Link>
              </Card.Body>
              <Card.Footer>
                {/* <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
