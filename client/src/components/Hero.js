import Button from "../components/Button";
import Typography from "./Typography";
import HeroLayout from "./HeroLayout";
import MovingText from "react-moving-text";
import { Box } from "@mui/material";

const Hero = (props) => {
  const { title, description, image, buttonText, onButtonClick } = props;

  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${image})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      <img style={{ display: "none" }} src={image} alt="increase priority" />
      <MovingText
        type="fadeInFromTop"
        duration="1500ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="1"
        fillMode="none"
      >
        {title.map((line, index) => (
          <Typography
            key={"hero-header-text-" + index}
            color="inherit"
            align="center"
            marked={index === title.length - 1 ? "center" : "none"}
            variant="h2"
            sx={{
              fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
            }}
          >
            {line}
          </Typography>
        ))}
      </MovingText>
      <Box
        sx={{
          mb: 4,
          mt: { xs: 4, sm: 6, md: 8, lg: 10 },
        }}
      >
        <MovingText
          type="fadeIn"
          duration="5000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          {description.map((item, index) => (
            <Typography
              key={"hero-description-text-" + index}
              color="inherit"
              align="center"
              sx={{
                typography: { xs: "body1", sm: "h5", md: "h4" },
                mx: 2,
              }}
            >
              {item}
            </Typography>
          ))}
        </MovingText>
      </Box>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        onClick={onButtonClick}
        sx={{ minWidth: 200 }}
        autoFocus
      >
        {buttonText}
      </Button>
    </HeroLayout>
  );
};

export default Hero;
