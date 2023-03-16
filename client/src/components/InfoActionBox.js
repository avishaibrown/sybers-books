import { Box, Container } from "@mui/material";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { useNavigate } from "react-router";

const InfoActionBox = (props) => {
  const { title, infoText, buttonText, navigateTo } = props;
  const navigate = useNavigate();

  return (
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
        {title && (
          <Typography
            sx={{
              typography: { xs: "h4", xl: "h3" },
              fontWeight: "bold",
            }}
            m={{ xs: 1, lg: 3 }}
          >
            {title}
          </Typography>
        )}
        {infoText &&
          infoText.map((paragraph, index) => (
            <Typography
              sx={{
                typography: { xs: "body1", sm: "h6", xl: "h5" },
              }}
              mb={{ xs: 1, sm: 5 }}
              mt={{ xs: 3, sm: 5, lg: 0 }}
              key={"info-action-box-paragraph-" + index}
            >
              {paragraph}
            </Typography>
          ))}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate(navigateTo)}
          sx={{ textTransform: "none", mt: 5 }}
        >
          {buttonText}
        </Button>
      </Container>
    </Box>
  );
};
export default InfoActionBox;
