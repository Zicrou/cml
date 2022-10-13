import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner, Alert, Button } from "react-bootstrap";
import MatchesList from "../../components/matchesList";
import moment from "moment";
import UsersList from "./usersList";
import Charts from "../../components/charts";
import { getEvent } from "../../redux/actions/Event/getEventFuture";
import { generatePDF } from "../../redux/actions/GeneratePdf/generatePdf";
import { GoogleMap } from "../../components/GoogleMap";
import { EventDetails } from "../../components/EventDetails";
import {
  updateInvites,
  clearUpdateInviteState,
} from "../../redux/actions/Invite/updateinvites";

import { RootState } from "../../redux/reducers/index";
import "./style.css";
import { changeColorChartBtn } from "./changeColorChartBtn";
import { changeColorPeopleBtn } from "./changeColorPeopleBtn";
import { changeColorMatchesBtn } from "./changeColorMatchesBtn";

const ViewUpcomingEvents: React.FC = (props: any) => {
  const { eventId } = props.match.params;
  console.log("eventid:", eventId)
  const { history } = props;
  const dispatch = useDispatch();
  const getEventStatus = useSelector((state: RootState) => state.getEvent);
  const generatePDFStatus = useSelector(
    (state: RootState) => state.generatePDF
  );
  const updateInvitesStatus = useSelector(
    (state: RootState) => state.updateInvites
  );
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [dataDonut, setDataDonut] = useState<any>();
  const [dataBarMen, setDataBarMen] = useState<any>();
  const [dataBarWomen, setDataBarWomen] = useState<any>();
  const [toggle, setToggle] = useState({
    userList: true,
    matchList: false,
    charts: false,
    eventDetails: true,
  });
  const [pdfData, setPdfData] = useState({ menData: "", womenData: "" });
  const [generatePdfLoader, setGeneratePdfLoader] = useState(false);

  useEffect(() => {
    dispatch(getEvent({ eventId }));
  }, [dispatch, eventId]);

  useEffect(() => {
    if (updateInvitesStatus && updateInvitesStatus.status === 200) {
      setShow(true);
      dispatch(clearUpdateInviteState());
    } else if (updateInvitesStatus && updateInvitesStatus.status === 500) {
      setShowError(true);
    }
  }, [updateInvitesStatus, dispatch]);
  useEffect(() => {
    if (generatePDFStatus && generatePDFStatus.status === 200) {
      setGeneratePdfLoader(false);
      window.open(
        `${process.env.REACT_APP_BACKEND_API_BASE}${generatePDFStatus.data.pdfFile.file}`,
        "_blank"
      );
    }
  }, [generatePDFStatus]);
  useEffect(() => {
    if (getEventStatus !== true && getEventStatus !== "") {
      const totalMen =
        getEventStatus.eventMembers.men.singles.length +
        getEventStatus.eventMembers.men.married.length +
        getEventStatus.eventMembers.men.divorced.length;
      const totalWomen =
        getEventStatus.eventMembers.women.singles.length +
        getEventStatus.eventMembers.women.married.length +
        getEventStatus.eventMembers.women.divorced.length;
      const menSingle = `${getEventStatus.eventMembers.men.singles.length
        ? getEventStatus.eventMembers.men.singles.length +
        " singles " +
        Math.min(...getEventStatus.eventMembers.men.singles) +
        "-" +
        Math.max(...getEventStatus.eventMembers.men.singles) +
        ", "
        : "0 singles ,"
        }`;
      const menMarried = `${getEventStatus.eventMembers.men.married.length
        ? getEventStatus.eventMembers.men.married.length +
        " married " +
        Math.min(...getEventStatus.eventMembers.men.married) +
        "-" +
        Math.max(...getEventStatus.eventMembers.men.married) +
        ", "
        : "0 married .,"
        }`;
      const menDivorced = `${getEventStatus.eventMembers.men.divorced.length
        ? getEventStatus.eventMembers.men.divorced.length +
        " divorced " +
        Math.min(...getEventStatus.eventMembers.men.divorced) +
        "-" +
        Math.max(...getEventStatus.eventMembers.men.divorced) +
        ", "
        : "0 divorced ,"
        }`;

      const womenSingle = `${getEventStatus.eventMembers.women.singles.length
        ? getEventStatus.eventMembers.women.singles.length +
        " singles " +
        Math.min(...getEventStatus.eventMembers.women.singles) +
        "-" +
        Math.max(...getEventStatus.eventMembers.women.singles) +
        ", "
        : "0 singles ,"
        }`;
      const womenMarried = `${getEventStatus.eventMembers.women.married.length
        ? getEventStatus.eventMembers.women.married.length +
        " married " +
        Math.min(...getEventStatus.eventMembers.women.married) +
        "-" +
        Math.max(...getEventStatus.eventMembers.women.married) +
        ", "
        : "0 married ,"
        }`;
      const womenDivorced = `${getEventStatus.eventMembers.women.divorced.length
        ? getEventStatus.eventMembers.women.divorced.length +
        " divorced " +
        Math.min(...getEventStatus.eventMembers.women.divorced) +
        "-" +
        Math.max(...getEventStatus.eventMembers.women.divorced) +
        ", "
        : "0 divorced ,"
        }`;
      const menData = menSingle.concat(menMarried, menDivorced);
      const womenData = womenSingle.concat(womenMarried, womenDivorced);
      const dataDonut = {
        maintainAspectRatio: false,
        responsive: false,
        labels: ["Men", "Women"],
        datasets: [
          {
            label: "Women vs Men",
            data: [totalMen, totalWomen],
            backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
            hoverBackgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
          },
        ],
      };
      const dataMen = {
        labels: [
          "No of men ",
          "Married",
          "Single",
          "Divorced",
          "Singles Age Range",
          "Married Age Range",
          "Divorced Age Range",
        ],
        datasets: [
          {
            label: "Men",
            data: [
              totalMen,
              getEventStatus.eventMembers.men.married.length,
              getEventStatus.eventMembers.men.singles.length,
              getEventStatus.eventMembers.men.divorced.length,
              [
                Math.min(...getEventStatus.eventMembers.men.singles),
                Math.max(...getEventStatus.eventMembers.men.singles),
              ],
              [
                Math.min(...getEventStatus.eventMembers.men.married),
                Math.max(...getEventStatus.eventMembers.men.married),
              ],
              [
                Math.min(...getEventStatus.eventMembers.men.divorced),
                Math.max(...getEventStatus.eventMembers.men.divorced),
              ],
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 2,
          },
        ],
      };
      const dataWomen = {
        labels: [
          "No of Women ",
          "Married",
          "Single",
          "Divorced",
          "Singles Age Range",
          "Married Age Range",
          "Divorced Age Range",
        ],
        datasets: [
          {
            label: "Women",
            data: [
              totalWomen,
              getEventStatus.eventMembers.women.married.length,
              getEventStatus.eventMembers.women.singles.length,
              getEventStatus.eventMembers.women.divorced.length,
              [
                Math.min(...getEventStatus.eventMembers.women.singles),
                Math.max(...getEventStatus.eventMembers.women.singles),
              ],
              [
                Math.min(...getEventStatus.eventMembers.women.married),
                Math.max(...getEventStatus.eventMembers.women.married),
              ],
              [
                Math.min(...getEventStatus.eventMembers.women.divorced),
                Math.max(...getEventStatus.eventMembers.women.divorced),
              ],
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 2,
          },
        ],
      };
      setDataDonut(dataDonut);
      setDataBarMen(dataMen);
      setDataBarWomen(dataWomen);
      setPdfData({ menData: menData, womenData: womenData });
    }
  }, [getEventStatus]);
  return (
    <>

      <div className="event-details-future-event-title">
        <b>{getEventStatus.eventData && getEventStatus.eventData.title}</b>
        <span>
          {getEventStatus && getEventStatus === true ? (
            <div className="event-details-past-event-content">loading...</div>
          ) : (
            <a
              href={`/upcoming-event/${getEventStatus.eventData && getEventStatus.eventData.sys.id
                }/edit`}
            >
              {" "}
              <i className="fas fa-edit" id="edit-event-icon"></i>
            </a>
          )}
        </span>
      </div>
      {getEventStatus && getEventStatus === true ? (
        <div className="event-details-past-event-content">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <Spinner animation="border" role="status"></Spinner>
            </div>
          </div>
        </div>
      ) : (
        <div className="event-details-future-event-content">
          {toggle.eventDetails ? (
            <>
              <div className="row future-event-top-content">
                <div className="col-md-6 event-details-future-event-location">
                  <EventDetails />
                  <p>
                    {generatePdfLoader ? (
                      <Spinner animation="border" role="status"></Spinner>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => {
                          setGeneratePdfLoader(true);
                          dispatch(
                            generatePDF({
                              eventId,
                              menData: `${pdfData.menData}`,
                              womenData: `${pdfData.womenData}`,
                            })
                          );
                        }}
                      >
                        Generate PDF
                      </Button>
                    )}
                  </p>
                </div>
                <div className="col-md-6">
                  <GoogleMap />
                  <div className="row upcoming-events-btn-grp">
                    <div className="col-md-4">
                      {updateInvitesStatus === true ? (
                        <Spinner animation="border" role="status"></Spinner>
                      ) : (
                        <div className="invite-with-pictures-people-btn">
                          <button
                            onClick={() => {
                              dispatch(updateInvites({ eventId }));
                            }}
                          >
                            Send event detail
                          </button>
                          <br></br>
                          <small>
                            Sends confirmed users the event time and location
                          </small>
                          <Alert
                            show={show}
                            onClose={() => setShow(false)}
                            variant="success"
                            dismissible
                          >
                            <p>Notification sent successfully!</p>
                          </Alert>
                          <Alert
                            show={showError}
                            onClose={() => setShowError(false)}
                            variant="danger"
                            dismissible
                          >
                            <p>Network Error</p>
                          </Alert>
                        </div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <Link to={`/send-invitation/${eventId}`}>
                        <div className="invite-with-pictures-people-btn">
                          <button>Send message</button>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <Link to={`/${eventId}/invite-more-people`}>
                        <div className="invite-with-pictures-people-btn">
                          <button>Invite more users</button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          <div className="people-match-btns">
            <div
              className="past-event-details-people-btn"
              onClick={() => {
                setToggle({
                  userList: true,
                  matchList: false,
                  charts: false,
                  eventDetails: true,
                });
              }}
            >
              <button id="peopleBtnId" onClick={changeColorPeopleBtn}>
                People
              </button>
            </div>
            <div
              className="past-event-match-btn"
              onClick={() => {
                setToggle({
                  userList: false,
                  matchList: true,
                  charts: false,
                  eventDetails: true,
                });
              }}
            >
              <button id="matchesBtnId" onClick={changeColorMatchesBtn}>
                Matches
              </button>
            </div>
            <div
              className="past-event-chart-btn"
              onClick={() => {
                setToggle({
                  userList: false,
                  matchList: false,
                  charts: true,
                  eventDetails: false,
                });
              }}
            >
              <button id="chartBtnId" onClick={changeColorChartBtn}>
                Charts
              </button>
            </div>
          </div>
          {toggle.userList === true ? (
            <UsersList users={getEventStatus && getEventStatus.usersList} />
          ) : toggle.matchList === true ? (
            <MatchesList
              matches={getEventStatus && getEventStatus.matchesList}
              eventId={eventId}
              history={history}
            />
          ) : toggle.charts === true ? (
            <Charts chartsData={{ dataDonut, dataBarMen, dataBarWomen }} />
          ) : null}
        </div>
      )}

    </>
  );
};
export default ViewUpcomingEvents;
