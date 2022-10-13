import React, { useState } from "react";
import "./style.css";
import { UserlistComponentProps } from "../../types"

const UsersList: React.FC<UserlistComponentProps> = (props: UserlistComponentProps) => {
  const [usersList, setUsersList] = useState("");
  const showUsersList = (a: string) => {
    if (!usersList) {
      setUsersList(a);
    } else {
      setUsersList("");
    }
  };
  const { users } = props;
  return (
    <>
      <div className="past-event-scroll-bar">
        <div className="row">
          <div className="col-md-4 col-lg-6 col-sm-12 "></div>
          <div className="col-md-8 col-lg-6 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-md-12 col-lg-6 col-sm-12 col-12"></div>
              <div className="col-md-2 col-lg-1 col-sm-2 col-2 past-event-like-style">
                <span className="past-info-heading-like">Likes</span>
              </div>
              <div className="col-md-2 col-lg-1 col-sm-2 col-2 past-event-attend-style">
                <span className="past-info-heading-attend">Attend</span>
              </div>
              <div className="col-md-2 col-lg-1 col-sm-2 col-2 past-event-age-style">
                <span className="past-info-heading-age">Age</span>
              </div>
              <div className="col-md-2 col-lg-1 col-sm-2 col-2 past-event-status-style">
                <span className="past-info-heading-status">Single</span>
              </div>
              <div className="col-md-2 col-lg-1 col-sm-2 col-2 past-event-events-style">
                <span className="past-info-heading-events">Events</span>
              </div>
              <div className="col-md-2 col-lg-1 col-sm-2 col-2"></div>
            </div>
          </div>
        </div>

        {users && users.length ? (
          users.map((user: any) => (
            <div
              data-toggle="buttons"
              className={
                user && user.lookingFor === "husband"
                  ? "btn btn-default past-events-women-select-button"
                  : "btn btn-default past-events-men-select-button"
              }
              key={user.sys.id}
            >
              <div className="row" onClick={() => showUsersList(user.sys.id)}>
                <div className="col-md-4 col-lg-6 col-sm-12 past-event-personal-info-title">
                  <b>{user.userName}</b>
                  {usersList === user.sys.id ? (
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
                <div className="col-md-8 col-lg-6 col-sm-12 col-12">
                  <div className="past-event-personal-info">
                    <div className="row">
                      <div className="col-md-12 col-lg-6 col-sm-12 col-12"></div>
                      <div className="col-md-2 col-lg-1 col-sm-2 col-2">
                        {user && user.hearts.length === 0 ? (
                          <span className="past-event-heart-icon">
                            {" "}
                            <span>
                              <i className="fa fa-heart-o past-event-unfilled-heart-icon"></i>
                            </span>
                            <span className="hearts-counting">{""}</span>
                          </span>
                        ) : (
                          <span className="past-event-heart-icon">
                            {" "}
                            <span>
                              <i className="fa fa-heart past-event-filled-heart-icon">
                                <span className="hearts-counting">
                                  {user.hearts.length}
                                </span>
                              </i>
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="col-md-2 col-lg-1 col-sm-2 col-2">
                        <span className="badge badge-pill badge-info past-event-tick">
                          {user.rSvp === "yes" ? (
                            <i className="fas fa-check"></i>
                          ) : user.rSvp === "no" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            "NR"
                          )}
                        </span>
                      </div>
                      <div className="col-md-2 col-lg-1 col-sm-2 col-2">
                        <span className="badge badge-pill badge-info past-event-age">
                          {user.age}
                        </span>
                      </div>
                      <div className="col-md-2 col-lg-1 col-sm-2 col-2">
                        <span className="badge badge-pill badge-info past-event-status">
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
                      <div className="col-md-2 col-lg-1 col-sm-2 col-2">
                        <span className="badge badge-pill badge-info past-event-events">
                          {user.eventAttended}/{user.eventInvites}
                        </span>
                      </div>
                      <div className="col-md-2 col-lg-1 col-sm-2 col-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-user-preset">No user present ☹</p>
        )}
      </div>
    </>
  );
};
export default UsersList;
