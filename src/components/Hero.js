import Button from "../components/Button";
import Typography from "./Typography";
import HeroLayout from "./HeroLayout";
import MovingText from "react-moving-text";

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
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" },
            }}
          >
            {line}
          </Typography>
        ))}
      </MovingText>

      <MovingText
        type="fadeIn"
        duration="5000ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="1"
        fillMode="none"
      >
        <Typography
          color="inherit"
          align="center"
          sx={{
            typography: { xs: "h6", md: "h5", lg: "h4" },
            mb: 4,
            mt: { xs: 4, sm: 6, md: 8, lg: 10 },
          }}
        >
          {description}
        </Typography>
      </MovingText>
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
