import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import readLocalStorage from "../utils/readLocalStorage";
import { TokenAuthThunk } from "../redux/actions/Auth/handleUnauthorizedRoutes";
import { RootState } from "../redux/reducers/index";
export const ProtectedRoute: React.FC<{
  component: any | React.FC;
  path: string;
}> = ({ component: Component, ...rest }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TokenAuthThunk());
  }, [dispatch]);

  const LoadingSection = () => {
    return (
      <div style={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
        <Spinner animation="border" />
      </div>
    );
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth === false) {
          return <LoadingSection />;
        } else if (
          auth === "failed" ||
          readLocalStorage("access-token") === undefined
        ) {
          localStorage.clear();
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
