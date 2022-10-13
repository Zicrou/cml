// package import

import React from "react";
import Map from "../components/GoogleMapWithAddress";
import { RootState } from "../redux/reducers/index";
import { useSelector } from "react-redux";

// component

export const GoogleMap: React.FC = () => {
  const getEventStatus = useSelector((state: RootState) => state.getEvent);

  // render

  return (
    <>
      <div className="event-details-future-event-map">
        <Map
          address={
            getEventStatus.eventData && getEventStatus.eventData.addressLocation
          }
        />{" "}
      </div>
    </>
  );
};
