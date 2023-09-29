import React, { useState, useEffect } from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import axios from "axios";

function CarouselSlider() {
  const [Data, setData] = useState([]);

  const handleGet = () => {
    axios
      .get("http://localhost:5000/news")
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

  return (
    <>
      {Data.length > 0 ? (
        <MDBCarousel showIndicators showControls fade>
          {Data.map((item, index) => (
            <div key={index}>
              <MDBCarouselItem
                className="w-100 d-block"
                style={{ width: "150px", height: "300px", cursor: "pointer" }}
                itemId={index + 1}
                src={item.image}
                alt="..."
                onClick={() => downloadFile(item.Title)} // Call downloadFile when the item is clicked
              >
                <h5 className="text-success">{item.Description}</h5>
              </MDBCarouselItem>
            </div>
          ))}
        </MDBCarousel>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default CarouselSlider;
