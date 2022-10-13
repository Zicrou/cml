import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Button, Form } from "react-bootstrap";
import {
  sendNoitfication,
  clearMatchState,
} from "../redux/actions/MatchNotification/create";
import { RootState } from "../redux/reducers/index";
import Modal from "react-bootstrap/Modal";
import getAge from "../utils/getAge";
import "../screens/ViewUpcomingEvent/style.css";
import { MatchlistComponentProps } from "../types";

const MatchesList: React.FC<MatchlistComponentProps> = (props: MatchlistComponentProps) => {
  const { matches, eventId, history } = props;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const sendNoitficationStatus = useSelector(
    (state: RootState) => state.sendNoitfication
  );

  const [userSelected, setUserSelected] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [userInvitedList, setUserInvitedList] = useState<any[]>();
  const [isNext, setIsNext] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [loader, setLoader] = useState(false);
  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0);
  const [answerApiCounter, setAnswerApiCounter] = useState(0);
  const [errorSub, setErrorSub] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  let selectedUsers: any = [];
  let temp_arr: any[] = [];
  let counter = 0;

  const handleOk = () => {
    setShow(false)
    setLoader(false)
  };

  const collectUser = (user: any, matchId: string) => {
    user.matchedMemberShipId = matchId;
    if (userSelected.length) {
      let flag = true;
      for (let i = 0; i < userSelected.length; i++) {
        if (userSelected[i].sys.id === user.sys.id) {
          flag = false;
          let users = userSelected;
          users.splice(i, 1);
          users.length ? setIsNext(true) : setIsNext(false);
          users.length ? setIsNext(true) : setIsEmail(false);
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

  const addUserToInvite = (users: any) => {
    let userToDelete = userList;
    if (userInvitedList) {
      temp_arr = userInvitedList;
    }
    temp_arr = userSelected;
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

  const onFinish = (event: any) => {
    event.preventDefault();
    setErrorSub(false);
    setErrorMsg(false);
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    let flag = true;
    if (formDataObj.message === "") {
      setErrorMsg(true);
      flag = false;
    }
    if (formDataObj.subject === "") {
      setErrorSub(true);
      flag = false;
    }

    if (userInvitedList && userInvitedList.length && flag) {
      setLoader(true);
      counter = userInvitedList.length;
      for (let i = 0; i < userInvitedList.length; i++) {
        let obj = {
          notifiedMemberId: userInvitedList[i].eventMembershipId,
          message: formDataObj.message,
          subject: formDataObj.subject,
          matchId: userInvitedList[i].matchedMemberShipId,
          eventId,
        };
        dispatch(sendNoitfication(obj));
      }
      setAnswerApiCounter(counter);
    }
  };
  useEffect(() => {
    if (userSelected.length) {
      setIsNext(true);
    } else if (userSelected.length <= 0) {
      setIsNext(false);
      setIsEmail(false);
    }
    if (isEmail) {
      setIsNext(false);
    }
  }, [userInvitedList, userSelected, isNext, isEmail]);

  useEffect(() => {
    if (sendNoitficationStatus && sendNoitficationStatus.status === 200) {
      const apiCounter = answerApiResponseCounter + 1;
      setAnswerApiResponseCounter(apiCounter);
      if (answerApiCounter === apiCounter) {
        setLoader(false);
        dispatch(clearMatchState());
        setShow(true);
      }
    }
  }, [
    sendNoitficationStatus,
    answerApiCounter,
    answerApiResponseCounter,
    dispatch,
    history,
  ]);
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="left-send-notifications-personal-info-headings">
            <span className="send-notifications-info-headings">Age</span>
            <span className="send-notifications-info-headings">Status</span>
            <span className="send-notifications-info-headings">Events</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="right-send-notifications-personal-info-headings">
            <span className="send-notifications-info-headings">Age</span>
            <span className="send-notifications-info-headings">Status</span>
            <span className="send-notifications-info-headings">Events</span>
          </div>
        </div>
      </div>
      {matches && matches.length ? (
        matches.map((match: any, index) => (
          <div className="row send-notifications-event-main-row" key={index}>
            <div className="col-md-5">
              <div
                data-toggle="buttons"
                className={
                  match.personOne.lookingFor === "husband"
                    ? "btn btn-default men-send-notifications-select-button"
                    : "btn btn-default women-send-notifications-select-button"
                }
              >
                <div className="row left-send-notifications-event-select-btn">
                  <div className="col-md-12 col-sm-12 col-lg-6 send-notifications-event-lbl">
                    <input
                      type="checkbox"
                      id="profile-name"
                      name="profile-name"
                      value=""
                      onClick={() => {
                        collectUser(
                          match.personOne,
                          match.personTwo.eventMembershipId
                        );
                      }}
                    />
                    <label htmlFor="profile-name">
                      {match.personOne.memberName}
                    </label>
                  </div>
                  <div className="col-md-12 col-sm-12 col-lg-6">
                    <div className="send-notifications-event-personal-info">
                      <span className="badge badge-pill badge-info send-notifications-age">
                        {getAge(match.personOne.dateOfBirth)}
                      </span>
                      <span className="badge badge-pill badge-info send-notifications-status">
                        {match.personOne.previouslyMarried === "no"
                          ? "S"
                          : match.personOne.previouslyMarried ===
                            "once"
                            ? "M"
                            : match.personOne.previouslyMarried === "divorced"
                              ? "D"
                              : match.personOne.previouslyMarried === "widowed"
                              ? "W"
                              : ""}
                      </span>
                      <span className="badge badge-pill badge-info send-notifications-events">
                        {match.personOne.eventMemberships}/
                        {match.personOne.eventInvitations}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2 send-notifications-event-heart-icon">
              <i className="fa fa-heart"></i>
            </div>
            <div className="col-md-5">
              <div
                data-toggle="buttons"
                className={
                  match.personTwo.lookingFor === "husband"
                    ? "btn btn-default men-send-notifications-select-button"
                    : "btn btn-default women-send-notifications-select-button"
                }
              >
                <div className="row left-send-notifications-event-select-btn">
                  <div className="col-md-12 col-sm-12 col-lg-6 send-notifications-event-lbl">
                    <input
                      type="checkbox"
                      id="profile-name"
                      name="profile-name"
                      value=""
                      onClick={() => {
                        collectUser(
                          match.personTwo,
                          match.personOne.eventMembershipId
                        );
                      }}
                    />
                    <label htmlFor="profile-name">
                      {match.personTwo.memberName}
                    </label>
                  </div>
                  <div className="col-md-12 col-sm-12 col-lg-6">
                    <div className="send-notifications-event-personal-info">
                      <span className="badge badge-pill badge-info send-notifications-age">
                        {getAge(match.personTwo.dateOfBirth)}
                      </span>
                      <span className="badge badge-pill badge-info send-notifications-status">
                        {match.personTwo.previouslyMarried === "no"
                          ? "S"
                          : match.personTwo.previouslyMarried ===
                            "once"
                            ? "M"
                            : match.personTwo.previouslyMarried === "divorced"
                              ? "D"
                              : match.personTwo.previouslyMarried === "widowed"
                              ? "W"
                              : ""}
                      </span>
                      <span className="badge badge-pill badge-info send-notifications-events">
                        {match.personTwo.eventMemberships}/
                        {match.personTwo.eventInvitations}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-user-preset">No match present ☹</p>
      )}

      {isNext ? (
        <div
          className="row"
          style={{ marginTop: "20px" }}
          onClick={() => {
            setIsEmail(true);
          }}
        >
          <div className="col-md-12">
            <div className="send-notification-btn">
              <input type="Submit" value="Next: Send Match Notification" />
            </div>
          </div>
        </div>
      ) : null}
      {isEmail ? (
        <>
          {" "}
          <div className="send-notification-heading">
            <b>NEXT: Send Match Notification</b>
          </div>
          <Form onSubmit={onFinish}>
            <div className="row">
              <div className="col-md-12 send-notification-text-input">
                <input
                  type="text"
                  placeholder="You have a match!"
                  name="subject"
                />
                {errorSub ? (
                  <p className="error">Please write subject</p>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 send-notification-textarea">
                <textarea
                  rows={13}
                  cols={66}
                  name="message"
                  className="travel-details-textarea"
                ></textarea>
                {errorMsg ? (
                  <p className="error">Please write message</p>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="send-notification-btn">
                  {loader === true ? (
                    <Spinner animation="border" variant="danger" />
                  ) : (
                    <input
                      type="Submit"
                      value="Send Match Notification"
                      onClick={() => {
                        addUserToInvite(userSelected);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Form>
          {<Modal show={show} className="messageModal">
            <Modal.Body className="modalConent">
              <p>Matches email sent successfully</p>
              <Button
                className="modalButton"
                onClick={handleOk}
              >
                Ok
              </Button>
            </Modal.Body>
          </Modal>}
        </>
      ) : null}
    </>
  );
};
export default MatchesList;
