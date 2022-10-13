import { Link } from "react-router-dom";
import avatar from "./images/avatar.png";
import getAge from "../../utils/getAge";
import { User, ListUserRowProps } from "../../types";

const martialStatus = (status: string) => {
  var answer = "-";
  switch (status) {
    case "no":
      answer = "S";
      break;
    case "once":
      answer = "M";
      break;
    case "divorced":
      answer = "D";
      break;
      case "widowed":
        answer = "W";
        break;
  }
  return answer;
};

const getProfilePic = (user: User) => {
  if (user.demographicImage.thumb === "nil") return avatar;

  return `${process.env.REACT_APP_BACKEND_API_BASE}${user.demographicImage.thumb}`;
};

export const ListUserRow = ({ user }: ListUserRowProps) => {
  return (
    <div
      className={
        "row people-results-info " +
        (user.lookingFor === "husband" ? "women-results" : "men-results")
      }
      key={user.sys.id}
    >
      <div className="col-md-2 col-sm-2 col-xm-2 col-lg-2">
        <div className="people-results-name-and-pic">
          <div
            className={
              user.lookingFor === "husband"
                ? "people-result-pic"
                : "people-result-men-pic"
            }
          >
            <img src={getProfilePic(user)} alt="" />
          </div>
        </div>
      </div>
      <div className="col-md-2 col-sm-2 col-xm-2 col-lg-4">
        <div className="people-reult-name">
          <Link
            to={{
              pathname: `/profile/${user.sys.id}`,
              state: {
                attendtedEvents: `${user.attendedEvents}`,
              },
            }}
          >
            <b>{user.personName}</b>
          </Link>
        </div>
      </div>

      <div className="col-md-2 col-sm-2 col-xm-2 col-lg-2">
        <span className="badge badge-pill badge-info people-result-badge-age">
          {getAge(user.dateOfBirth)}
        </span>
      </div>
      <div className="col-md-2 col-sm-2 col-xm-2 col-lg-2">
        <span className="badge badge-pill badge-info people-result-badge-status">
          {martialStatus(user.previouslyMarried)}
        </span>
      </div>
      <div className="col-md-2 col-sm-2 col-xm-2 col-lg-2">
        <span className="badge badge-pill badge-info people-result-badge-events">
          {user.attendedEvents}
        </span>
      </div>
    </div>
  );
};
