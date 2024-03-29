import CollapsedMenu from "./CollapsedMenu";
import StyledBadge from "./StyledBadge";
import {
  Toolbar,
  Box,
  Stack,
  Divider,
  Link,
  AppBar as MuiAppBar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { CART } from "../utils/constants";

const AppBar = (props) => {
  const { title, image, menuItems, navigateTo, cartItems } = props;

  const navigate = useNavigate();

  const menuToDisplay = useMediaQuery((theme) =>
    theme.breakpoints.down("lg")
  ) ? (
    <CollapsedMenu menuItems={menuItems} cartItems={cartItems} />
  ) : (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="flex-end"
      ml="auto"
      divider={<Divider orientation="vertical" flexItem />}
    >
      {menuItems.map((item) =>
        item.title === CART.title ? (
          <IconButton key={item.title} href={item.link} aria-label={CART}>
            <StyledBadge
              badgeContent={cartItems}
              color="secondary"
              tight={"true"}
            >
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        ) : (
          <Link
            key={item.title}
            href={item.link}
            p={{ lg: 0, xl: 1 }}
            underline="hover"
            color="#2c292c"
            sx={{ fontSize: 24, alignSelf: "center" }}
          >
            {item.title}
            {item.showIconInAppBar && (
              <IconButton
                edge="end"
                tabIndex={-1}
                aria-label={`${item.title}-icon`}
              >
                {item.icon}
              </IconButton>
            )}
          </Link>
        )
      )}
    </Stack>
  );

  return (
    <MuiAppBar position="static" sx={{ backgroundColor: "#F3D8A0" }}>
      <Toolbar sx={{ mx: { md: 3, lg: 5, xl: 10 } }}>
        <Box
          component="img"
          sx={{
            maxHeight: { xs: 75, md: 120 },
            maxWidth: { xs: 225, md: 360 },
            "&:hover": { cursor: "pointer" },
            mx: { xs: 0, md: 5 },
            my: 2,
          }}
          alt={title}
          src={image}
          onClick={() => navigate(navigateTo)}
        />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {menuToDisplay}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
