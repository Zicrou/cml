import React from "react";
import { Link } from "react-router-dom";
import UpcomingEvents from "./upcomingEvents";
import PastEvents from "./pastEvents";
import Header from "../../components/Header";
import "./style.css";

const EventListing: React.FC = () => {
  return (
    <>
      <div className="event-listing-title">
        <b>Events</b>
      </div>
      <UpcomingEvents />
      <PastEvents />
    </>
  );
};
export default EventListing;
