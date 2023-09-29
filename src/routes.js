
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Sinformer from "views/Sinformer.js";
import News from "views/News";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import moncovoiturage from "views/moncovoiturage.js";
import Annuaire from "views/Annuaire";
import conventions from "views/monconventions";
import galerie from "views/mongalerie";


import SignUp from "./SignUp.js";
import CreateEmp from "./CreateEmp.js"
import EmpInfo from "./EmpInfo.js"


const dashboardRoutes = [
  {
    upgrade: true,
    path: "/Annuaire",
    name: "Annuaire",
    icon: "nc-icon nc-alien-33",
    component: Annuaire,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "S'informer",
    icon: "nc-icon nc-notes",
    component: Sinformer,
    layout: "/admin"
  },
  {
    path: "/News",
    name: "news",
    icon: "nc-icon nc-single-copy-04",
    component: News,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/moncovoiturage",
    name: "Mon covoiturage",
    icon:"nc-icon nc-delivery-fast",
    component: moncovoiturage,
    layout: "/admin"
  },
  {
    path: "/monconventions",
    name: "Mon conventions",
    icon:"nc-icon nc-paper-2",
    component: conventions,
    layout: "/admin"
  },
  {
    path: "/mongalerie",
    name: "Mon Galerie",
    icon:"nc-icon nc-album-2",
    component: galerie,
    layout: "/admin"
  }
];

export default dashboardRoutes;
