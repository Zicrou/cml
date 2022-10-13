import React, { useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Spinner } from "react-bootstrap";
import { getGeocode, getLatLng } from "use-places-autocomplete";

import "@reach/combobox/styles.css";
import { mapComponentProps } from "../types"

const mapContainerStyle = {
  height: "50vh",
  width: "100vw",
};
const options = {
  zoomControl: true,
};

const Map: React.FC<mapComponentProps> = (props: mapComponentProps) => {
  const { address } = props;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
    libraries: ["places"],
  });
  const [markers, setMarkers] = React.useState({
    lat: 39.2903848,
    lng: -76.609383,
  });
  const [center, setCenter] = React.useState({
    lat: 39.2903848,
    lng: -76.609383,
  });
  const [loader, setLoader] = React.useState(true);

  const mapRef: any = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    async function getCoordinates() {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setMarkers({ lat, lng });
      setCenter({ lat, lng });
      setLoader(false);
    }
    if (address) {
      getCoordinates();
    }
  }, [address]);

  if (loadError) return <p>Error</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="col-md-12 when-and-where-map">
      {loader ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          <Marker position={{ lat: markers.lat, lng: markers.lng }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
