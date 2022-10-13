import React, { useEffect, useState, Fragment } from "react";
import { Spinner, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/User/getUsers";
import { RootState } from "../../redux/reducers/index";
import { User, UsersListingView } from "../../types";
import "./style.css";
import { ListUserRow } from "./ListUserRow";
import { PeopleListingHeader } from "./PeopleListingHeader";
import { NoPeopleListingState } from "./NoPeopleListingState";
import { PeopleSearchLoadingState } from "./PeopleSearchLoadingState";

const PeopleListing: React.FC = () => {
  const dispatch = useDispatch();
  const usersApiResponse = useSelector((state: RootState) => state.getUsers);
  const [usersList, setUsersList] = useState<any>();
  const [loader, setLoader] = useState(true);
  const [value, setValue] = useState("");
  const [minAgeValue, setMinAgeValue] = useState("");
  const [maxAgeValue, setMaxAgeValue] = useState("");
  const [pastEventValue, setPastEventValue] = useState("");
  const [maritalValue, setMaritalValue] = useState("");

  const onSubmit = (event: any) => {
    event.preventDefault();
    let url = "";
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    if (formDataObj.eventsAttended !== "") {
      url = `past_event_attended=${formDataObj.eventsAttended}&`;
      setPastEventValue(formDataObj.eventsAttended);
    }
    if (formDataObj.eventsAttended === "") {
      url = `past_event_attended=${formDataObj.eventsAttended}&`;
      setPastEventValue("");
    }
    if (formDataObj.maritialStatus !== "") {
      url = url + `previously_married=${formDataObj.maritialStatus}&`;
      setMaritalValue(formDataObj.maritialStatus);
    }
    if (formDataObj.maritialStatus === "") {
      url = url + `previously_married=${formDataObj.maritialStatus}&`;
      setMaritalValue("");
    }
    if (formDataObj.maxAge !== "") {
      formDataObj.minAge === ""
        ? (url = url + `max_age=${formDataObj.maxAge}&min_age=1&`)
        : (url = url + `max_age=${formDataObj.maxAge}&`);
      setMaxAgeValue(formDataObj.maxAge);
    }
    if (formDataObj.maxAge === "") {
      formDataObj.minAge === ""
        ? (url = url + `max_age=${formDataObj.maxAge}&min_age=1&`)
        : (url = url + `max_age=${formDataObj.maxAge}&`);
      setMaxAgeValue("");
    }
    if (formDataObj.minAge !== "") {
      formDataObj.maxAge === ""
        ? (url = url + `min_age=${formDataObj.minAge}&max_age=100&`)
        : (url = url + `min_age=${formDataObj.minAge}&`);
      setMinAgeValue(formDataObj.minAge);
    }
    if (formDataObj.minAge === "") {
      formDataObj.maxAge === ""
        ? (url = url + `min_age=${formDataObj.minAge}&max_age=100&`)
        : (url = url + `min_age=${formDataObj.minAge}&`);
      setMinAgeValue("");
    }
    if (formDataObj.personName !== "") {
      url = url + `name=${formDataObj.personName}&`;
      setValue(formDataObj.personName);
    }
    if (formDataObj.personName === "") {
      url = url + `name=${formDataObj.personName}&`;
      setValue("");
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
    dispatch(getUsers({ status: false }));
  }, [dispatch]);
  useEffect(() => {
    if (usersApiResponse === undefined || usersApiResponse.status !== 200)
      return;

    const users: User[] = usersApiResponse.data.items;
    let menCount = 0;
    let womenCount = 0;

    const filteredUsers = users.filter((user) => {
      if (user.lookingFor === "wife" && user.personName !== null) menCount += 1;
      else if (user.lookingFor === "husband" && user.personName !== null)
        womenCount += 1;
      return user.personName !== null;
    });

    const obj: UsersListingView = {
      users: filteredUsers,
      womenCount,
      menCount,
    };
    setUsersList(obj);
    setLoader(false);
  }, [usersApiResponse]);

  const PeopleListingSearch = () => {
    return (
      <Fragment>
        <div className="results-with-pictures-details-title">
          <b>People Search</b>
        </div>
        <div className="results-with-pictures-details-content">
          <Form onSubmit={onSubmit} action="">
            <div className="row">
              <div className="col-md-12 results-with-pictures-text-input">
                <input
                  type="text"
                  placeholder="Name"
                  name="personName"
                  defaultValue={value}
                />
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
                        defaultValue={maritalValue}
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
                        defaultValue={minAgeValue}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="col-md-12 results-with-pictures-number-input">
                      <input
                        type="number"
                        placeholder="Max Age"
                        name="maxAge"
                        defaultValue={maxAgeValue}
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
                        defaultValue={pastEventValue}
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
        </div>
        <SearchResultInfo />
      </Fragment>
    );
  };

  const PeopleListingRows = () => {
    return (
      <div className="people-listing-scroll-bar">
        {usersList.users.map((user: User) => (
          <ListUserRow key={user.sys.id} user={user} />
        ))}
      </div>
    );
  };

  const SearchResultInfo = () => {
    return (
      <div className="row people-results-row">
        <div className="col-md-6 col-sm-12 col-lg-6 people-results">
          <b>{usersList && usersList.users.length} Results</b>
        </div>
        <div className="col-md-6 col-sm-12 col-lg-6 people-catogories">
          <b>
            {usersList && usersList.menCount} men,{" "}
            {usersList && usersList.womenCount} women{" "}
          </b>
        </div>
      </div>
    );
  };

  const PeopleListingSection = () => {
    return (
      <div className="people-listings">
        <PeopleListingHeader />
        {usersList && usersList.users.length ? (
          <PeopleListingRows />
        ) : (
          <NoPeopleListingState />
        )}
      </div>
    );
  };

  return (
    <div data-testid="people-listing">
      <PeopleListingSearch />
      {loader ? <PeopleSearchLoadingState /> : <PeopleListingSection />}
    </div>
  );
};
export default PeopleListing;
