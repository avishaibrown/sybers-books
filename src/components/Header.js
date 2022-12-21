import * as React from "react";
import CollapsedMenu from "./CollapsedMenu";
import { Container, Toolbar, Box, Stack, Divider, Link } from "@mui/material";
import { mobileDetected } from "../utils/util";

const Header = (props) => {
  const { title, image, menuItems } = props;

  const menuToDisplay = mobileDetected() ? (
    <CollapsedMenu menuItems={menuItems} />
  ) : (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="flex-end"
      ml="auto"
      divider={<Divider orientation="vertical" flexItem />}
    >
      {menuItems.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          underline="hover"
          color="inherit"
        >
          {item.title}
        </Link>
      ))}
    </Stack>
  );

  return (
    <Container disableGutters sx={{ my: "2vh" }}>
      <Toolbar display={{ xs: "flex", md: "flex-inline" }}>
        <Box
          component="img"
          sx={{
            maxHeight: { xs: 50, md: 80 },
            maxWidth: { xs: 150, md: 240 },
          }}
          alt={title}
          src={image}
        />
        {menuToDisplay}
      </Toolbar>
    </Container>
  );
};

export default Header;
