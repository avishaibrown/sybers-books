import * as React from "react";
import { Box, Stack, IconButton } from "@mui/material";
import Typography from "./Typography";
import { Facebook } from "@mui/icons-material";

const Footer = (props) => {
  const { image, imageAlt, copyright } = props;

  return (
    <Box component="footer" sx={{ py: 4, textAlign: "center" }}>
      <Stack
        direction="row"
        spacing={{ xs: 2, md: 4 }}
        justifyContent="center"
        mb={2}
      >
        <Box
          component="img"
          alt={imageAlt}
          src={image}
          sx={{
            maxHeight: { xs: 240, md: 360 },
            maxWidth: { xs: 200, md: 220 },
            my: 1,
          }}
        />
        <IconButton
          href="https://www.facebook.com/SybersBooks/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </IconButton>
      </Stack>
      <Typography variant="body2" color="text.secondary" align="center">
        {copyright} {new Date().getFullYear()}. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
