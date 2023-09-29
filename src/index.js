import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Login from './Login'
import SignUp from './SignUp'
import CreateEmp from './CreateEmp'
import Carpooling from "./Carpooling";
import EmpInfo from "./EmpInfo"
import Conventions from "./Conventions"
import Galerie from "./Galerie"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/SignUp" render={(props) => <SignUp {...props} />} />
      <Route path="/CreateEmp" render={(props) => <CreateEmp {...props} />} />
      <Route path="/Carpooling" render={(props) => <Carpooling {...props} />} />
      <Route path="/EmpInfo" render={(props) => <EmpInfo {...props} />} />
      <Route path="/conventions" render={(props) => <Conventions {...props} />} />
      <Route path="/Galerie" render={(props) => <Galerie {...props} />} />





      <Route path="/admin/dashboard" render={(props) => <AdminLayout {...props} />} />


      <Redirect from="/" to="/login" />
      {/* admin/dashboard */}
    </Switch>
  </BrowserRouter>
);
