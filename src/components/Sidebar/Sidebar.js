import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://tn.tunisiebooking.com/?utm_source=google&utm_medium=cpc&utm_campaign=Marque%20Tunisiebooking%20TN%20ROAS%201%20429,00%20%&utm_content=tunisie%20booking%20Exact%20Match&utm_ad=625716219532&utm_term=tunisie%20booking&matchtype=e&device=c&GeoLoc=1012760&placement=&network=g&campaign_id=10000247516&adset_id=143814854584&ad_id=625716219532&gclid=CjwKCAjwxOymBhAFEiwAnodBLCUJ_qikxdbhiUUEOks6-Z0l2mNDKRmYD74L5l4vtyXq_SGtXJHd8BoCFPAQAvD_BwE"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={require("assets/img/TNB.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="https://tn.tunisiebooking.com/?utm_source=google&utm_medium=cpc&utm_campaign=Marque%20Tunisiebooking%20TN%20ROAS%201%20429,00%20%&utm_content=tunisie%20booking%20Exact%20Match&utm_ad=625716219532&utm_term=tunisie%20booking&matchtype=e&device=c&GeoLoc=1012760&placement=&network=g&campaign_id=10000247516&adset_id=143814854584&ad_id=625716219532&gclid=CjwKCAjwxOymBhAFEiwAnodBLCUJ_qikxdbhiUUEOks6-Z0l2mNDKRmYD74L5l4vtyXq_SGtXJHd8BoCFPAQAvD_BwE">
          TNB Village
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
