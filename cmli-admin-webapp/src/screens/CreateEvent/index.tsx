import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Dropdown, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, clearEventState } from "../../redux/actions/Event/create";
import { clearInviteState } from "../../redux/actions/Invite/create";
import { RootState } from "../../redux/reducers/index";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import moment from "moment";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./style.css";
import { CreateEventComponentProps } from "../../types";

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  zoomControl: true,
};
const center = {
  lat: 39.2903848,
  lng: -76.609383,
};

const Search = (props: any) => {
  const { panTo, addressTracker, isEventAddress } = props;
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e: { target: { value: string } }) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    addressTracker(address);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
          id="searchbox"
          autoComplete="off"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      {isEventAddress ? <p className="error">Event Address is required</p> : ""}
    </>
  );
};
const Map: React.FC<CreateEventComponentProps> = (props: CreateEventComponentProps) => {
  const { addressTracker, isEventAddress } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
    libraries: ["places"],
  });
  const [markers, setMarkers] = React.useState({
    lat: 39.2903848,
    lng: -76.609383,
  });
  const panTo: any = React.useCallback((val: { lat: number; lng: number }) => {
    const { lat, lng } = val;

    setMarkers({ lat, lng });
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  const mapRef: any = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <p>Error</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="col-md-12 when-and-where-map">
      <Search
        panTo={panTo}
        addressTracker={addressTracker}
        isEventAddress={isEventAddress}
      />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker position={{ lat: markers.lat, lng: markers.lng }} />
      </GoogleMap>
    </div>
  );
};

const CreateEvent: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const createEventStatus = useSelector(
    (state: RootState) => state.createEvent
  );

  const [date, setDate] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [time, setTime] = useState("");
  const [eventType, setEventType] = useState("");
  const [isEventPaid, setIsEventPaid] = useState(false);
  const [isEventName, setIsEventName] = useState(false);
  const [isEventType, setIsEventType] = useState(false);
  const [isEventDate, setIsEventDate] = useState(false);
  const [isEventTime, setIsEventTime] = useState(false);
  const [isEventFee, setIsEventFee] = useState(false);
  const [isEventAddress, setEventAddress] = useState(false);
  const [eventTime, setEventTime] = useState("");
  const [searchText, setSearchText] = useState("");
  function convertLocalToUTC(dt: any, dtFormat: any) {
    return moment(dt, dtFormat).utc().format("YYYY-MM-DD hh:mm:ss A");
  }
  const onFinish = (event: any) => {
    event.preventDefault();
    setIsEventName(false);
    setIsEventType(false);
    setIsEventFee(false);
    setEventAddress(false);
    setIsEventDate(false);
    setIsEventTime(false);
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    formDataObj.eventDateTime = `${convertedDate} ${time}`;
    formDataObj.eventType = eventType;
    let convertedDateTime = convertLocalToUTC(
      formDataObj.eventDateTime,
      "YYYY-MM-DD hh:mm:ss"
    );
    convertedDateTime = convertedDateTime.replace(/-/g, "/");
    setEventTime(convertedDateTime);
    const EventProps = {
      eventDateTime: convertedDateTime,
      eventAddress: searchText,
      eventDate: formDataObj.eventDate,
      eventFee: formDataObj.eventFee,
      eventName: formDataObj.eventName,
      eventTime: formDataObj.eventTime,
      eventType: eventType,
    };
    if (EventProps.eventName === "") {
      setIsEventName(true);
    } else if (EventProps.eventType === "") {
      setIsEventType(true);
    } else if (EventProps.eventDate === "") {
      setIsEventDate(true);
    } else if (EventProps.eventTime === "") {
      setIsEventTime(true);
    } else if (EventProps.eventFee === "" && EventProps.eventType === "paid") {
      setIsEventFee(true);
    } else if (EventProps.eventAddress === "") {
      setEventAddress(true);
    } else {
      dispatch(createEvent(EventProps));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var date = e.currentTarget.value;
    setDate(date);
    // date = date.replace(/-/g, "/");
    setConvertedDate(date);
  };
  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let time = e.currentTarget.value;
    setTime(time);
  };

  const addressTracker = (address: any) => {
    setSearchText(address);
  };
  useEffect(() => {
    if (createEventStatus && createEventStatus.status === 201) {
      dispatch(clearEventState());
      dispatch(clearInviteState());
      localStorage.setItem("eventTime", createEventStatus.data.dateTime);
      history.push(`/${createEventStatus.data.sys.id}/invite-people`);
    }
  }, [createEventStatus, history, dispatch]);

  return (
    <>

      <div className="when-and-where-event-details-title">
        <b>New Event: When and Where?</b>
      </div>
      <div className="when-and-where-event-details-content">
        <Form onSubmit={onFinish}>
          <div className="row">
            <div className="col-md-10 event-name-text-input">
              <input type="text" placeholder="Event Name" name="eventName" id="event-name-input" />
              {isEventName ? (
                <p className="error">Event name is required</p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-2 event-name-text-input">
              <Dropdown className="when-and-where-custom-dropdown">
                <Dropdown.Toggle
                  variant="default"
                  id="dropdown-basic"
                  className="dropdown-toggle menu-btn"
                >
                  {eventType || "Select event type"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setEventType("paid");
                      setIsEventPaid(true);
                    }}
                  >
                    Paid
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setEventType("free");
                      setIsEventPaid(false);
                    }}
                  >
                    Free
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {isEventType ? (
                <p className="error">Event type is required</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 when-and-where-event-date-input">
              <input
                type="date"
                value={date}
                placeholder="Date"
                name="eventDate"
                onChange={handleChange}
                pattern="\d{4}-\d{2}-\d{2}"
              />
              {isEventDate ? (
                <p className="error">Event date is required</p>
              ) : (
                ""
              )}
            </div>

            <div className="col-md-5 when-and-where-event-time-input">
              <input
                type="time"
                value={time}
                placeholder="Time"
                name="eventTime"
                onChange={handleChangeTime}
              />
              {isEventTime ? (
                <p className="error">Event time is required</p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-2 event-fee-number-input">
              {isEventPaid ? (
                <>
                  <input type="number" placeholder="Fee" name="eventFee" className="paid-event-input" />
                  <span className="create-event-fee-sign">$</span>
                </>
              ) : (
                ""
              )}
              {isEventFee ? (
                <p className="error">Event fee is required</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 when-and-where-event-text-input"></div>
          </div>
          <div className="row">
            <Map
              addressTracker={addressTracker}
              isEventAddress={isEventAddress}
            />
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="when-and-where-next-btn">
                {createEventStatus === true ? (
                  <Spinner animation="border" variant="danger" />
                ) : (
                  <input type="submit" value="Next: Who is Invited" />
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>

    </>
  );
};
export default withRouter(CreateEvent);
