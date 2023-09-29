import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Carpooling = () => {
  const [carpoolId, setCarpoolId] = useState("");
  const [error, setError] = useState("");
  const [name, setname] = useState("");
  const [User, setUser] = useState();

  const [Data, setData] = useState([]);
  const [participants, setParticipants] = useState([]);
  localStorage.setItem("carpoolId", carpoolId);
  const userEmail = localStorage.getItem("userEmail");

  const handleGet = () => {
    axios
      .get(`http://localhost:5000/getcar`)
      .then((res) => {
        setData(res.data);
        setCarpoolId(res.data.Id_Carpooling);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleGetoneCar = () => {
  //   axios
  //     .get(`http://localhost:5000/onecar/onecar?User_ID=${User}`)
  //     .then((res) => {
  //       setData(res.data);
  //       setCarpoolId(res.data[0].Id_Carpooling);
  //       setUser(res.data.User_ID)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
  // console.log("Participants ", participants);

  useEffect(() => {
    handleGet();
    ParticipationGet();
  }, [participants]);
  useEffect(() => {
    handleGet();
    handleGetUser();
    // handleGetoneCar()
  }, []);

  //  console.log("participants ", participants);

  const ExistsIn = (numberToCheck, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].User_ID === numberToCheck) {
        return true;
      }
    }
    return false;
  };
  const ExistsInUser = (numberToCheck, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].User_ID === numberToCheck) {
        return true;
      }
    }
    return false;
  };

  const handleGetUser = () => {
    axios
      .get(`http://localhost:5000/getuser/getuser?email=${userEmail}`)
      .then((res) => {
        setname(res.data[0].Full_Name);
        setUser(res.data[0].User_ID);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleParticipation = async (index, tel, id) => {
    var b = ExistsIn(Number(User), participants);
    var userid = ExistsInUser(Number(User), Data);
    // console.log(User);
    // console.log(userid, " id user mawjoud fi carpooling");
    // console.log(b, " id par mawjoud");
    if (Data[index].Delegation > participants.length) {
      if (!b && !userid) {
        const par = {
          Name: name,
          Id_Carpooling: id,
          Num_Tel: tel,
          User_ID: Number(User),
        };

        axios
          .post("http://localhost:5000/par", par)
          .then((suc) => {
            console.log(suc);
            setError("Participate");
            Swal.fire({
              icon: "success",
              title: "Vous participez",
            });
          })

          .catch((err) => {
            console.log("this err ", err.response.data);
            setError(err.response.data);
            Swal.fire({
              icon: "error",
              title: error,
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Tu as déjà posté",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Voiture Complète",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1>Annonces De Covoiturage</h1>
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
            {/* Participate Button */}
            <button
              className="btn btn-success"
              onClick={() => {
                const participantTel = prompt("Enter your Telephone Number:");
                if (participantTel) {
                  handleParticipation(
                    index,
                    participantTel,
                    carpool.Id_Carpooling
                  );
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "enter le numéro de téléphone",
                    text: "Oops...",
                  });
                }
              }}
            >
              Participer
            </button>
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
    </div>
  );
};

export default Carpooling;
