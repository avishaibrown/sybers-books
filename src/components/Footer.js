import * as React from "react";
import { Box, Typography } from "@mui/material";

const Footer = (props) => {
  const { copyright } = props;

  return (
    <Box component="footer" sx={{ py: 4 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {copyright} {new Date().getFullYear()}. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
