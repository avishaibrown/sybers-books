import * as React from "react";
import { Box } from "@mui/material";
import Typography from "./Typography";

const Footer = (props) => {
  const { image, imageAlt, copyright } = props;

  return (
    <Box component="footer" sx={{ py: 4, textAlign: "center" }}>
      <Box
        component="img"
        alt={imageAlt}
        src={image}
        sx={{
          maxHeight: { xs: 250, md: 400 },
          maxWidth: { xs: 150, md: 240 },
        }}
        mb={2}
      />
      <Typography variant="body2" color="text.secondary" align="center">
        {copyright} {new Date().getFullYear()}. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
