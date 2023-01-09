import * as React from "react";
import CollapsedMenu from "./CollapsedMenu";
import StyledBadge from "./StyledBadge";
import {
  Container,
  Toolbar,
  Box,
  Stack,
  Divider,
  Link,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { mobileDetected } from "../utils/util";

const Header = (props) => {
  const { title, image, menuItems, onTitleClick, cartItems } = props;

  //TODO: Check mobileDetected() on each screen port size change
  const menuToDisplay = mobileDetected() ? (
    <CollapsedMenu menuItems={menuItems} cartItems={cartItems} />
  ) : (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      ml="auto"
      divider={<Divider orientation="vertical" flexItem />}
    >
      {menuItems.map((item) =>
        item.title === "Cart" ? (
          <IconButton
            key={item.title}
            href={item.link}
            aria-label="shopping cart"
          >
            <StyledBadge
              badgeContent={cartItems}
              color="secondary"
              tight={true}
            >
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        ) : (
          <Link
            key={item.title}
            href={item.link}
            underline="hover"
            color="inherit"
            p={1}
          >
            {item.title}
          </Link>
        )
      )}
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
          onClick={onTitleClick}
        />
        {menuToDisplay}
      </Toolbar>
    </Container>
  );
};

export default Header;
