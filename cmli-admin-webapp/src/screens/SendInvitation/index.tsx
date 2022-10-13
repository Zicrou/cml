import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getInvites, GET_INVITES_REQUEST } from "../../redux/actions/Invite/getInvites";
import { getUsers } from "../../redux/actions/User/getUsers";
import { viewEvent } from "../../redux/actions/Event/viewEvent";
import {
  createInvite,
  clearInviteState,
} from "../../redux/actions/Invite/create";
import { RootState } from "../../redux/reducers/index";
import { RouteComponentProps, withRouter } from "react-router-dom";
import convertUNIXString from "../../utils/convertUNIXTimeStamp";
import "./style.css";
import getAge from "../../utils/getAge";
import { SendInvitationUserProps } from "../../types"

const SendInvitation: React.FC<RouteComponentProps> = (props: {
  match?: any;
  history?: any;
}) => {
  const dispatch = useDispatch();
  const { eventId } = props.match.params;
  const getInvitesStatus = useSelector((state: RootState) => state.getInvites);
  const getUsersStatus = useSelector((state: RootState) => state.getUsers);
  const getCreateInvite = useSelector((state: RootState) => state.createInvite);
  const getEventStatus = useSelector((state: RootState) => state.getEvent);
  const viewEventStatus = useSelector((state: RootState) => state.viewEvent);
  const [usersList, setUsersList] = useState<SendInvitationUserProps[]>([]);
  const [loader, setLoader] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isSubject, setIsSubject] = useState<string>();
  const [isBody, setIsBody] = useState<string>();
  const [error, setError] = useState(false);
  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0);
  const [answerApiCounter, setAnswerApiCounter] = useState(0);
  const [userSelected, setUserSelected] = useState<SendInvitationUserProps[]>([]);
  const [inviteData, setInvitteData] = useState<SendInvitationUserProps[]>([]);
  const [userData, setUserData] = useState<SendInvitationUserProps[]>([]);
  const [length, setLength] = useState<number>();
  const [result, setResult] = useState<SendInvitationUserProps[]>([]);
  let selectedUsers: SendInvitationUserProps[] | any = [];
  let counter = 0;
  const collectUser = (user: SendInvitationUserProps) => {
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
  const hannldeChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    let subject: string = e.currentTarget.value;
    setIsSubject(subject);
  };

  const hannldeChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let body: string = e.currentTarget.value;
    setIsBody(body);
  };
  const sendInvitations = () => {
    dispatch(clearInviteState());
    setError(false);
    if (
      userSelected.length &&
      isSubject !== undefined &&
      isBody !== undefined
    ) {
      setLoader(true);
      counter = userSelected.length;
      for (let i = 0; i < userSelected.length; i++) {
        dispatch(
          createInvite({
            eventId,
            userEmail: userSelected[i].email,
            body: isBody,
            subject: isSubject,
          })
        );
      }
      setAnswerApiCounter(counter);
    } else {
      setError(true);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (getCreateInvite && getCreateInvite.status === 201) {
      setLoader(false);
      const apiCounter = answerApiResponseCounter + 1;
      setAnswerApiResponseCounter(apiCounter);
      if (answerApiCounter === apiCounter) {
        setLoader(false);
        dispatch(clearInviteState());
        window.history.back();
      }
    }
  }, [getCreateInvite, answerApiCounter, answerApiResponseCounter, dispatch]);

  useEffect(() => {
    setLoader(true);
    dispatch(clearInviteState());
    dispatch(getInvites(eventId));
    dispatch(getUsers(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    if (getInvitesStatus && getInvitesStatus.status === 200) {
      setInvitteData(getInvitesStatus.data.items)
      setLength(getInvitesStatus.data.items.length)
      let items = getInvitesStatus.data.items;
      const result = items.filter(
        (user: { status: string | null }) =>
          user.status === null || user.status === "no"
      );
      if (result) {
        setUsersList(result);
      } else if (result.length <= 0) {
        setIsUser(true);
      }
    }
  }, [getInvitesStatus]);

  var arrayUniqueByKey: any;

  useEffect(() => {
    if (getUsersStatus && getUsersStatus.status === 200) {
      setUserData(getUsersStatus.data.items);
      const result = getUsersStatus.data.items.filter(
        (user: { personName: string | null }) =>
          user.personName !== null
      );
      setUserData(result)
      dispatch(viewEvent(eventId));
    }
  }, [getUsersStatus]);

  useEffect(() => {
    if (viewEventStatus && viewEventStatus.status === 200) {
      if (length != undefined) {
        var test: any = userData.concat(inviteData)
        const key = 'email';
        arrayUniqueByKey = [...new Map(test.map((item: { [x: string]: any; }) =>
          [item[key], item])).values()];
        setUsersList(arrayUniqueByKey)
        setLoader(false);
      }
    }
  }, [viewEventStatus]);

  const custom = () => {
    setUsersList(userSelected)
  };

  const user_all = () => {
    setUserSelected([])
    dispatch(getUsers(eventId));
    setLoader(true);
  };
  return (
    <>
      <div className="new-event-send-invitations-title">
        <b>{getEventStatus.eventData && getEventStatus.eventData.title}</b>
      </div>
      <div className="new-event-send-invitations-content">
        <form action="">
          <div className="row">
            <div className="col-md-12 send-invitations-text-input">
              <input
                type="text"
                placeholder="Subject"
                onChange={hannldeChangeSubject}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 send-invitations-textarea">
              <textarea
                rows={13}
                cols={66}
                name="comment"
                placeholder="Message"
                className="travel-details-textarea"
                onChange={hannldeChangeBody}
              ></textarea>
            </div>
          </div>
          <div className="send-invitations-radio-btns">
            <label className="radio-inline send-invitations-radio-btns">
              <input type="radio" name="optradio" id="everyone" defaultChecked onClick={() => {
                user_all()
              }} />
              Everyone
            </label>
            <label className="radio-inline send-invitations-radio-btns">
              <input type="radio" name="optradio" id="newly-added" />
              Newly Added People
            </label>
            <label className="radio-inline send-invitations-radio-btns">
              <input type="radio" name="optradio" id="custom-selection" onClick={() => {
                custom()
              }} />
              Custom Selection
            </label>
          </div>
        </form>

        {loader ? (
          <Spinner animation="border" role="status"></Spinner>
        ) : isUser ? (
          <p>No user found</p>
        ) : (
          <>
            <div className="send-invitations-results-heading">
              <p>{usersList.length} Results</p>
            </div>
            <div className="send-invitation-scroll">

              {usersList.map((user: SendInvitationUserProps) => (
                <div
                  data-toggle="buttons"
                  className={
                    user.lookingFor === "husband"
                      ? "btn btn-default send-invitations-women-select-button send-invitations-remove-space"
                      : "btn btn-default send-invitations-men-select-button send-invitations-remove-space"
                  }
                  key={user.sys.id}
                >
                  <div className="row">
                    <div className="col-md-4 col-lg-6 send-invitations-personal-info-title">
                      <input
                        type="checkbox"
                        id="profile-name"
                        name="profile-name"
                        value=""
                        className="send-invitation-checkbox"
                        onClick={() => {
                          collectUser(user);
                        }}
                      />
                      <b>{user.personName}</b>
                    </div>

                    <div className="col-md-8 col-lg-6">
                      <div className="send-invitations-personal-info">
                        {user.status === "no" ? (
                          <span className="badge badge-pill badge-info send-invitations-thumbs-down">
                            <i className={"far fa-thumbs-down"}></i>
                          </span>
                        ) : (
                          <span className="badge badge-pill badge-info send-invitations-blank">
                            <i className="fas a-check"></i>
                          </span>
                        )}

                        <span className="badge badge-pill badge-info send-invitations-RSVP">
                          {user.status === null || !user["status"]
                            ? "NI"
                            : convertUNIXString(user.sys.updatedAt, 2)}
                        </span>

                        <span className="badge badge-pill badge-info send-invitations-age">
                          {getAge(user.dateOfBirth)}
                        </span>
                        <span className="badge badge-pill badge-info send-invitations-status">
                          {user.previouslyMarried === "no"
                            ? "S"
                            : user.previouslyMarried === "once"
                              ? "M"
                              : user.previouslyMarried === "divorced"
                                ? "D"
                                : ""}
                        </span>
                        <span className="badge badge-pill badge-info send-invitations-events">
                          {user.eventMemberships}
                          {!user["eventMemberships"] && "0"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="who-is-invited-back-btn">
                  <input
                    type="Submit"
                    value="Back"
                    onClick={() => {
                      goBack();
                    }}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="who-is-invited-next-btn"
                  onClick={() => {
                    sendInvitations();
                  }}
                >
                  {loader ? (
                    <Spinner animation="border" role="status"></Spinner>
                  ) : (
                    <input
                      type="Submit"
                      value="Send Invitations"
                      readOnly
                    />
                  )}
                  {error ? (
                    <p className="error">
                      Please select atleast one user or write subject and body
                      for email
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </>
  );
};
export default withRouter(SendInvitation);
