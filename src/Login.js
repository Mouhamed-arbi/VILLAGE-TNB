import { React, useState,createContext } from "react";
import axios from "axios";import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import './Login.css'
import { Link,useHistory  } from 'react-router-dom'
import Swal from "sweetalert2";

function App() {
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Matricule, setMatricule] = useState("");
  const [Error, setError] = useState("");
  const [name, setname] = useState('se conncter');
  localStorage.setItem('userEmail', Email);
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        Matricule: Matricule,
        E_Mail: Email,
        Password: password
      });
  
      if (response && response.data && response.data.token) {
        console.log('TOKEN ', response.data.token);
        localStorage.setItem('token', response.data.token);
        setname(response.data.token);
        setError('Authentication successful');
        Swal.fire(
          {icon: 'success',
          title: 'Authentication successful',}
          
          
        )
        history.push('/admin/dashboard');
        // console.log(Error);
        // console.log('Data ', response.data);


      }
      
      else {
        setError('Invalid response from the server');
        Swal.fire({
          icon: 'error',
          title: err.response.data,
          text: 'Oops...',
        })
      }
    } catch (err) {
      console.log(err)
      if (err.response && err.response.data) {
        setError(err.response.data);
        Swal.fire({
          icon: 'error',
          title: err.response.data,
          text: 'Oops...',
        })
      } else {
        setError('An error occurred during authentication');
        Swal.fire({
          icon: 'error',
          title: err.response.data,
          text: 'Oops...',
        })
      }
    }
  };
  
  



  return (
    <MDBContainer fluid className='p-4' style={{ background: 'white' }}>

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

        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Matricule' id='form1' type='password' value={Matricule}  onChange={(e) => setMatricule(e.target.value)}/>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={Email}  onChange={(e) => setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'  value={password}  onChange={(e) => setpassword(e.target.value)}/>

              <div className='d-flex justify-content-center mb-4'>
              {/* <Link to='/admin/dashboard' className='w-100 mb-4 text-center'> */}

              <MDBBtn className='w-100 mb-4' size='md' onClick={handleLogin}>Login</MDBBtn>
              {/* </Link> */}

              </div>

              <Link to='/signup' className='w-100 mb-4 text-center'>Sign Up</Link>

              {/* <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div> */}

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default App;