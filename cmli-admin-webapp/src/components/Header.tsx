import React from "react";
import readLocalStorage from "../utils/readLocalStorage";
import cognitoUtils from "../utils/cognitoUtils";
import logo from "../logo.png";
import "./component.css";
const Header: React.FC = () => {
  const moveToEvent = () => {
    window.location.replace("/event-listing");
  };
  const moveToPeople = () => {
    window.location.replace("/people-listing");
  };
  const logout = () => {
    cognitoUtils.signOutCognitoSession();
  };
  return (
    <div className="row">
      <div className="col-sm-12 col-md-2  col-lg-2">
        <div className="event-listing-cml-logo">
          <div className="cml-admin-logo">
            <img src={logo} alt="" />
          </div>
          <div className="logo-title">
            <b>Administration</b>
          </div>
        </div>
        <div className="header-buttons">
        <div
              className="event-btn"
              onClick={moveToEvent}
            >
              <button>Events</button>
            </div>

            <div
              className="people-btn"
              onClick={moveToPeople}
            >
              <button>People</button>
            </div>
            </div>
      </div>
      {readLocalStorage("access-token") ? (
        <div className="col-sm-12 col-md-10 col-lg-10">
          {" "}
          <div className="logout-btn">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
