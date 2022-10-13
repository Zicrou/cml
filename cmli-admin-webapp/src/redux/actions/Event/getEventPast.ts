import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import getAge from "../../../utils/getAge";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { GetPastEventProps } from "../../../types"
export const GET_EVENT_SUCCESS = "GET_EVENT_SUCCESS";
export const GET_EVENT_ERROR = "GET_EVENT_ERROR";
export const GET_EVENT_REQUEST = "GET_EVENT_REQUEST ";

export const getEvent = (event: GetPastEventProps) => (dispatch: any) => {
  dispatch({ type: GET_EVENT_REQUEST });
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${event.eventId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: any) => {
      if (response && response.status === 200) {
        let eventId = response.data.sys.id;
        axios({
          method: "get",
          url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/event_members`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "access-token": readLocalStorage("access-token"),
          },
        })
          .then((responses: any) => {
            dispatch({ type: GET_EVENT_REQUEST });
            let men: {
              singles: number[];
              married: number[];
              divorced: number[];
            } = {
              singles: [],
              married: [],
              divorced: [],
            };
            let women: {
              singles: number[];
              married: number[];
              divorced: number[];
            } = {
              singles: [],
              married: [],
              divorced: [],
            };
            let temp_obj: any = {};
            if (responses && responses.data.items.length) {
              for (let i = 0; i < responses.data.items.length; i++) {
                if (responses.data.items[i].lookingFor === "wife") {
                  let age = getAge(responses.data.items[i].dateOfBirth);
                  if (responses.data.items[i].previouslyMarried === "no") {
                    men.singles.push(age);
                  } else if (
                    responses.data.items[i].previouslyMarried === "once"
                  ) {
                    men.married.push(age);
                  }
                  else if (
                    responses.data.items[i].previouslyMarried === "widowed"
                  ) {
                    men.married.push(age);
                  }  else if (
                    responses.data.items[i].previouslyMarried === "divorced"
                  ) {
                    men.divorced.push(age);
                  }
                } else if (responses.data.items[i].lookingFor === "husband") {
                  let age = getAge(responses.data.items[i].dateOfBirth);
                  if (responses.data.items[i].previouslyMarried === "no") {
                    women.singles.push(age);
                  } else if (
                    responses.data.items[i].previouslyMarried === "once"
                  ) {
                    women.married.push(age);
                  } 
                  else if (
                    responses.data.items[i].previouslyMarried === "widowed"
                  ) {
                    men.married.push(age);
                  } else if (
                    responses.data.items[i].previouslyMarried === "divorced"
                  ) {
                    women.divorced.push(age);
                  }
                }
              }
            }

            temp_obj.eventData = response.data;
            temp_obj.eventMembers = { men, women };
            axios({
              method: "get",
              url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/invitations`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "access-token": readLocalStorage("access-token"),
              },
            }).then((responseInvitation: any) => {
              axios({
                method: "get",
                url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/interest_preferences`,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "access-token": readLocalStorage("access-token"),
                },
              }).then((responseInterest: any) => {
                axios({
                  method: "get",
                  url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/member_matches`,
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "access-token": readLocalStorage("access-token"),
                  },
                }).then((responseMatches: any) => {
                  let matches = responseMatches.data.items;
                  let matchesList: any[] = [];
                  for (let k = 0; k < matches.length; k++) {
                    let memberOneId = matches[k].interestedMemberOne;
                    let memberTwoId = matches[k].interestedMemberTwo;
                    let personOne = responses.data.items.find(
                      (k: any) => k.eventMembershipId === memberOneId
                    );
                    let personTwo = responses.data.items.find(
                      (k: any) => k.eventMembershipId === memberTwoId
                    );

                    matchesList.push({ personOne, personTwo });
                  }
                  if (
                    responseInvitation &&
                    responseInvitation.data.items.length
                  ) {
                    let usersList = [];
                    let interestPreference = responseInterest.data.items;

                    for (let i = 0; i < responses.data.items.length; i++) {
                      for (
                        let j = 0;
                        j < responseInvitation.data.items.length;
                        j++
                      ) {
                        if (
                          responses.data.items[i].sys.id ===
                          responseInvitation.data.items[j].userId
                        ) {
                          let heartCounter = [];
                          for (let m = 0; m < interestPreference.length; m++) {
                            if (
                              responses.data.items[i].eventMembershipId ===
                              interestPreference[m].interestedInId
                            ) {
                              let result = responses.data.items.find(
                                (k: any) =>
                                  k.eventMembershipId ===
                                  interestPreference[m].interestedById
                              );

                              if (result) {
                                let matchFlag = true;
                                for (let k = 0; k < matchesList.length; k++) {
                                  if (
                                    (result.eventMembershipId ===
                                      matchesList[k].personOne
                                        .eventMembershipId ||
                                      result.eventMembershipId ===
                                        matchesList[k].personTwo
                                          .eventMembershipId) &&
                                    (interestPreference[m].interestedInId ===
                                      matchesList[k].personOne
                                        .eventMembershipId ||
                                      interestPreference[m].interestedInId ===
                                        matchesList[k].personTwo
                                          .eventMembershipId)
                                  ) {
                                    heartCounter.push({
                                      name: result.memberName,
                                      heart: true,
                                    });
                                    matchFlag = false;
                                  }
                                }
                                if (matchFlag) {
                                  heartCounter.push({
                                    name: result.memberName,
                                    heart: false,
                                  });
                                }
                              }
                            }
                          }

                          usersList.push({
                            userName: responses.data.items[i].memberName,
                            age: getAge(responses.data.items[i].dateOfBirth),
                            maritialStatus:
                              responses.data.items[i].previouslyMarried,
                            eventAttended:
                              responses.data.items[i].eventMemberships,
                            eventInvites:
                              responses.data.items[i].eventInvitations,
                            rSvp: responseInvitation.data.items[j].status,
                            lookingFor: responses.data.items[i].lookingFor,
                            hearts: heartCounter,
                            email: responses.data.items[i].email,
                            sys: responses.data.items[i].sys,
                          });
                          break;
                        }
                      }
                    }

                    for (
                      let k = 0;
                      k < responseInvitation.data.items.length;
                      k++
                    ) {
                      let user = responseInvitation.data.items[k];
                      if (
                        (user.status === "no" || user.status === null) &&
                        user.personName != null
                      ) {
                        usersList.push({
                          userName: user.personName,
                          age: getAge(user.dateOfBirth),
                          maritialStatus: user.previouslyMarried,
                          eventAttended: user.eventMemberships,
                          eventInvites: user.eventInvitations,
                          rSvp: user.status,
                          lookingFor: user.lookingFor,
                          email: user.email,
                          hearts: [],
                          sys: user.sys,
                        });
                      }
                    }

                    temp_obj.usersList = usersList;
                    temp_obj.matchesList = matchesList;
                    dispatch({
                      type: GET_EVENT_SUCCESS,
                      payload: temp_obj,
                    });
                  } else {
                    dispatch({
                      type: GET_EVENT_SUCCESS,
                      payload: temp_obj,
                    });
                  }
                });
              });
            });
          })
          .catch((error: { response: any }) => {
            if (error.response.status === 401) {
              dispatch(tokenAuthFailedAction());
            }
          });
      } else {
        dispatch({
          type: GET_EVENT_SUCCESS,
          payload: response,
        });
      }
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: GET_EVENT_ERROR,
        payload: error,
      });
    });
};
