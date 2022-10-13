import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { getUsers } from "../../redux/actions/User/getUsers";
import { useDispatch } from "react-redux";

export const SearchForm = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
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
  return (
    <div className="search-form-div">
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
    </div>
  );
};
