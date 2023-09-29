import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'; // Import axios
import './Gallery.css'; // Import your custom CSS file

const Gallery = () => {
  const [data, setData] = useState([]);

  const handleGet = () => {
    axios
      .get("http://localhost:5000/gal")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <Container>
      <h1>Gallery</h1>
      <Row>
        {data.map((mediaItem, index) => (
          <Col md={4} key={index}>
            <div className="gallery-item">
              {mediaItem.Type_fich === 'image' ? (
                <img src={mediaItem.FileVdImg} alt={`Image ${index + 1}`} />
                
              ) : (
                <div>
                  <video controls>
                  <source src={mediaItem.FileVdImg} type_fich="video" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
