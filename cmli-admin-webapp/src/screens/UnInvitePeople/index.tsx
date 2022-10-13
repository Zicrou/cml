import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Spinner, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/User/getUsers";
import { inviteMoreUser } from "../../redux/actions/Invite/inviteMoreUser";
import Modal from "react-bootstrap/Modal";
import {
  createInvite,
  clearInviteState,
} from "../../redux/actions/Invite/create";
import { RootState } from "../../redux/reducers/index";
import getAge from "../../utils/getAge";
import convertUNIXString from "../../utils/convertUNIXTimeStamp";
import { getEvent } from "../../redux/actions/Event/getEventFuture";
import UsersList from "../../screens/ViewUpcomingEvent/usersList";
import { UninviteUserProps } from "../../types"
import "./style.css";

const UnInvitePeople: React.FC<RouteComponentProps> = (props: {
  match?: any;
  history?: any;
}) => {
  const { history } = props;
  const { eventId } = props.match.params;
  const eventTime = localStorage.getItem("eventTime");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const getEventStatus = useSelector((state: RootState) => state.getEvent);
  const getUsersStatus = useSelector((state: RootState) => state.getUsers);
  const getinviteMoreUserStatus = useSelector(
    (state: RootState) => state.inviteMoreUser
  );
  const getCreateInvite = useSelector((state: RootState) => state.createInvite);
  const [userList, setUserList] = useState<UninviteUserProps[]>([]);
  const [userInvitedList, setUserInvitedList] = useState<any[]>();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0);
  const [answerApiCounter, setAnswerApiCounter] = useState(0);
  const [userSelected, setUserSelected] = useState<UninviteUserProps[]>([]);
  let temp_arr: any[] = [];
  let selectedUsers: UninviteUserProps[] | any = [];
  let counter = 0;
  const handleOk = () => {
    setLoader(true);
    history.push(`/upcoming-event/${eventId}`);
  };
  const collectUser = (user: UninviteUserProps) => {
    if (userSelected.length) {
      let flag = true;
      for (let i = 0; i < userSelected.length; i++) {
        if (userSelected[i].sys.id === user.sys.id) {
          flag = false;
          let users = userSelected;
          users.splice(i, 1);
          setUserSelected(users);
        }
      }
      if (flag) {
        selectedUsers.push(user);
        let newUsersArray = userSelected.concat(selectedUsers);
        setUserSelected(newUsersArray);
      }
    } else {
      selectedUsers.push(user);
      let newUsersArray = userSelected.concat(selectedUsers);
      setUserSelected(newUsersArray);
    }
  };
  const addUserToInvite = (users: UninviteUserProps[] | any) => {
    let userToDelete = userList;
    if (userInvitedList) {
      temp_arr = userInvitedList;
    }
    temp_arr = userSelected;
    setError(false);
    setUserInvitedList([...temp_arr]);
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < userList.length; j++) {
        if (userList[j].sys.id === users[i].sys.id) {
          userToDelete.splice(j, 1);
          break;
        }
      }
    }
    setUserList(userToDelete);
  };
  const sendInvitations = (userList: any) => {
    setError(false);

    if (userList) {
      setLoader(true);
      counter = userList.length;
      for (let i = 0; i < userList.length; i++) {
        dispatch(
          createInvite({
            eventId,
            userEmail: userList[i].email,
            eventDateTime: convertUNIXString(eventTime, 1),
          })
        );
      }
      setAnswerApiCounter(counter);
    } else {
      setError(true);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    let url = "";
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    if (formDataObj.eventsAttended !== "") {
      url = `past_event_attended=${formDataObj.eventsAttended}&`;
    }
    if (formDataObj.maritialStatus !== "") {
      url = url + `previously_married=${formDataObj.maritialStatus}&`;
    }
    if (formDataObj.maxAge !== "") {
      formDataObj.minAge === ""
        ? (url = url + `max_age=${formDataObj.maxAge}&min_age=1&`)
        : (url = url + `max_age=${formDataObj.maxAge}&`);
    }
    if (formDataObj.minAge !== "") {
      formDataObj.maxAge === ""
        ? (url = url + `min_age=${formDataObj.minAge}&max_age=100&`)
        : (url = url + `min_age=${formDataObj.minAge}&`);
    }
    if (formDataObj.personName !== "") {
      url = url + `name=${formDataObj.personName}&`;
    }
    if (
      formDataObj.lookingfor &&
      formDataObj.lookingfor !== "" &&
      formDataObj.lookingfor !== "other"
    ) {
      url = url + `looking_for=${formDataObj.lookingfor}&`;
    }
    if (url !== "") {
      setLoader(false);
      dispatch(inviteMoreUser(eventId, { status: true, url }));
    } else {
      setLoader(true);
      dispatch(inviteMoreUser(eventId, { status: false, url }));
    }
  };
  useEffect(() => {
    if (getCreateInvite && getCreateInvite.status === 201) {
      setLoader(true);
      const apiCounter = answerApiResponseCounter + 1;
      setAnswerApiResponseCounter(apiCounter);
      if (answerApiCounter === apiCounter) {
        localStorage.removeItem("eventTime");
        setLoader(false);
        dispatch(clearInviteState());
        setShow(true);
      }
    }
  }, [
    getCreateInvite,
    answerApiCounter,
    answerApiResponseCounter,
    history,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(getUsers({ status: false }));
    dispatch(inviteMoreUser(eventId, { status: false }));
  }, [dispatch]);

  useEffect(() => {
    if (getinviteMoreUserStatus && getinviteMoreUserStatus.status === 200) {
      const userList = getinviteMoreUserStatus.data.items;
      const result = userList.filter(
        (user: { personName: null }) => user.personName != null
      );
      setUserList(result);
    }
  }, [getinviteMoreUserStatus]);

  const toggle = (id: string) => {
    const element: any = document.getElementById(id);
    if (element.classList.contains("selected-events")) {
      element.classList.remove("selected-events");
    } else {
      element.classList.add("selected-events");
    }
  };

  useEffect(() => {
    dispatch(getEvent({ eventId }));
    setLoader(true);
  }, [dispatch, eventId]);

  useEffect(() => {
    if (getEventStatus !== true && getEventStatus !== "") {
      setLoader(false);
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
    }
  }, [getEventStatus]);

  return (
    <>

      <div className="who-is-invited-event-details-title">
        <b>New Event: Who is invited?</b>
      </div>
      <div className="who-is-invited-event-details-content">
        <Form onSubmit={onSubmit} action="">
          <div className="row">
            <div className="col-md-12 results-with-pictures-text-input">
              <input type="text" placeholder="Name" name="personName" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <input type="radio" id="male" name="lookingfor" value="wife" />
              <label htmlFor="men">Men</label>
              <br />
              <input
                type="radio"
                id="female"
                name="lookingfor"
                value="husband"
              />
              <label htmlFor="women">Women</label>
              <br />
              <input
                type="radio"
                id="other"
                name="lookingfor"
                value="other"
              />
              <label htmlFor="both">Both</label>
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-4 col-lg-4">
                  <div className="form-group results-with-pictures-text-input">
                    <select
                      className="custom-select custom-select-lg"
                      placeholder="select  "
                      name="maritialStatus"
                    >
                      <option value="">Marital Status</option>
                      <option value="no">Single</option>
                      <option value="once">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4 col-lg-3">
                  <div className="col-md-12 results-with-pictures-number-input">
                    <input
                      type="number"
                      placeholder="Min Age"
                      name="minAge"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-lg-3">
                  <div className="col-md-12 results-with-pictures-number-input">
                    <input
                      type="number"
                      placeholder="Max Age"
                      name="maxAge"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group results-with-pictures-text-input">
                    <input
                      type="number"
                      placeholder="Past Events Attended"
                      name="eventsAttended"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <div className="submit-btn">
                <button type="submit">Search</button>
              </div>
            </div>
          </div>
        </Form>
        <div className="row">
          <div className="col-md-5">
            <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
              {userList.length} results
            </p>
            <div className="left-who-is-invited-results">
              {getUsersStatus === true ? (
                <Spinner animation="border" variant="danger" />
              ) : (
                userList &&
                userList.map((user: UninviteUserProps) => (
                  <div
                    data-toggle="buttons"
                    className={
                      user.lookingFor && user.lookingFor === "wife"
                        ? "btn btn-default men-who-is-invited-select-button"
                        : "btn btn-default women-who-is-invited-select-button"
                    }
                    key={user.sys.id}
                    onClick={() => {
                      toggle(user.sys.id);
                      collectUser(user);
                    }}
                    id={user.sys.id}
                  >
                    <div className="row left-matches-event-select-btn">
                      <div className="col-md-12 col-sm-12 col-lg-6 who-is-invited-lbl">
                        <label className="profile-name">
                          {user.personName}
                        </label>
                      </div>
                      <div className="col-md-12 col-sm-12 col-lg-6">
                        <div className="who-is-invited-personal-info">
                          <span className="badge badge-pill badge-info who-is-invited-age">
                            {getAge(user.dateOfBirth)}
                          </span>
                          <span className="badge badge-pill badge-info who-is-invited-status">
                            {user.previouslyMarried === "no"
                              ? "S"
                              : user.previouslyMarried === "once"
                                ? "M"
                                : user.previouslyMarried === "divorced"
                                  ? "D"
                                  : user.previouslyMarried === "widowed"
                                  ? "W"
                                  : ""}
                          </span>
                          <span className="badge badge-pill badge-info who-is-invited-events">
                            {user.attendedEvents}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="caret-right"
              onClick={() => {
                addUserToInvite(userSelected);
              }}
            >
              <i className="fa fa-caret-right"></i>
            </div>
          </div>
          <div className="col-md-5">
            <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
              {(userInvitedList && userInvitedList.length) || 0} invited
            </p>
            <div className="right-who-is-invited-results">
              {userInvitedList &&
                userInvitedList.map(
                  (user: {
                    lookingFor: string;
                    userId: any;
                    personName: any;
                    dateOfBirth: string | number | Date;
                    previouslyMarried: string;
                    attendedEvents: any;
                    sys: { id: number };
                  }) => (
                    <div
                      data-toggle="buttons"
                      className={
                        user.lookingFor && user.lookingFor === "wife"
                          ? "btn btn-default men-who-is-invited-select-button"
                          : "btn btn-default women-who-is-invited-select-button"
                      }
                      key={user.sys.id}
                    >
                      <div className="row left-matches-event-select-btn">
                        <div className="col-md-12 col-sm-12 col-lg-6 who-is-invited-lbl">
                          <label className="profile-name">
                            {user.personName}
                          </label>
                        </div>
                        <div className="col-md-12 col-sm-12 col-lg-6">
                          <div className="who-is-invited-personal-info">
                            <span className="badge badge-pill badge-info who-is-invited-age">
                              {getAge(user.dateOfBirth)}
                            </span>
                            <span className="badge badge-pill badge-info who-is-invited-status">
                            {user.previouslyMarried === "no"
                              ? "S"
                              : user.previouslyMarried === "once"
                                ? "M"
                                : user.previouslyMarried === "divorced"
                                  ? "D"
                                  : user.previouslyMarried === "widowed"
                                  ? "W"
                                  : ""}
                            </span>
                            <span className="badge badge-pill badge-info who-is-invited-events">
                              {user.attendedEvents}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
            <div className="who-is-invited-next-btn">
              {/* <Link to="/send-invitation"> */}
              {error && (
                <p className="error">Please select any user to send invite</p>
              )}
              {
                <Modal show={show} className="messageModal">
                  <Modal.Body className="modalConent">
                    <p>Invites sent successfully</p>
                    <Button className="modalButton" onClick={handleOk}>
                      Ok
                    </Button>
                  </Modal.Body>
                </Modal>
              }
              {loader === true ? (
                <Spinner animation="border" variant="danger" />
              ) : userInvitedList === undefined ? (
                <input
                  type="button"
                  id="disableButton"
                  value="Next: Send Invitations"
                  disabled
                  onClick={() => {
                    sendInvitations(userInvitedList);
                  }}
                />
              ) : (
                <input
                  type="button"
                  value="Next: Send Invitations"
                  onClick={() => {
                    sendInvitations(userInvitedList);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div></div>
        {getEventStatus === true ? (
          <p></p>
        ) : (
          <div className="invited-user">
            <UsersList users={getEventStatus && getEventStatus.usersList} />
          </div>
        )}
      </div>

    </>
  );
};
export default withRouter(UnInvitePeople);
