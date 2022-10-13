// package import

import React from "react";
import { RootState } from "../redux/reducers/index";
import { useSelector } from "react-redux";
import convertUNIXString from "../utils/convertUNIXTimeStamp";

// component

export const EventDetails: React.FC = () => {
  const getEventStatus = useSelector((state: RootState) => state.getEvent);

  // render

  return (
    <>
      <div className="event-details">
        <p>
          When:
          <b>
            {convertUNIXString(
              getEventStatus.eventData && getEventStatus.eventData.dateTime,
              1
            )}{" "}
          </b>
        </p>
        <p>
          Where:
          <b>
            {getEventStatus.eventData &&
              getEventStatus.eventData.addressLocation}
          </b>
        </p>
        <p>
          Code:
          <b>
            {getEventStatus.eventData && getEventStatus.eventData.eventCode}
          </b>
        </p>
        <p>
          Men:
          <b>
            {getEventStatus.eventMembers &&
            getEventStatus.eventMembers.men.singles.length
              ? " " +
                getEventStatus.eventMembers.men.singles.length +
                " singles," +
                Math.min(...getEventStatus.eventMembers.men.singles) +
                "-" +
                Math.max(...getEventStatus.eventMembers.men.singles)
              : ""}
            {getEventStatus.eventMembers &&
            getEventStatus.eventMembers.men.married.length
              ? " " +
                getEventStatus.eventMembers.men.married.length +
                " married," +
                Math.min(...getEventStatus.eventMembers.men.married) +
                "-" +
                Math.max(...getEventStatus.eventMembers.men.married)
              : ""}

            {getEventStatus.eventMembers &&
            getEventStatus.eventMembers.men.divorced.length
              ? " " +
                getEventStatus.eventMembers.men.divorced.length +
                " divorced," +
                Math.min(...getEventStatus.eventMembers.men.divorced) +
                "-" +
                Math.max(...getEventStatus.eventMembers.men.divorced)
              : ""}
          </b>
        </p>
        <p>
          Women:
          <b>
            {getEventStatus.eventMembers &&
            getEventStatus.eventMembers.women.singles.length
              ? " " +
                getEventStatus.eventMembers.women.singles.length +
                " singles," +
                Math.min(...getEventStatus.eventMembers.women.singles) +
                "-" +
                Math.max(...getEventStatus.eventMembers.women.singles)
              : ""}

            {getEventStatus.eventMembers &&
            getEventStatus.eventMembers.women.married.length
              ? " " +
                getEventStatus.eventMembers.women.married.length +
                " married," +
                Math.min(...getEventStatus.eventMembers.women.married) +
                "-" +
                Math.max(...getEventStatus.eventMembers.women.married)
              : ""}

            {getEventStatus.eventMembers &&
            getEventStatus.eventMembers.women.divorced.length
              ? " " +
                getEventStatus.eventMembers.women.divorced.length +
                " divorced," +
                Math.min(...getEventStatus.eventMembers.women.divorced) +
                "-" +
                Math.max(...getEventStatus.eventMembers.women.divorced)
              : ""}
          </b>
        </p>
        <p>
          Matches:
          <b style={{ color: "rgb(228, 49, 147)" }}>
            {getEventStatus.matchesList && getEventStatus.matchesList.length}
          </b>
        </p>
      </div>
    </>
  );
};
