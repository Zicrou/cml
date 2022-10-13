import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form, Dropdown, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent, clearEventState } from "../../redux/actions/Event/update";
import { viewEvent } from "../../redux/actions/Event/viewEvent";
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
import { UpdateEventComponentProps, RouteParams } from "../../types";

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

  const viewEventStatus = useSelector((state: RootState) => state.viewEvent)
  const [address, setAddress] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (viewEventStatus && viewEventStatus.status === 200) {
      setAddress(viewEventStatus.data.addressLocation)
      
    }
  }, [viewEventStatus])

  const param = useParams<RouteParams>();
  const eventId = param.eventId
  useEffect(() => {
    dispatch(viewEvent(eventId))
  }, [dispatch])

  return (
    <>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder={address}
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
    </>
  );
};
const Map: React.FC<UpdateEventComponentProps> = (props: UpdateEventComponentProps) => {
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


const UpdateEvent: React.FC<RouteComponentProps> = (props: any) => {
  const { history } = props;
  const dispatch = useDispatch();
  const UpdateEventStatus = useSelector(
    (state: RootState) => state.updateEvent
  );

  const [date, setDate] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [time, setTime] = useState("");
  const [isEventPaid, setIsEventPaid] = useState(false);
  const [isEventAddress, setEventAddress] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventFee, setEventFee] = useState("");
  const [isEventFee, setIsEventFee] = useState(false);
  const [searchText, setSearchText] = useState("");
  function convertLocalToUTC(dt: any, dtFormat: any) {
    return moment(dt, dtFormat).utc().format("YYYY-MM-DD hh:mm:ss A");
  }
  const onFinish = (event: any) => {
    event.preventDefault();
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    formDataObj.eventDateTime = `${date} ${time}`;
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
      eventId: eventId
    };
    dispatch(updateEvent(EventProps));

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
    if (UpdateEventStatus && UpdateEventStatus.status === 201) {
      dispatch(clearEventState());
      localStorage.setItem("eventTime", UpdateEventStatus.data.dateTime);
    }
  }, [UpdateEventStatus, history, dispatch]);

  const viewEventStatus = useSelector((state: RootState) => state.viewEvent)
  const [title, setTitle] = useState<string>('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (viewEventStatus && viewEventStatus.status === 200) {
      if (eventType==="paid") {
        setIsEventPaid(true);
      }
      setLoader(true);
      setTitle(viewEventStatus.data.title)
      setEventType(viewEventStatus.data.eventType)
      setEventFee(viewEventStatus.data.fees)
      const unixTimestamp = viewEventStatus.data.dateTime
      const milliseconds = unixTimestamp * 1000
      const dateObject = new Date(milliseconds)
      const year = dateObject.getFullYear();
      var month: any = dateObject.getMonth() + 1
      var day: any = dateObject.getDate();
      if (day < 10) {
        day = "0" + day
      }
      if (month < 10) {
        month = "0" + month
      }
      const hour = dateObject.getHours();
      const min = dateObject.getMinutes();
      const dateObj = year + "-" + month + "-" + day;
      const timeObj = hour + ":" + min;
      setTime(timeObj)
      setDate(dateObj)

    }
  }, [viewEventStatus])

  useEffect(() => {
    if (UpdateEventStatus && UpdateEventStatus.status === 200) {
      history.push('/event-listing')
    }
  }, [UpdateEventStatus])
  
  const param = useParams<RouteParams>();
  const eventId = param.eventId
  useEffect(() => {
    dispatch(viewEvent(eventId))
  }, [dispatch])

  return (
    <>
    
        <div className="when-and-where-event-details-title">
          <b>Update Event: When and Where?</b>
        </div>
        <div className="when-and-where-event-details-content">
          {loader === true ?
            (<Form onSubmit={onFinish}>
              <div className="row">
                <div className="col-md-10 event-name-text-input">
                  <input type="text" placeholder="Event title" defaultValue={title} name="eventName" id="event-name-input" />
                </div>
                <div className="col-md-2 event-name-text-input">
                  <Dropdown className="when-and-where-custom-dropdown">
                    <Dropdown.Toggle
                      variant="default"
                      id="dropdown-basic"
                      className="dropdown-toggle menu-btn"
                    >
                      {eventType}
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
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 when-and-where-event-date-input">
                  <input
                    type="date"
                    value={date}
                    placeholder={date}
                    name="eventDate"
                    onChange={handleChange}
                    pattern="\d{4}-\d{2}-\d{2}"
                  />
                </div>

                <div className="col-md-5 when-and-where-event-time-input">
                  <input
                    type="time"
                    value={time}
                    placeholder={time}
                    name="eventTime"
                    onChange={handleChangeTime}
                  />
                </div>
                <div className="col-md-2 event-fee-number-input">
                {isEventPaid ? (
                  <>
                    <input type="number" placeholder="Fee" name="eventFee" className="paid-event-input" defaultValue={eventFee} />
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
                <div className="col-md-12 when-and-where-event-text-input" ></div>
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
                    {UpdateEventStatus === true ? (
                      <Spinner animation="border" variant="danger" />
                    ) : (
                      <input type="submit" value="Update Event" />
                    )}
                  </div>
                </div>
              </div>
            </Form>
            ) : (<Spinner animation="border" variant="danger" />)
          }
        </div>
      
    </>
  );
};
export default withRouter(UpdateEvent);
