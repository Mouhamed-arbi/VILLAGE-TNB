import { React, useState } from "react";
import axios from "axios";

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
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function CreateEmp() {
  const history = useHistory();

  const [HiringDate, setHiringDate] = useState(new Date());
  const [FullName, setFullName] = useState("");
  const [Adress, setAdress] = useState("");
  const [Telephone, setTelephone] = useState(0);
  const [Telephone2, setTelephone2] = useState(0);
  const [BirthDate, setBirthDate] = useState(new Date());
  const [Nationality, setNationality] = useState("");
  const [Cin, setCin] = useState(0);
  const [Matricule, setMatricule] = useState(0);
  const [Email, setEmail] = useState("");
  const [FamSit, setFamSit] = useState("");
  const [NumCh, setNumCh] = useState(0);
  const [Stlvl, setStlvl] = useState("");
  const [otherQual, setotherQual] = useState("");
  const [TypeCon, setTypeCon] = useState("");
  const [TrialPer, setTrialPer] = useState(""); //
  const [ConDur, setConDur] = useState(""); //
  const [ProSal, setProSal] = useState(0);
  const [Rib, setRib] = useState(0);
  const [BankName, setBankName] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [TypeEmp, setTypeEmp] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState("");
  const [a, seta] = useState("");
  const [b, setb] = useState("");

  const uploadFile = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "yfi7hny5");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dttizflmi/upload",
      form
    );
    console.log(response)
    return response.data.secure_url;
  };

  const createemp = async () => {
    setTrialPer("from "+a+' '+" to "+b)

    console.log(TrialPer);
    const image = await uploadFile(selectedImage);
    console.log(image)
    const emp = {
      Full_Name: FullName,
      Matricule: Matricule,
      E_Mail: Email,
      Hiring_Date: HiringDate,
      Adress: Adress,
      Telephone: Telephone,
      Telephone_2: Telephone2,
      Birth_Date: BirthDate,
      Nationality: Nationality,
      cin: Cin,
      Family_Situation: FamSit,
      Number_Children: NumCh,
      Studies_Level: Stlvl,
      Other_Qualification: otherQual,
      Type_Contract: TypeCon,
      Trial_Period: TrialPer,
      Contract_Duration: ConDur,
      Proposed_Salary: ProSal,
      rib: Rib,
      Bank_Name: BankName,
      Job_Title: JobTitle,
      image: image,
      Type_Emp: TypeEmp,
    };
    axios
      .post("http://localhost:5000/info", emp)
      .then((suc) => {
        console.log(suc);
        setError("CREATED");
        Swal.fire("CREATED", "success");
      })
      .catch((err) => {
        console.log("this err ", err.response.data);
        setError(err.response.data);
        Swal.fire({
          icon: "error",
          title: "somthing wrong",
          text: error,
        });
      });
  };

  return (
    <MDBCol md="10" className="mx-auto">
      <MDBCard className="my-5">
        <MDBCardBody className="p-5">
          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="FullName"
                id="form1"
                type="text"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </MDBCol>

            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Matricule"
                id="form2"
                type="number"
                value={Matricule}
                onChange={(e) => setMatricule(e.target.value)}
              />
            </MDBCol>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="text"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Date d'embauche"
                type="date"
                id="date"
                name="HiringDate"
                value={HiringDate}
                onChange={(e) => {
                  setHiringDate(e.target.value);
                }}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Numéro Téléphone 1"
                id="form4"
                type="text"
                value={Telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </MDBCol>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Numéro Téléphone 2"
                id="form5"
                type="text"
                value={Telephone2}
                onChange={(e) => setTelephone2(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol col="6">
              <p>Situation familiale:</p>
              <input
                type="radio"
                id="Célibataire"
                name="Célibataire"
                value="Célibataire"
                checked={FamSit === "Célibataire"}
                onChange={(e) => setFamSit(e.target.value)}
              />
              <label htmlFor="Célibataire">Célibataire</label>
              <br />
              <input
                type="radio"
                id="Mariée"
                name="Mariée"
                value="Mariée"
                checked={FamSit === "Mariée"}
                onChange={(e) => setFamSit(e.target.value)}
              />
              <label htmlFor="Mariée">Mariée</label>
              <br />
              <input
                type="radio"
                id="divorcé"
                name="divorcé"
                value="divorcé"
                checked={FamSit === "divorcé"}
                onChange={(e) => setFamSit(e.target.value)}
              />
              <label htmlFor="Married">divorcé</label>
            </MDBCol>
          </MDBRow>
          <br></br>
          <br></br>

          <MDBRow>
            {/* <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Family Sitation"
                id="form4"
                type="text"
                value={FamSit}
                onChange={(e) => setFamSit(e.target.value)}
              />
            </MDBCol> */}

            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Nombre d'enfants"
                id="form5"
                type="number"
                value={NumCh}
                onChange={(e) => setNumCh(e.target.value)}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Niveau d'étude"
                id="form4"
                type="text"
                value={Stlvl}
                onChange={(e) => setStlvl(e.target.value)}
              />
            </MDBCol>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Autre qualification"
                id="form5"
                type="text"
                value={otherQual}
                onChange={(e) => setotherQual(e.target.value)}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Nationalité"
                id="form4"
                type="text"
                value={Nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </MDBCol>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Adresse"
                id="form5"
                type="text"
                value={Adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Type d'employé "
                id="form4"
                type="text"
                value={TypeEmp}
                onChange={(e) => setTypeEmp(e.target.value)}
              />
            </MDBCol>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="CIN"
                id="form4"
                type="text"
                value={Cin}
                onChange={(e) => setCin(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Date de naissance"
                id="form5"
                type="date"
                value={BirthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          {/* <MDBInput
                wrapperClass="mb-4"
                type="file" 
                id="image" 
                name="image"  
                onChange={(e)=> {setPicture(e.target.files[0])}}

              /> */}
          <MDBRow>
            <MDBCol col="6">
              <p>Type de contrat:</p>
              <input
                type="radio"
                id="CONTRACTUEL "
                name="TypeEmp"
                value="CONTRACTUEL "
                checked={TypeCon === "CONTRACTUEL"}
                onChange={(e) => setTypeCon(e.target.value)}
              />
              <label htmlFor="CONTRACTUEL ">CONTRACTUEL (C.D.D) </label>
              <br />
              <input
                type="radio"
                id="TITULAIRE"
                name="TITULAIRE"
                value="TITULAIRE"
                checked={TypeCon === "TITULAIRE"}
                onChange={(e) => setTypeCon(e.target.value)}
              />
              <label htmlFor="TITULAIRE">TITULAIRE (C.D.I)</label>
              <br />
              <input
                type="radio"
                id="S.I.V.P"
                name="S.I.V.P"
                value="S.I.V.P"
                checked={TypeCon === "S.I.V.P"}
                onChange={(e) => setTypeCon(e.target.value)}
              />
              <label htmlFor="CVP">S.I.V.P</label>
              <br />
              <input
                type="radio"
                id="stagiaire"
                name="stagiaire"
                value="stagiaire"
                checked={TypeCon === "stagiaire"}
                onChange={(e) => setTypeCon(e.target.value)}
              />
              <label htmlFor="stagiaire">stagiaire</label>
            </MDBCol>
          </MDBRow>
          <br></br>
          <br></br>
          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Période d'essai à partir de"
                id="form3"
                type="date"
                value={a}
                onChange={(e) => seta(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="à"
                id="form3"
                type="date"
                value={b}
                onChange={(e) => setb(e.target.value)}
              />
            </MDBCol>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Salaire proposé"
                type="number"
                id="number"
                name="ProSal"
                value={ProSal}
                onChange={(e) => {
                  setProSal(e.target.value);
                }}
              />
            </MDBCol>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Durée de contrat"
                id="form4"
                type="text"
                value={ConDur}
                onChange={(e) => setConDur(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          <br></br>
          <br></br>

          <MDBRow></MDBRow>

          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Numéro Rib"
                id="form5"
                type="number"
                value={Rib}
                onChange={(e) => setRib(e.target.value)}
              />
            </MDBCol>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Nom de banque"
                id="form4"
                type="text"
                value={BankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </MDBCol>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Titre d'emploi"
                id="form5"
                type="text"
                value={JobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </MDBCol>
          </MDBRow>
          <MDBCol col="6">
            <h3>Image de profil</h3>
            <input
              label="Image de profil"
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
                      </Button>              </div>
            )}
          </MDBCol>
          <br />
          <br />
          <div className="d-flex justify-content-center mb-4">
            <MDBBtn className="w-100 mb-4" size="md" onClick={createemp}>
              Ajouter
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default CreateEmp;
