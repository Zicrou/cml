import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showDemographic } from "../../redux/actions/Demographics/show";
import { getAnswers } from "../../redux/actions/Answers/get";

import { RootState } from "../../redux/reducers/index";
import { Dropdown } from "react-bootstrap";

import LifeStyleQuestionnaire from "./lifeStyleQuestionnaire";
import ChildrenQuestionnaire from "./childrenQuestionnaire";
import RelationshipQuestionnaire from "./relationshipQuestionnaire";
import FinanceQuestionnaire from "./finaceQuestionnaire";
import logo from "./images/cml-logo.png";
import getAge from "./../../utils/getAge";
import "./style.css";

const ViewProfile: React.FC = (props: any) => {
  const { userId } = props.match.params;
  const { attendtedEvents } = props.location.state;
  const dispatch = useDispatch();
  const showDemographicStatus = useSelector(
    (state: RootState) => state.showDemographic
  );

  const getAnswersStatus = useSelector((state: RootState) => state.getAnswers);
  const [lifeStyleState, setLifeStyleState] = useState<any | null>(null);
  const [childrenState, setChildrenState] = useState<any | null>(null);
  const [relationshipState, setRelationshipState] = useState<any | null>(null);
  const [financeState, setFinanceState] = useState<any | null>(null);
  const [Flags, setFlags] = useState<any>({
    lifestyle: true,
    relationship: false,
    finance: false,
    children: false,
  });

  useEffect(() => {
    dispatch(showDemographic(userId));
    dispatch(getAnswers(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    if (getAnswersStatus && getAnswersStatus.status === 200) {
      const answersList = getAnswersStatus.data.items;
      const lifestyle: any[] = [];
      const relationship: any[] = [];
      const finance: any[] = [];
      const children: any[] = [];
      const temp_arr_hobbies = [];
      const temp_arr_other_hobbies = [];
      const lifestyleTravel = { status: "", description: "" };
      let decision = "";
      let family = "";
      let spouseExam = "";
      let healthIssuesDescription = "";
      const lifestyleReading = { status: "", description: "" };
      const childrenDesired = { status: "", description: "" };
      const childrenExist = { status: "", description: "" };
      let immediateFamily = "";
      let spouseQualities = "";
      let religiousExpectation = "";
      let spiritualContribution = "";
      const interRacialMarriage = { status: "", description: "" };
      const languageDifference = { status: "", description: "" };
      const livingSituation = { status: "", description: "" };
      let financeWealth = "";
      let financeResponsibility = "";
      let financeExpectation = "";
      let financeDebt = "";
      const financeWorkingWife = { status: "", description: "" };
      const financeDependents = { status: "", description: "" };

      for (let i = 0; i < answersList.length; i++) {
        if (answersList[i].questionCategoryId === 1) {
          lifestyle.push(answersList[i]);
        }
        if (answersList[i].questionCategoryId === 2) {
          relationship.push(answersList[i]);
        }
        if (answersList[i].questionCategoryId === 3) {
          finance.push(answersList[i]);
        }
        if (answersList[i].questionCategoryId === 4) {
          children.push(answersList[i]);
        }
      }
      for (let i = 0; i < lifestyle.length; i++) {
        if (lifestyle[i].questionId === 1 && lifestyle[i].sortId !== 6) {
          temp_arr_hobbies.push(lifestyle[i].response);
        } else if (lifestyle[i].questionId === 1 && lifestyle[i].sortId === 6) {
          temp_arr_other_hobbies.push(lifestyle[i].response);
        } else if (lifestyle[i].questionId === 2 && lifestyle[i].sortId === 1) {
          lifestyleTravel.status = lifestyle[i].response;
        } else if (lifestyle[i].questionId === 2 && lifestyle[i].sortId === 2) {
          lifestyleTravel.description = lifestyle[i].response;
        } else if (lifestyle[i].questionId === 4) {
          decision = lifestyle[i].response;
        } else if (lifestyle[i].questionId === 7) {
          family = lifestyle[i].response;
        } else if (lifestyle[i].questionId === 6) {
          spouseExam = lifestyle[i].response;
        } else if (lifestyle[i].questionId === 3 && lifestyle[i].sortId === 1) {
          lifestyleReading.status = lifestyle[i].response;
        } else if (lifestyle[i].questionId === 3 && lifestyle[i].sortId === 2) {
          lifestyleReading.description = lifestyle[i].response;
        } else if (lifestyle[i].questionId === 5) {
          healthIssuesDescription = lifestyle[i].response;
        }
      }
      for (let i = 0; i < children.length; i++) {
        if (children[i].questionId === 21 && children[i].sortId === 1) {
          childrenDesired.status = children[i].response;
        } else if (children[i].questionId === 21 && children[i].sortId === 2) {
          childrenDesired.description = children[i].response;
        } else if (children[i].questionId === 22 && children[i].sortId === 2) {
          childrenExist.description = children[i].response;
        } else if (children[i].questionId === 22 && children[i].sortId === 1) {
          childrenExist.status = children[i].response;
        }
      }
      for (let i = 0; i < relationship.length; i++) {
        if (relationship[i].questionId === 8) {
          immediateFamily = relationship[i].response;
        } else if (relationship[i].questionId === 10) {
          spouseQualities = relationship[i].response;
        } else if (relationship[i].questionId === 11) {
          religiousExpectation = relationship[i].response;
        } else if (relationship[i].questionId === 12) {
          spiritualContribution = relationship[i].response;
        } else if (
          relationship[i].questionId === 14 &&
          relationship[i].sortId === 1
        ) {
          interRacialMarriage.status = relationship[i].response;
        } else if (
          relationship[i].questionId === 14 &&
          relationship[i].sortId === 2
        ) {
          interRacialMarriage.description = relationship[i].response;
        } else if (
          relationship[i].questionId === 13 &&
          relationship[i].sortId === 1
        ) {
          languageDifference.status = relationship[i].response;
        } else if (
          relationship[i].questionId === 13 &&
          relationship[i].sortId === 2
        ) {
          languageDifference.description = relationship[i].response;
        } else if (
          relationship[i].questionId === 9 &&
          relationship[i].sortId === 1
        ) {
          livingSituation.status = relationship[i].response;
        } else if (
          relationship[i].questionId === 9 &&
          relationship[i].sortId === 2
        ) {
          livingSituation.description = relationship[i].response;
        }
      }

      for (let i = 0; i < finance.length; i++) {
        if (finance[i].questionId === 15) {
          financeWealth = finance[i].response;
        } else if (finance[i].questionId === 16) {
          financeResponsibility = finance[i].response;
        } else if (finance[i].questionId === 17) {
          financeExpectation = finance[i].response;
        } else if (finance[i].questionId === 19) {
          financeDebt = finance[i].response;
        } else if (finance[i].questionId === 18 && finance[i].sortId === 1) {
          financeWorkingWife.status = finance[i].response;
        } else if (finance[i].questionId === 18 && finance[i].sortId === 2) {
          financeWorkingWife.description = finance[i].response;
        } else if (finance[i].questionId === 20 && finance[i].sortId === 1) {
          financeDependents.status = finance[i].response;
        } else if (finance[i].questionId === 20 && finance[i].sortId === 2) {
          financeDependents.description = finance[i].response;
        }
      }

      setLifeStyleState([
        {
          hobbies: temp_arr_hobbies,
          otherHobbies: temp_arr_other_hobbies,
          travel: lifestyleTravel,
          decisionDescription: decision,
          familyDescription: family,
          spouseExam,
          lifestyleReading,
          healthIssuesDescription,
        },
      ]);
      setChildrenState([
        {
          childrenDesired,
          childrenExist,
        },
      ]);

      setRelationshipState([
        {
          immediateFamily,
          spouseQualities,
          religiousExpectation,
          spiritualContribution,
          interRacialMarriage,
          languageDifference,
          livingSituation,
        },
      ]);
      setFinanceState([
        {
          financeWealth,
          financeResponsibility,
          financeExpectation,
          financeDebt,
          financeWorkingWife,
          financeDependents,
        },
      ]);
    }
  }, [getAnswersStatus]);
  return (
    <>
      <div className="background">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="user-profile-cml-logo">
              <div className="user-profile-logo">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">
                <b id="user-profile-logo-style">INTRODUCTIONS</b>
              </div>
            </div>
            {showDemographicStatus && showDemographicStatus === true ? (
              <div className="user-profile-loader">
                <div
                  className="spinner-border"
                  role="status"
                  style={{ textAlign: "center" }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="card user-profile-card">
                <img
                  className={
                    showDemographicStatus &&
                      showDemographicStatus.data.lookingFor === "husband"
                      ? "card-img-top"
                      : "card-img-top-men"
                  }
                  src={
                    showDemographicStatus &&
                      showDemographicStatus.data.demographicImage
                      ? `${process.env.REACT_APP_BACKEND_API_BASE}${showDemographicStatus.data.demographicImage.orignal}`
                      : ""
                  }
                  alt=""
                />
                <div className="card-body">
                  <div className="eye-icon">
                    <span>
                      <i className="fa fa-eye"></i>
                    </span>
                  </div>
                  <div className="user-title">
                    {showDemographicStatus &&
                      showDemographicStatus.data.personName}
                  </div>
                  <div className="info-badges">
                    <span className="badge badge-pill badge-info age">
                      {showDemographicStatus &&
                        getAge(showDemographicStatus.data.dateOfBirth)}
                    </span>
                    <span className="badge badge-pill badge-info status">
                      {showDemographicStatus.data !== undefined
                        ? showDemographicStatus.data.previouslyMarried === 'no'
                          ? 'Single'
                          : showDemographicStatus.data.previouslyMarried === 'once'
                            ? 'Married'
                            : showDemographicStatus.data.previouslyMarried === 'divorced'
                              ? 'Divorced'
                              : showDemographicStatus.data.previouslyMarried === 'widowed'
                                ? 'Widowed'
                                : ''
                        : ''}
                    </span>
                  </div>
                  <div className="location-badges">
                    <span className="address-badge">
                      {showDemographicStatus &&
                        showDemographicStatus.data.address}
                    </span>
                    <span className="phone-badge">
                      {showDemographicStatus &&
                        showDemographicStatus.data.telephone}
                    </span>
                    <span>
                      <i className="fa fa-lock user-lock-icon"></i>
                    </span>
                  </div>
                  <div className="attended-badges">
                    <span className="badge badge-pill badge-info status">
                      Attended {attendtedEvents}
                    </span>
                  </div>
                  <Dropdown className="custom-dropdown">
                    <Dropdown.Toggle
                      variant="default"
                      id="dropdown-basic-view"
                      className="dropdown-toggle menu-btn"
                    >
                      {Flags.lifestyle
                        ? "LifeStyle"
                        : Flags.relationship
                          ? "Relationship"
                          : Flags.finance
                            ? "Finance"
                            : Flags.children
                              ? "Children"
                              : ""}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#"
                        onClick={() => {
                          setFlags({
                            lifestyle: true,
                            relationship: false,
                            finance: false,
                            children: false,
                          });
                        }}
                      >
                        {" "}
                        Lifestyle
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#"
                        onClick={() => {
                          setFlags({
                            lifestyle: false,
                            relationship: true,
                            finance: false,
                            children: false,
                          });
                        }}
                      >
                        Relationship
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#"
                        onClick={() => {
                          setFlags({
                            lifestyle: false,
                            relationship: false,
                            finance: true,
                            children: false,
                          });
                        }}
                      >
                        Finance
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#"
                        onClick={() => {
                          setFlags({
                            lifestyle: false,
                            relationship: false,
                            finance: false,
                            children: true,
                          });
                        }}
                      >
                        Children
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="card-content">
                    {Flags.lifestyle === true ? (
                      <LifeStyleQuestionnaire
                        lifeStyleState={lifeStyleState}
                      />
                    ) : (
                      ""
                    )}

                    {/* children */}
                    {Flags.children === true ? (
                      <ChildrenQuestionnaire childrenState={childrenState} />
                    ) : (
                      ""
                    )}

                    {/* relation ship */}
                    {Flags.relationship === true ? (
                      <RelationshipQuestionnaire
                        relationshipState={relationshipState}
                      />
                    ) : (
                      ""
                    )}

                    {/* finnace */}
                    {Flags.finance === true ? (
                      <FinanceQuestionnaire financeState={financeState} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>

    </>
  );
};

export default withRouter(ViewProfile);
