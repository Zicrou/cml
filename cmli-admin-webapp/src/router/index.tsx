import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./privateRoute";
import PostLogin from "../screens/PostLogin";
import App from "../screens/App";
const Routers: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/login"
            component={() => {
              window.location.href = `${process.env.REACT_APP_LOGIN_HOST}/login?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=${process.env.REACT_APP_POST_LOGIN_URL}`;
              return null;
            }}
          />
          <Route exact path="/post-login" component={PostLogin} />
          <ProtectedRoute path="/" component={App} />
        </Switch>
      </Router>
    </>
  );
};
export default Routers;
