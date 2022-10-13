import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Spinner, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/User/getUsers";
import Modal from "react-bootstrap/Modal";
import {
  createInvite,
  clearInviteState,
} from "../../redux/actions/Invite/create";
import { RootState } from "../../redux/reducers/index";
import { InvitedUser } from "../../types";
import getAge from "../../utils/getAge";
import convertUNIXString from "../../utils/convertUNIXTimeStamp";
import "./style.css";


const InvitePeople: React.FC<RouteComponentProps> = (props: {
  match?: any;
  history?: any;
}) => {
  const { history } = props;
  const { eventId } = props.match.params;
  const eventTime = localStorage.getItem("eventTime");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const getUsersStatus = useSelector((state: RootState) => state.getUsers);
  const getCreateInvite = useSelector((state: RootState) => state.createInvite);
  const [userList, setUserList] = useState<InvitedUser[]>([]);
  const [userInvitedList, setUserInvitedList] = useState<any[]>();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0);
  const [answerApiCounter, setAnswerApiCounter] = useState(0);
  const [userSelected, setUserSelected] = useState<InvitedUser[]>([]);
  let temp_arr: any[] = [];
  let selectedUsers: InvitedUser[] | any = [];
  let counter = 0;
  const handleOk = () => {
    history.push("/event-listing");
  };
  const collectUser = (user: InvitedUser) => {
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
  const addUserToInvite = (users: InvitedUser[] | any) => {
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
      setLoader(true);
      dispatch(getUsers({ status: true, url }));
    } else {
      setLoader(true);
      dispatch(getUsers({ status: false }));
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
  }, [dispatch]);
  useEffect(() => {
    if (getUsersStatus && getUsersStatus.status === 200) {
      setLoader(false);
      const userList = getUsersStatus.data.items;
      const result = userList.filter(
        (user: { personName: null }) => user.personName != null
      );
      setUserList(result);
    }
  }, [getUsersStatus]);

  const toggle = (id: string) => {
    const element: any = document.getElementById(id);
    if (element.classList.contains("selected-events")) {
      element.classList.remove("selected-events");
    } else {
      element.classList.add("selected-events");
    }
  };
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
                userList.map((user: InvitedUser) => (
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
            <div className="who-is-invited-back-btn">
              {/* <Link to="/create-event"> */}
              <input type="Submit" value="Back: When and Where?" />
              {/* </Link> */}
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
                    <p>The event has been created successfully</p>
                    <Button
                      className="modalButton"
                      onClick={handleOk}
                    >
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
      </div>

    </>
  );
};
export default withRouter(InvitePeople);
