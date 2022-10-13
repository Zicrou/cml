import React, { useState } from "react";
import convertUNIXString from "../../utils/convertUNIXTimeStamp";
import "./style.css";
import { UserlistComponentProps } from "../../types"
const UsersList: React.FC<UserlistComponentProps> = (props: UserlistComponentProps) => {
  const [usersLikesList, setUsersLikesList] = useState("");
  const showlikesUsersList = (a: string) => {
    if (!usersLikesList) {
      setUsersLikesList(a);
    } else {
      setUsersLikesList("");
    }
  };
  var arrayUniqueByKey: any;
  var { users } = props;
  var key: any = "userName";

  if (users !== null) {
    arrayUniqueByKey = [
      ...new Map(users && users.map((item) => [item[key], item])).values(),
    ];
    users = arrayUniqueByKey;
  }

  return (
    <>
      <div className="upcoming-events-scroll-bar">
        <div className="row">
          <div className="col-md-4 col-lg-7 col-sm-12 "></div>
          <div className="col-md-8 col-lg-5 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-yes-style">
                <span className="future-event-yes-info-headings">Yes</span>
              </div>
              <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-rsvp-style">
                <span className="future-event-rsvp-info-headings">RSVP</span>
              </div>
              <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-age-style">
                <span className="future-event-age-info-headings">Age</span>
              </div>
              <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-status-style">
                <span className="future-event-status-info-headings">
                  Single
                </span>
              </div>
              <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-events-style">
                <span className="future-event-events-info-headings">
                  Events
                </span>
              </div>
              <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-empty-col-style"></div>
            </div>
          </div>
        </div>

        {users && users.length ? (
          <div className="row row-width">
            {users.map((user: any) => (
              <div
                data-toggle="buttons"
                className={
                  user && user.lookingFor === "husband"
                    ? "btn btn-default future-events-women-select-button"
                    : "btn btn-default future-events-men-select-button"
                }
                key={user && user.sys.id}
              >
                <div
                  className="row"
                  onClick={() => showlikesUsersList(user.sys.id)}
                >
                  <div className="col-md-4 col-lg-7 col-sm-12 future-event-personal-info-title">
                    <b>{user && user.userName}</b>
                    {usersLikesList === user.sys.id ? (
                      <ul className="users-list" id="users-list">
                        {user && user.hearts.length
                          ? user.hearts.map((item: any) => (
                            <li>
                              {item.heart ? (
                                <i
                                  className="fa fa-heart"
                                  style={{ color: "red" }}
                                ></i>
                              ) : null}

                              {item.name}
                            </li>
                          ))
                          : null}
                      </ul>
                    ) : null}
                  </div>

                  <div className="col-md-8 col-lg-5 col-sm-12 col-12">
                    <div className="future-event-personal-info">
                      <div className="row">
                        <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-yes-style">
                          <span className="badge badge-pill badge-info future-event-thumbs-up">
                            {user.rSvp === "yes" ? (
                              <i className="far fa-thumbs-up"></i>
                            ) : user.rSvp === "no" ? (
                              <i className="far fa-thumbs-down"></i>
                            ) : (
                              "NR"
                            )}
                          </span>
                        </div>
                        <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-rsvp-style">
                          <span className="badge badge-pill badge-info future-event-RSVP">
                            {user.rSvpUpdatedDate === "NR"
                              ? "NR"
                              : convertUNIXString(
                                user && user.rSvpUpdatedDate,
                                2
                              )}
                          </span>
                        </div>
                        <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-age-style">
                          <span className="badge badge-pill badge-info future-event-age">
                            {user && user.age}
                          </span>
                        </div>
                        <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-status-style">
                          <span className="badge badge-pill badge-info future-event-status">
                            {user && user.maritialStatus === "no"
                              ? "S"
                              : user.maritialStatus === "once" 
                                ? "M"
                                : user.maritialStatus === "divorced"
                                  ? "D"
                                  : user.maritialStatus === "widowed"
                                  ? "W"
                                  : ""}
                          </span>
                        </div>
                        <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-events-style">
                          <span className="badge badge-pill badge-info future-event-events">
                            {user && user.eventAttended}/
                            {user && user.eventInvites}
                          </span>
                        </div>
                        <div className="col-md-2 col-lg-2 col-sm-2 col-2 event-empty-col-style"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-user-found">No users found ☹</p>
        )}
      </div>
    </>
  );
};
export default UsersList;
