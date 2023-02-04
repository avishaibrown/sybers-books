import Hero from "../components/Hero";
import { HOME } from "../utils/constants";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container component="section" disableGutters maxWidth={false}>
      <Hero
        title={HOME.hero.titles}
        description={HOME.hero.description}
        image={HOME.hero.image}
        onButtonClick={() => navigate("/shop")}
        buttonText={HOME.hero.button}
      />
    </Container>
  );
};

export default Home;
