import React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  //   Autocomplete,
  //   DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { Button } from "react-bootstrap";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 54.89,
  lng: 23.87,
};

export default function MapComponent(props) {
  const { onMarkersChanged } = props; //markers,
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBcBm9CJ-E1wHIgkkNl7gdhPITSPFuCiJk",
    libraries: ["geometry", "places"],
  });

  const [map, setMap] = React.useState(null);
  const [coords, setMapCoords] = React.useState([]);

  const onMapLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const handleMapClick = (event) => {
    if (map) {
      const clickedLatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMapCoords((prevCoords) => [...prevCoords, clickedLatLng]);
    }
  };
  const handleMarkerClick = (i) => {
    setMapCoords((prevCoords) => {
      const newCoords = [...prevCoords];
      newCoords.splice(i, 1);
      return newCoords;
    });
  };
  const handleClick = () => {
    onMarkersChanged(coords);
  };
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onMapLoad}
        onClick={handleMapClick}
      >
        {coords
          ? coords.map((item, i) => (
              <Marker
                key={i}
                position={{ lat: item.lat, lng: item.lng }}
                onClick={() => handleMarkerClick(i)}
              />
            ))
          : console.log("coords", coords)}
        <></>
      </GoogleMap>
      <Button variant="dark" onClick={handleClick}>
        Load markers
      </Button>
    </>
  ) : (
    <></>
  );
}
