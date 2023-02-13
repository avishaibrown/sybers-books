import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Container } from "@mui/material";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { SUCCESS } from "../utils/constants";

const TransactionSuccess = () => {
  const navigate = useNavigate();

  //scroll to top when page is navigated to
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 5, md: 10 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
      disableGutters
      maxWidth={false}
    >
      <Box
        component="section"
        sx={{ display: "flex", bgcolor: "#F6F6F6", overflow: "hidden" }}
      >
        <Container
          sx={{
            my: { xs: 5, md: 10 },
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src="./images/wallpaper-curvy-lines.png"
            alt="curvy lines"
            sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
          />
          <Typography
            sx={{
              typography: { xs: "h4", xl: "h3" },
              fontWeight: "bold",
            }}
            m={{ xs: 1, lg: 3 }}
          >
            {SUCCESS.title}
          </Typography>
          <Typography
            sx={{
              typography: { xs: "body1", sm: "h6" },
            }}
            mb={{ xs: 3, sm: 5 }}
            mt={{ xs: 5, sm: 5, lg: 0 }}
          >
            {SUCCESS.message}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate(SUCCESS.link)}
            sx={{ textTransform: "none", mt: 5 }}
          >
            {SUCCESS.linkText}
          </Button>
        </Container>
      </Box>
    </Container>
  );
};

export default TransactionSuccess;
