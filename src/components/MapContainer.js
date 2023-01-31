import { useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Box } from "@mui/material";
import Typography from "./Typography";

const MapContainer = (props) => {
  const { center, zoom, google, markerTitle, markerDescription } = props;
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);

  return (
    <Box height="60vh" width="100%">
      <Map
        google={google}
        zoom={zoom}
        initialCenter={center}
        style={{ height: "60vh", width: "100%" }}
        onClick={() => setShowInfoWindow(false)}
      >
        <Marker
          position={center}
          onClick={(props, marker) => {
            setShowInfoWindow(true);
            setActiveMarker(marker);
          }}
        />
        <InfoWindow
          visible={showInfoWindow}
          marker={activeMarker}
          onCloseClick={() => {
            setShowInfoWindow(false);
          }}
        >
          <>
            <Typography variant="h5">{markerTitle}</Typography>
            <Typography variant="body1">{markerDescription}</Typography>
          </>
        </InfoWindow>
      </Map>
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
