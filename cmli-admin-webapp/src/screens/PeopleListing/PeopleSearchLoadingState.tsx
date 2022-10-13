import { Spinner } from "react-bootstrap";

export const PeopleSearchLoadingState = () => {
  return (
    <div className="row">
      <div
        className="col-md-12 col-sm-12 col-lg-12"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <Spinner animation="border" role="status"></Spinner>
      </div>
    </div>
  );
};