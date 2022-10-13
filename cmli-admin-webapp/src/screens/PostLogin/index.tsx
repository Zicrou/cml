import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initSessionFromCallbackURI } from "../../redux/actions/Session";
import { RootState } from "../../redux/reducers/index";

import "./style.css";

const PostLogin: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const setSessionStatus = useSelector((state: RootState) => state.setSession);

  useEffect(() => {
    if (
      setSessionStatus &&
      setSessionStatus.isLoggedIn &&
      setSessionStatus.credentials &&
      setSessionStatus.user
    ) {
      history.push("/event-listing");
    }
  }, [setSessionStatus, history]);
  useEffect(() => {
    if (props.location.hash || props.location.search) {
      dispatch(initSessionFromCallbackURI(window.location.href));
    }
  }, [dispatch, props]);

  return (
    <>
      <div>
        <p>Loading...</p>
      </div>
    </>
  );
};

export default withRouter(PostLogin);
