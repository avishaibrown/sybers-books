import React from "react";
import { Box, Button as MuiButton } from "@mui/material";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";

const MapContainer = (props) => {
  const { center, markerTitle } = props;

  // Syber's Books coordinates or query
  const query = center
    ? `${center.lat},${center.lng}`
    : "666+Glenhuntly+Road,+Caulfield+South+VIC+3162";

  const mapSrc = `https://maps.google.com/maps?q=${query}&t=m&z=16&output=embed&iwloc=near`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=666+Glenhuntly+Road,+Caulfield+South+VIC+3162`;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 280,
        position: "relative",
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >
      <iframe
        title={markerTitle || "Syber's Books Location"}
        src={mapSrc}
        width="100%"
        height="100%"
        style={{
          border: 0,
          minHeight: "280px",
          display: "block",
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Floating Directions Button */}
      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          right: 12,
          zIndex: 2,
        }}
      >
        <MuiButton
          component="a"
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          size="small"
          startIcon={<DirectionsOutlinedIcon />}
          sx={{
            backgroundColor: "#184132",
            color: "#FFFFFF",
            fontSize: "0.78rem",
            fontWeight: 700,
            py: 0.8,
            px: 1.8,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#265E4A",
            },
          }}
        >
          Get Directions
        </MuiButton>
      </Box>
    </Box>
  );
};

export default MapContainer;
