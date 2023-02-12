import * as React from "react";
import { Box, Stack, IconButton, Link, Divider } from "@mui/material";
import Typography from "./Typography";
import { Facebook } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Footer = (props) => {
  const {
    image,
    imageAlt,
    navigateTo,
    copyright,
    socialLink,
    privacy,
    terms,
    shipping,
  } = props;

  const navigate = useNavigate();

  return (
    <Box component="footer" sx={{ py: 4, textAlign: "center" }}>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        py={2}
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Link href={privacy.link} p={1} underline="hover" color="#2c292c">
          {privacy.title}
        </Link>
        <Link href={terms.link} p={1} underline="hover" color="#2c292c">
          {terms.title}
        </Link>
        <Link href={shipping.link} p={1} underline="hover" color="#2c292c">
          {shipping.title}
        </Link>
      </Stack>
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
            "&:hover": { cursor: "pointer" },
            my: 1,
          }}
          onClick={() => navigate(navigateTo)}
        />
        <IconButton href={socialLink} target="_blank" rel="noopener noreferrer">
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
