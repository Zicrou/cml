export const PeopleListingHeader = () => {
  return (
    <div className="people-listing-heading-style">
      <div className="row people-results-headings-row">
        <div className="col-md-2 col-sm-2 col-xm-2 col-lg-2 people-results-name-heading"></div>
        <div className="col-md-4 col-sm-2 col-xm-2 col-lg-4 people-results-name-heading">
          <b>Name</b>
        </div>
        <div className="col-md-6 col-sm-2 col-xm-2 col-lg-2 people-results-info-headings">
          <span className="people-results-age-heading">
            <b>Age</b>
          </span>
        </div>
        <div className="col-md-6 col-sm-2 col-xm-2 col-lg-2 people-results-info-headings">
          <span className="people-results-status-heading">
            <b>Status</b>
          </span>
        </div>
        <div className="col-md-6 col-sm-2 col-xm-2 col-lg-2 people-results-info-headings">
          <span className="people-results-events-heading">
            <b>Events</b>
          </span>
        </div>
      </div>
    </div>
  );
};