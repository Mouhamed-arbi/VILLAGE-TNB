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
import "./Login.css";
import { Link, useHistory } from 'react-router-dom';
import Swal from "sweetalert2";

function SignUp() {
  const history = useHistory();
  const [FullName, setFullName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Matricule, setMatricule] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");


  
  const uploadFile = async (file) => {
    const form = new FormData()
    form.append('file', file)
    form.append('upload_preset', 'yfi7hny5')
    const response = await axios.post('https://api.cloudinary.com/v1_1/dttizflmi/upload', form)
    return response.data.secure_url
  };

  const handleSubmit = async () => {
    const image = await uploadFile(selectedImage)
    const user = {
      Full_Name: FullName,
      Matricule: Matricule,
      E_Mail: Email,
      Password: Password,
      Picture : image
    };
    axios
      .post("http://localhost:5000/signup/signup", user)
      .then((suc) => {
        console.log(suc)
        setError("CREATED GO LOG IN");
        Swal.fire(
          'CREATED GO LOG IN',
          'success'
        )
                    })
      .catch((err) => {
        console.log("this err ",err.response.data);
        setError(err.response.data);
        Swal.fire({
          icon: 'error',
          title: err.response.data,
          text: 'Oops...',
        })

      });
  
    }
  
  return (
    <MDBContainer fluid className="p-4" style={{ background: 'white' }}>
      <MDBRow>
      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

<h2 className="my-5 display-3 fw-bold ls-tight px-3">
<span style={{color: 'green'}}>TNB</span>
<span style={{color: 'pink'}}>Village</span>
</h2>

  {/* <span className="text-primary"></span> */}

  <img src="https://img.freepik.com/premium-vector/employer-look-employee-job-application-resume-with-magnifying-glass_90661-343.jpg?w=2000" className='card-image'></img>

  <p className='px-3' style={{color: 'hsl(227, 10%, 50.8%)'}}>
  Human Resource Management System (HRMS)
  </p>

</MDBCol>

        <MDBCol md="6">
          {/* <h1>{error}</h1> */}
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
                    type="text"
                    value={Matricule}
                    onChange={(e) => setMatricule(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Repeat Password"
                id="form5"
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
               {/* <MDBInput
                wrapperClass="mb-4"
                type="file" 
                id="image" 
                name="image"  
                onChange={(e)=> {setPicture(e.target.files[0])}}

              /> */}
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
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />
      <br />

              <div className="d-flex justify-content-center mb-4">
              
                  <MDBBtn
                    className='w-100 mb-4' size='md'
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </MDBBtn>
                
              </div>

              <div className="text-center">
                <p> Go Log In</p>
                <Link to='/login' className='w-100 mb-4 text-center'>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  Login
                </MDBBtn>

                </Link>


                
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignUp;