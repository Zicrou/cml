import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEventsExpired } from "../../redux/actions/Event/getEventsExpired";
import { RootState } from "../../redux/reducers/index";

import convertUNIXTimeStamp from "../../utils/convertUNIXTimeStamp";
import "./style.css";
const PastEvents: React.FC = () => {
  const dispatch = useDispatch();
  const getEventsStatus = useSelector(
    (state: RootState) => state.getEventExpired
  );
  const [eventMembers, setEventMembers] = useState([]);
  useEffect(() => {
    dispatch(getEventsExpired({ eventStatus: "expired" }));
  }, [dispatch]);

  useEffect(() => {
    if (getEventsStatus !== true && getEventsStatus) {
      setEventMembers(getEventsStatus);
      getEventsStatus.length && getEventsStatus.sort((a: any, b: any) => {
        return a.eventData.sys.id - b.eventData.sys.id;
      });
    }
  }, [getEventsStatus]);

  return (
    <>
      <div className="past-events">
        <b>Past</b>
      </div>

      {getEventsStatus === true ? (
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        </div>
      ) : getEventsStatus.length ? (
        <>
          <div className="row past-event-content">
            <div className="col-md-2">
              <div
                data-toggle="buttons"
                className="btn btn-default past-events-select-button-heading"
              >
                <div className="past-event-date-heading">
                  <b>Date</b>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                data-toggle="buttons"
                className="btn btn-default past-events-select-button-heading"
              >
                <div className="past-event-venue-heading">
                  <b>Venue</b>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                data-toggle="buttons"
                className="btn btn-default past-events-select-button-heading"
              >
                <div className="past-event-invited-heading">
                  <b>Invited</b>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                data-toggle="buttons"
                className="btn btn-default past-events-select-button-heading"
              >
                <div className="past-event-attended-heading">
                  <b>Attended</b>
                </div>
              </div>
            </div>
          </div>
          {eventMembers.length &&
            eventMembers.map((item: any) => (
              <div className="row" key={item.eventData.sys.id}>
                <div className="col-md-2">
                  <div
                    data-toggle="buttons"
                    className="btn btn-default past-events-select-button"
                  >
                    <div className="past-event-date">
                      {convertUNIXTimeStamp(item.eventData.dateTime, 0)}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    data-toggle="buttons"
                    className="btn btn-default past-events-select-button"
                  >
                    <Link to={`/past-event/${item.eventData.sys.id}`}>
                      <div className="past-event-venue">
                        {item.eventData.title}
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-2">
                  <div
                    data-toggle="buttons"
                    className="btn btn-default past-events-select-button"
                  >
                    <div className="past-event-invited">
                      {item.invitedEventMembers.menInvited.length} M /{" "}
                      {item.invitedEventMembers.womenInvited.length} W
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div
                    data-toggle="buttons"
                    className="btn btn-default past-events-select-button"
                  >
                    <div className="past-event-attended">
                      {item.eventMembers.men.length} M /{" "}
                      {item.eventMembers.women.length} W
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </>
      ) : (
        <p>No past events present</p>
      )}
    </>
  );
};
export default PastEvents;
