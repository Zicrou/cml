import React, { useState, useEffect } from "react";
import moment from "moment";

import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions/Event/getEvents";
import { RootState } from "../../redux/reducers/index";

import convertUNIXTimeStamp from "../../utils/convertUNIXTimeStamp";
import "./style.css";
const UpcomingEvents: React.FC = () => {
  const dispatch = useDispatch();
  const getEventsStatus = useSelector((state: RootState) => state.getEvents);
  const [eventMembers, setEventMembers] = useState([]);

  useEffect(() => {
    dispatch(getEvents({ eventStatus: "active" }));
  }, [dispatch]);

  useEffect(() => {
    if (getEventsStatus !== true && getEventsStatus) {
      setEventMembers(getEventsStatus);
      getEventsStatus.length &&
        getEventsStatus.sort((a: any, b: any) => {
          return a.eventData.sys.id - b.eventData.sys.id;
        });
    }
  }, [getEventsStatus]);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="upcoming-events">
              <b>Upcoming</b>
            </div>
            {getEventsStatus === true ? (
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12">
                  <Spinner animation="border" role="status"></Spinner>
                </div>
              </div>
            ) : getEventsStatus.length ? (
              <>
                <div className="row">
                  {eventMembers.length
                    ? eventMembers &&
                      eventMembers.map((item: any) => (
                        <div
                          className="col-md-6  col-lg-6 col-sm-12"
                          key={item.eventData.sys.id}
                          id={item.eventData.sys.id}
                        >
                          <Link to={`/upcoming-event/${item.eventData.sys.id}`}>
                            <div
                              data-toggle="buttons"
                              className="btn btn-default events-select-button"
                            >
                              <div className="first-event">
                                <div className="first-event-title"></div>
                                <b>{item.eventData.title}</b>
                                <div className="fist-event-location">
                                  {item.eventData.addressLocation}

                                  <span>
                                    <i className="fa fa-map-marker events-location"></i>
                                  </span>
                                </div>
                                <div className="event-date">
                                  {convertUNIXTimeStamp(
                                    item.eventData.dateTime,
                                    1
                                  )}{" "}
                                  {/* {`at ${moment
                                    .unix(
                                      item.eventData && item.eventData.dateTime
                                    )
                                    .utc()
                                    .hour()}:${moment
                                    .unix(
                                      item.eventData && item.eventData.dateTime
                                    )
                                    .utc()
                                    .minute()}`} */}
                                </div>
                                <div className="event-members">
                                  Men: {item.eventMembers.men || 0}, Women:{" "}
                                  {item.eventMembers.women || 0}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    : null}
                  <div className="col-md-6 col-lg-6 col-sm-12" key="xyz">
                    <div
                      data-toggle="buttons"
                      className="btn btn-default events-select-button"
                    >
                      <div className="add-event">
                        <Link to="/create-event">
                          <i className="far fa-plus-square"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-md-12 col-lg-6 col-sm-12" key="xyza">
                <div
                  data-toggle="buttons"
                  className="btn btn-default events-select-button"
                >
                  <div className="add-event">
                    <Link to="/create-event">
                      <i className="far fa-plus-square"></i>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default UpcomingEvents;
